import React from "react";

export default function Checkout() {

  const saveAddreddToDB = () => {
    //
  }


  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery address </h4>
        <hr />
        <br />
          text area
          <button className="btn btn-primary mt-2" onClick={ saveAddreddToDB }>Save</button>
        <hr />
        <h4>Got coupon?</h4>
        <br />
        <br />
        coupom input and apply btn
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products</p>
        <hr />
        <p>List of products</p>
        <hr />
        <p>Cart total: $x</p>

        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary">Place Order</button>
          </div>

          <div className="col-md-6">
            <button className="btn btn-primary">Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
