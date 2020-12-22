import axios from "axios";
import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";

export default function FileUpload({ setValues, values, setloading }) {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    let files = e.target.files;
    console.log(files);
    let allUploadedFiles = values.images;

    if (files) {
      setloading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          10000,
          10000,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri }, {
              headers: {
                authtoken: user ? user.authtoken : ''
              }
            })
              .then(res => {
                console.log('image upload response', res);
                setloading(false)
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles })
              })
              .catch(err => {
                setloading(false);
                console.log('cloudinary upload err', err);
              })
          },
          "base64"
        );
      }
    }
  };

  return (
    <div className="row">
      <label className="btn btn-primary btn-raised">
        Choose file:
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={ fileUploadAndResize }
        />
      </label>
    </div>
  );
}
