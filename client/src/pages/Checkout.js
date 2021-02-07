import { useEffect } from "react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from '../fucns/user';
import { ADD_TO_CART } from '../redux/actionTypes';
import { emptyUserCart } from '../fucns/user';
import { toast } from "react-toastify";

export default function Checkout() {

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState([]);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token)
      .then(res => {
        console.log('user cart res', JSON.stringify(res.data, null, 4));
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
  }, [])

  const saveAddressToDB = () => {
    //
  };

  const emptyCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }

    dispatch({
      type: ADD_TO_CART,
      payload: [],
    });

    emptyUserCart(user.token)
      .then(res => {
        setTotal(0);
        setProducts([]);
        toast.success("Cart is empty. Continue shopping.")
      })
  }


  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery address </h4>
        <hr />
        <br />
          text area
          <button className="btn btn-primary mt-2" onClick={ saveAddressToDB }>Save</button>
        <hr />
        <h4>Got coupon?</h4>
        <br />
        <br />
        coupom input and apply btn
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        { total }
        { JSON.stringify(products, null, 4) }
        <hr />
        <p>Products { products.length }</p>
        <hr />
        { products.map((p, i) => (
          <div key={ p.product._id }>
            <p>
              { p.product.title } ({ p.color }) x { p.count } = { p.product.price * p.count }
            </p>
          </div>
        )) }
        <hr />

        <p>List of products</p>
        <hr />
        <p>Cart total: ${ total }</p>

        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary">Place Order</button>
          </div>

          <div className="col-md-6">
            <button onClick={ emptyCart } className="btn btn-primary">Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
