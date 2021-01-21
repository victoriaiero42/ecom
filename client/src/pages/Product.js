import React, { useEffect, useState } from "react";
import { getProduct, productStar, getRelated } from "../fucns/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import ProductCard from '../components/cards/ProductCard';

export default function Product({ match }) {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);
  const { user } = useSelector(state => ({ ...state }))

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.rating && user) {
      let existingRatingObject = product.rating.find(e => {
        return e.postedBy.toString() === user._id.toString()
      })
      existingRatingObject && setStar(existingRatingObject.star);
    }

  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      getRelated(res.data._id).then(res => {
        setRelated(res.data)
      })
    });
  };



  const onStarClick = (newRating, name) => {
    setStar(newRating)
    console.log(newRating, name);
    productStar(name, newRating, user.token)
      .then(res => {
        console.log('rating', res.data);
        loadSingleProduct();
      })

  }

  return (
    <>
      <div className="container-fluid">
        <div className="row pt-4">
          <SingleProduct product={ product } onStarClick={ onStarClick } star={ star } />
        </div>
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>

      <div className="row pb-5">
        { related.length ? related.map((r) => (
          <div key={ r._id }>
            <ProductCard product={ r } />
          </div>)) : 'No products found' }
      </div>
    </>
  );
}
