import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../fucns/rating";
import _ from 'lodash';

const { Meta } = Card;

export default function ProductCard({ product }) {


  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      //new product to cart
      cart.push({
        ...product,
        count: 1,
      })

      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual)
      //save to local storage

      localStorage.setItem('cart', JSON.stringify(unique))
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
          <a onClick={ handleAddToCart }>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
          </a>,
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
