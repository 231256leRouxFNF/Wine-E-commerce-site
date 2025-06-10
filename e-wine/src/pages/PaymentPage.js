import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm"; // You will create this next

// Replace with your Stripe public key
const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX");

const PaymentPage = () => (
  <div>
    <h2>Checkout / Payment</h2>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default PaymentPage;