import React, { useState, useEffect } from "react";
import { getProductsByCount, fetchProductsByFilter } from "../fucns/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider } from "antd";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      console.log("load products on user search", text);
      fetchProductsByFilter({ query: text }).then((res) => {
        setProducts(res.data);
      });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // const fetchProducts = () => {

  // }

  // const loadProductBasedOnPrice

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <h4>Search/Filter</h4>

          <Menu>
            <Menu.SubMenu>
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={ (v) => v }
                  range
                  value={ price }
                  onChange={ value => setPrice(value) }
                />
              </div>
            </Menu.SubMenu>
          </Menu>
        </div>

        <div className="col-md-9">
          { loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
              <h4 className="text-center">Products:</h4>
            ) }

          { products.length < 1 && <p>No products found</p> }

          <div className="row">
            { products.length !== 0 &&
              products.map((p) => (
                <div key={ p._id } className="col-md-4">
                  <ProductCard product={ p } />
                </div>
              )) }
          </div>
        </div>
      </div>
    </div>
  );
}
