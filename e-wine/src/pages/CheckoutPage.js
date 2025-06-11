import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

// This working??
const PaymentPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/"); // Redirect to home or orders page after payment
      }, 2000);
    }, 1500);
  };

  return (
    <div className="payment-container">
      <h2>Mock Payment</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <label>Name on Card</label>
        <input type="text" placeholder="John Doe" required />

        <label>Card Number</label>
        <input type="text" placeholder="1234 5678 9012 3456" maxLength="19" required />

        <label>Expiry Date</label>
        <input type="text" placeholder="MM/YY" maxLength="5" required />

        <label>CVV</label>
        <input type="text" placeholder="123" maxLength="4" required />

        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
      {success && (
        <div className="payment-success">
          <h3>Payment Successful! 🎉</h3>
          <p>Thank you for your purchase.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;

// yeet this ig