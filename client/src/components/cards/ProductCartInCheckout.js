import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART } from '../../redux/actionTypes';
import { toast } from "react-toastify";
import { CheckSquareOutlined, CloseSquareOutlined, CloseOutlined } from "@ant-design/icons";

export default function ProductCartInCheckout({ p }) {

  const dispatch = useDispatch();

  const colors = [
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
    "Pink",
    "Golden",
    "Space Gray",
  ];

  const handleColorChange = (e) => {
    console.log('color changed', e.target.value);

    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));

      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      console.log('cart update color', cart);
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: ADD_TO_CART,
        payload: cart,
      })
    }
  };

  const handleQuantityChange = (e) => {
    // console.log('available products', p.quantity);
    // console.log('handleQuantityChange', e.target.value);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Maximum available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: ADD_TO_CART,
        payload: cart,
      });
    }
  };



  const handleRemove = (e) => {

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: ADD_TO_CART,
        payload: cart,
      });
    }
  }
  return (
    <tbody>
      <tr>
        <td>
          <div>
            { p.images.length ? (
              <ModalImage small={ p.images[0].url } large={ p.images[0].url } />
            ) : (
                <ModalImage small={ laptop } large={ laptop } />
              ) }
          </div>
        </td>
        <td>{ p.title }</td>
        <td>{ p.price }</td>
        <td>{ p.brand }</td>
        <td>
          <select
            onChange={ handleColorChange }
            name="color"
            className="form-control">
            { p.color ? <option value={ p.color }>{ p.color }</option> : <option>Select:</option> }

            { colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={ c } value={ c }>
                  {c }
                </option>
              )) }
          </select>
        </td>
        <td>
          <input
            onChange={ handleQuantityChange }
            type="number"
            className="form-control"
            value={ p.count }
          />
        </td>
        <td>
          { p.shipping === "Yes" ? (
            <CheckSquareOutlined className="text-success" />
          ) : (
              <CloseSquareOutlined className="text-danger" />
            ) }
        </td>
        <td ><CloseOutlined
          onClick={ () => handleRemove(p._id) }
          className="text-danger pointer"
        /> </td>
      </tr>
    </tbody>
  );
}
