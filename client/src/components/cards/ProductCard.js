import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../fucns/rating";

const { Meta } = Card;

export default function ProductCard({ product }) {
  return (
    <Card
      cover={
        <img
          src={ product.images && product.images.length ? product.images[0].url : laptop }
          style={ { height: "150px", objectFit: "cover" } }
          alt="img"
          className="p-1"
        />
      }
      actions={ [
        <Link to={ `/product/${product.slug}` } >
          { " " }
          < EyeOutlined className="text-warning" /> <br /> View Product
        </Link >,
        <>
          <ShoppingCartOutlined

            className="text-danger"
          /> <br /> Add to Cart
        </>
        ,
      ] }>

      <Meta
        title={ product.title }
        description={ `${product.description && product.description.substring(0, 10)}...` }
        images={ product.images }
      />
      {product.title }
    </Card>

  );
}
