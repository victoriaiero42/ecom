import { useEffect } from "react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, saveUserAddress, emptyUserCart } from "../fucns/user";
import { ADD_TO_CART } from "../redux/actionTypes";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState([]);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDB = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success(`Address has been saved.`);
      }
    });
  };

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    dispatch({
      type: ADD_TO_CART,
      payload: [],
    });

    emptyUserCart(user.token).then((res) => {
      setTotal(0);
      setProducts([]);
      toast.success("Cart is empty. Continue shopping.");
    });
  };


  const showAddress = () => {
    return <>
      <ReactQuill theme="snow" value={ address } onChange={ setAddress } />
      <button className="btn btn-primary mt-2" onClick={ saveAddressToDB }>
        Save
    </button>
    </>
  }

  const showProductSummary = () => {
    return products.map((p, i) => (
      <div key={ p.product._id }>
        <p>
          { p.product.title } ({ p.color }) x { p.count } ={ " " }
          { p.product.price * p.count }
        </p>
      </div>
    ))
  };

  const applyDiscountCoupon = () => {
    console.log('send to back', coupon);
  }

  const showApplyCoupon = () => {
    return <>
      <input type="text"
        className="form-control"
        onChange={ (e) => setCoupon(e.target.value) }
        value={ coupon }
      />
      <button onClick={ applyDiscountCoupon } className="btn btn-primary mt-2">Apply</button>
    </>
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery address </h4>
        <hr />
        <br />


        { showAddress() }
        <hr />
        <h4>Got coupon?</h4>
        <br />
        <br />
        { showApplyCoupon() }
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products { products.length }</p>
        <hr />
        { showProductSummary() }
        <hr />

        <p>List of products</p>
        <hr />
        <p>Cart total: ${ total }</p>

        <div className="row">
          <div className="col-md-6">
            <button disabled={ !addressSaved || !products.length } className="btn btn-primary">Place Order</button>
          </div>

          <div className="col-md-6">
            <button onClick={ emptyCart } className="btn btn-primary">
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
