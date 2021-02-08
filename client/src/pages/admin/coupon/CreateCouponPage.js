import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from 'react-datepicker';
import { getCoupons, removeCoupon, createCoupon } from '../../../fucns/coupon';
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from "../../../components/nav/AdminNav";

export default function CreateCouponPage() {
  return (
    <div className='container-fluid' >
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <h4>Coupon</h4>
        </div>
      </div>
    </div>
  )
}
