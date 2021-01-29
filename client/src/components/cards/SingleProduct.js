import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from "../../images/laptop.jpg";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import RatingModal from "../modals/RatingModal";
import { showAverage } from "../../fucns/rating";
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART } from '../../redux/actionTypes';

const { TabPane } = Tabs;

// this is children component of Product page:
export default function SingleProduct({ product, onStarClick, star }) {
  const { title, images, description, _id } = product;


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
            <Tooltip title={ tooltip }>
              <a onClick={ handleAddToCart }>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
          </a>,
          </Tooltip>,
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
