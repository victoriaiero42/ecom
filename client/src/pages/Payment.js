import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../components/StripeCheckout';
import '../stripe.css';

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export default function Payment() {
  return (
    <div className="container p-5 text-center">

      <Elements stripe={ promise }>
        <h4>Complete your purchase</h4>
        <div className="col-md-8 offset=md-2">

          <StripeCheckout />
        </div>
      </Elements>

    </div>
  )
}
