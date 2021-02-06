import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCartInCheckout from '../components/cards/ProductCartInCheckout';
import { userCart } from '../fucns/user';

export default function Cart({ history }) {

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((c, n) => {
      return c + n.count * n.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log('cart', JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then(res => {
        console.log('cart post res', res);
        if (res.data.ok) {
          history.push('/checkout');
        }
      }).catch(err => console.log('cart save error', err));

  };

  const showCartItems = () => {
    return <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      { cart.map((p) => (
        <ProductCartInCheckout key={ p._id } p={ p } />
      )) }
    </table>;
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart: { cart.length } products.</h4>
          { !cart.length ? (
            <p>
              No products in cart.<Link to="/shop"> Continue shopping.</Link>{ " " }
            </p>
          ) : (
              showCartItems()
            ) }
        </div>
        <div className="col-md-4">
          <h4>Order summary:</h4>
          <hr />
          <p>Products:</p>
          { cart.map((c, i) => (
            <div key={ c._id }>
              <p>
                { c.title } x { c.count } = ${ c.price * c.count }
              </p>
            </div>
          )) }
          <hr />
          Total: <b>${ getTotal() }</b>
          <hr />
          { user ? (
            <button
              onClick={ saveOrderToDb }
              className="btn btn-sm btn-primary mt-2"
              disabled={ !cart.length }>
              Proceed to checkout
            </button>
          ) : (
              <button className="btn btn-sm btn-primary mt-2">
                <Link
                  to={ {
                    pathname: "/login",
                    state: { from: "cart" },
                  } }>
                  Login to checkout
              </Link>
              </button>
            ) }
        </div>
      </div>
    </div>
  );
}
