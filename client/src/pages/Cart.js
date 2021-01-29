import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Cart() {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((c, n) => {
      return c + n.count * n.price
    }, 0);
  }

  return (
    <div className="container-fluid pt-2">

      <div className="row">
        <div className="col-md-8">
          <h4>Cart: { cart.length } products.</h4>
          { !cart.length ? (
            <p>
              No products in cart.<Link to="/shop">Continue shopping.</Link>{ " " }
            </p>
          ) : (
              "show cart items"
            ) }
        </div>
        <div className="col-md-4">
          <h4>Order summary:</h4>
          <hr />
          <p>Products:</p>
          { cart.map((c, i) => (
            <div key={ c._id }>
              <p>{ c.title } x { c.count } = ${ c.price * c.count }</p>
            </div>
          )) }
          <hr />

Total: <b>${ getTotal() }</b>

          <hr />

          { user ? (
            <button className="btn btn-sm btn-primary mt-2">Proceed to checkout</button>
          ) : (
              <button className="btn btn-sm btn-primary mt-2">Login to checkout</button>
            ) }
        </div>
      </div>

    </div>
  );
}
