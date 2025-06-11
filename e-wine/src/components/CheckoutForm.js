import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }
    // This would call your backend to create a PaymentIntent in production
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    } else {
      setError(null);
      alert("Payment method created! You would now proceed with backend payment processing.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <CardElement />
      <button type="submit" disabled={!stripe || processing} style={{ marginTop: 16 }}>
        {processing ? "Processing..." : "Pay"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};

export default CheckoutForm;