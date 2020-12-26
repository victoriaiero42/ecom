import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { getProduct } from "../../../fucns/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

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

export default function ProductUpdate({ match }) {
  const [values, setValues] = useState(initialState);

  const { user } = useSelector((state) => ({ ...state }));

  const loadProduct = () => {
    getProduct(match.params.slug).then((p) => {
      // console.log(p, 'PRODUCT');
      setValues({ ...values, ...p.data });
    });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Product update</h4>
          {/* { JSON.stringify(values) } */ }
          <ProductUpdateForm
            handleSubmit={ handleSubmit }
            handleChange={ handleChange }
            values={ values }
            setValues={ setValues }
          />

          <hr />
        </div>
      </div>
    </div>
  );
}
