import axios from "axios";
import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

export default function FileUpload({ setValues, values, setLoading }) {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user.token);

  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    console.log(files);
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("image upload response", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("cloudinary upload err", err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((i) => i.public_id !== public_id);
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="row">
        { values.images &&
          values.images.map((i) => (
            <Badge
              count="X"
              key={ i.public_id }
              style={ { cursor: "pointer" } }
              onClick={ () => handleImageRemove(i.public_id) }>
              <Avatar src={ i.url } size={ 100 } className="ml-3" shape="square" />{ " " }
            </Badge>
          )) }
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised mt-3">
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
    </>
  );
}
