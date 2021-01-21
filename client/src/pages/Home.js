import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from '../components/category/CategoryList';

function Home() {
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={ ["Latset", "New Arrivals", "Best Sellers"] } />
      </div>

      <h4 className="text-center p-3 mb-5 display-3 jumbotron">New Arrivals</h4>

      <NewArrivals />
      <br />
      <br />


      <h4 className="text-center p-3 mb-5 display-3 jumbotron">Best Sellers</h4>

      <BestSellers />

      <h4 className="text-center p-3 mb-5 display-3 jumbotron">Categories</h4>

      <CategoryList />
      <br />
      <br />
    </>
  );
}

export default Home;
