
import React from "react";
import AdminNav from "../../components/nav/AdminNav";

export default function AllProducts() {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          <h4>admin dashboard:</h4>
        </div>
      </div>
    </div>
  );
}
