import React, { useEffect, useState } from "react";
import { getProducts } from "../../fucns/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    //sort, order, limit
    getProducts("sold", "desc", 3).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="container">
        { loading ? (
          <LoadingCard count={ products.length } />
        ) : (
            <div className="row">
              {products.map((product) => {
                return (
                  <div key={ product._id } className="col-md-4">
                    <ProductCard product={ product } />
                  </div>
                );
              }) }
            </div>
          ) }
      </div>
    </>
  );
}

