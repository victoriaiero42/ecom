import React, { useEffect, useState, useCallback } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../fucns/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import { getCategories, getCategorySubs } from "../../../fucns/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  // categories: [],
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS", "DELL"],
  color: "",
  brand: "",
};

export default function ProductUpdate({ match, history }) {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const loadProduct = () => {
    getProduct(match.params.slug).then((p) => {
      // console.log(p, 'PRODUCT');
      setValues({ ...values, ...p.data });

      getCategorySubs(p.data.category._id).then((res) => {
        // console.log(res.data);
        setSubOptions(res.data);
      });

      let arr = [];

      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      console.log("arr", arr);
      setArrayOfSubs(arr); // required for ant design select to work
    });
  };

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadCategories = useCallback(
    () =>
      getCategories().then((c) => {
        console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
        setCategories(c.data);
      }),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(match.params.slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        history.push('/admin/products');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCatgegoryChange = (e) => {
    e.preventDefault();
    // console.log("clicked category", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      console.log(res, "sub options on category click");
      setSubOptions(res.data);
    });

    console.log("existing category values.category", e.target.value);
    // if user clicks back to the original category
    //show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    //clear old sub category ids
    setArrayOfSubs([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          { loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
              <h4>Product create</h4>
            ) }
          { JSON.stringify(values, null, 2) }

          <div className="p-3">
            <FileUpload
              values={ values }
              setValues={ setValues }
              setLoading={ setLoading }
            />
          </div>

          <ProductUpdateForm
            handleSubmit={ handleSubmit }
            handleChange={ handleChange }
            values={ values }
            setValues={ setValues }
            categories={ categories }
            subOptions={ subOptions }
            arrayOfSubs={ arrayOfSubs }
            setArrayOfSubs={ setArrayOfSubs }
            handleCatgegoryChange={ handleCatgegoryChange }
            selectedCategory={ selectedCategory }
          />

          <hr />
        </div>
      </div>
    </div>
  );
}
