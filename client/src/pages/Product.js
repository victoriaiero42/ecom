import React, { useEffect, useState } from "react";
import { getProduct, getProductsCount } from "../fucns/product";
import SingleProduct from "../components/cards/SingleProduct";

export default function Product({ match }) {
  const [product, setProduct] = useState({});

  const { slug } = match.params;
  console.log(product);

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
    });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row pt-4">
          <SingleProduct product={ product } />
        </div>
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </>
  );
}
