import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { getCoupons, removeCoupon, createCoupon } from "../../../fucns/coupon";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";

export default function CreateCouponPage() {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        setDiscount('');
        setExpiry('');
        toast.success(`"${res.data.name}" is created.`)
      }).catch(err => console.log('create coupon error', err))
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Coupon</h4>

          <form onSubmit={ handleSubmit }>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={ (e) => setName(e.target.value) }
                value={ name }
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={ (e) => setDiscount(e.target.value) }
                value={ discount }
                required
              />
            </div>

            <div className="form-group">
              <br />
              <DatePicker
                className="form-control"
                selected={ new Date() }
                value={ expiry }
                onChange={ (date) => setExpiry(date) }
                required
              />
            </div>
            <button className="btn btn-outline-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
