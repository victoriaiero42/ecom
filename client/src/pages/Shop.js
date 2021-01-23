import React, { useState, useEffect } from "react";
import { getProductsByCount, fetchProductsByFilter } from "../fucns/product";
import { getCategories } from "../fucns/category";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, DownCircleOutlined } from "@ant-design/icons";
import { SEARCH_QUERY } from "../redux/actionTypes";
import Star from '../components/forms/Star';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState('');

  const dispatch = useDispatch();

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => {
      setCategories(res.data);
    });
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
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  //4. show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={ c._id }>
        <Checkbox
          onChange={ handleCheck }
          className="pb-2 pl-4 pr-4"
          value={ c._id }
          name="category"
          checked={ categoryIds.includes(c._id) }>
          { c.name }
        </Checkbox>
        <br />
      </div>
    ));

  //

  const handleCheck = (e) => {
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });

    setPrice([0, 0]);

    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    console.log(inTheState);

    fetchProducts({ category: inTheState });
  };


  // 5.show products by star rating

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <h4>Search/Filter</h4>

          <Menu defaultOpenKeys={ ["1", "2"] } mode="inline">
            <Menu.SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined />
                  Price
                </span>
              }>
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={ (v) => `$${v}` }
                  range
                  value={ price }
                  onChange={ handleSlider }
                  max="9999"
                />
              </div>
            </Menu.SubMenu>

            <Menu.SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownCircleOutlined />
                  Categories
                </span>
              }>
              <div>{ showCategories() }</div>
            </Menu.SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
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
