import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from "../../images/laptop.jpg";
import ProductListItems from './ProductListItems';

export default function SingleProduct({ product }) {
  const { title, images, } = product;

  return (
    <>
      <div className="col-md-7">
        { images && images.length ? <Carousel showArrows={ true } autoPlay infiniteLoop>
          { images &&
            images.map((i) => <img src={ i.url } key={ i.public_id } alt="img" />) }
        </Carousel> : <Card
          cover={
            <img
              src={ laptop }
              alt="img"
              className="mb-3 card-image"
            />
          }></Card> }
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{ title }</h1>

        <Card
          actions={ [
            <>
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br />
              Add to whishlist
            </Link>,
          ] }>
          {/* <Meta title={ title } /> */ }
          <ProductListItems product={ product } />
        </Card>
      </div>
    </>
  );
}
