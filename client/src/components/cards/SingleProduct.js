import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from "../../images/laptop.jpg";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import RatingModal from "../modals/RatingModal";
import { showAverage } from "../../fucns/rating";

const { TabPane } = Tabs;

// this is children component of Product page:
export default function SingleProduct({ product, onStarClick, star }) {
  const { title, images, description, _id } = product;

  return (
    <>
      <div className="col-md-7">
        { images && images.length ? (
          <Carousel showArrows={ true } autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img src={ i.url } key={ i.public_id } alt="img" />
              )) }
          </Carousel>
        ) : (
            <Card
              cover={
                <img src={ laptop } alt="img" className="mb-3 card-image" />
              }></Card>
          ) }

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            { description && description }
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on xxxx xxx xxx to learn about this product.
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{ title }</h1>

        { product && product.rating && product.rating.length > 0 ? (
          showAverage(product)
        ) : (
            <div className="text-center pt-1 pb-3">No rating yet.</div>
          ) }

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
            <RatingModal>
              <StarRatings
                name={ _id }
                numberOfStars={ 5 }
                rating={ star }
                changeRating={ onStarClick }
                isSelectable={ true }
                starRatedColor="black"
              />
            </RatingModal>,
          ] }>
          <ProductListItems product={ product } />
        </Card>
      </div>
    </>
  );
}
