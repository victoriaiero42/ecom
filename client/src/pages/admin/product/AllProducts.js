import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../fucns/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../fucns/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const loadAllProducts = () => {
    setLoading(true);

    getProductsByCount(10)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  const handleRemove = (slug) => {
    console.log(slug);
    if (window.confirm("Do you want to delete the item?")) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.success(`${res.data.title} is deleted.`);
        })
        .catch((err) => {
          // if (err.response.status === 400) {
          toast.error(err.response.data);
          console.log(err);
          // }
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          { loading ? <h4 className="text-danger">loading...</h4> : <h4>all products:</h4> }
          <div className="row">
            { products ?
              products.map((product) => (
                <div key={ product._id } className="col-md-4 pb-3">
                  <AdminProductCard
                    product={ product }
                    handleRemove={ handleRemove }
                  />
                </div>
              )) : '' }
          </div>
        </div>
      </div>
    </div>
  );
}
