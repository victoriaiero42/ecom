import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../fucns/rating";
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART } from '../../redux/actionTypes';

const { Meta } = Card;

export default function ProductCard({ product }) {
  const [tooltip, setTooltip] = useState('Click to add');
  const dispatch = useDispatch();
  const { user, cart } = useSelector(state => ({ ...state }))

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      //new product to cart
      cart.push({
        ...product,
        count: 1,
      });

      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      //save to local storage

      localStorage.setItem('cart', JSON.stringify(unique));

      setTooltip('Added');

      dispatch({
        type: ADD_TO_CART,
        payload: unique,
      })
    }

  }

  return (
    <>
      {product && product.rating && product.rating.length > 0 ? (
        showAverage(product)
      ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        ) }
      <Card
        cover={
          <img
            src={
              product.images && product.images.length
                ? product.images[0].url
                : laptop
            }
            style={ { height: "150px", objectFit: "cover" } }
            alt="img"
            className="p-1"
          />
        }
        actions={ [
          <Link to={ `/product/${product.slug}` }>
            { " " }
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={ tooltip }>
            <a onClick={ handleAddToCart }>
              <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
          </a>,
          </Tooltip>
        ] }>
        <Meta
          title={ `${product.title} - $${product.price}` }
          description={ `${product.description && product.description.substring(0, 10)
            }...` }
          images={ product.images }
        />
        { product.title }
      </Card>
    </>
  );
}
