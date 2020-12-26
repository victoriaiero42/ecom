import React, { useState, useEffect, useCallback } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../fucns/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorysSubs } from "../../../fucns/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from '@ant-design/icons';

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  categories: [],
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS", "DELL"],
  color: "",
  brand: "",
};

export default function ProductCreate() {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);

  const loadCategories = useCallback(
    () =>
      getCategories().then((c) => setValues({ ...values, categories: c.data })),
    []
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCatgegoryChange = (e) => {
    e.preventDefault();
    console.log("clicked category", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorysSubs(e.target.value).then((res) => {
      console.log(res, "sub options on category click");
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          { loading ? <LoadingOutlined className='text-danger h1' /> : <h4>Product create</h4> }
          <hr />

          { JSON.stringify(values.images) }

          <div className="p-3">
            <FileUpload
              values={ values }
              setValues={ setValues }
              setLoading={ setLoading }
            />
          </div>
          <ProductCreateForm
            handleSubmit={ handleSubmit }
            handleChange={ handleChange }
            values={ values }
            handleCatgegoryChange={ handleCatgegoryChange }
            subOptions={ subOptions }
            showSub={ showSub }
            setValues={ setValues }
          />
        </div>
      </div>
    </div>
  );
}
