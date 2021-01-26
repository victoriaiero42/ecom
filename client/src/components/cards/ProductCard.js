import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../fucns/rating";

const { Meta } = Card;

export default function ProductCard({ product }) {


  const handleAddToCart = () => {
    let cart = [];

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
