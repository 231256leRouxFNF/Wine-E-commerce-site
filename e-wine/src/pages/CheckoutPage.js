import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

const CheckoutPage = () => {
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
        navigate("/"); // Go to homepage after success
      }, 2000);
    }, 1500);
  };

  return (
    <div className="checkoutContainer">
      <div className="checkoutCard">
        <h2 className="checkoutTitle">Complete Your Order</h2>
        <form className="checkoutForm" onSubmit={handleSubmit}>
          <label>Name on Card</label>
          <input type="text" placeholder="John Doe" required />

          <label>Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            required
          />

          <label>Expiry Date</label>
          <input type="text" placeholder="MM/YY" maxLength="5" required />

          <label>CVV</label>
          <input type="text" placeholder="123" maxLength="4" required />

          <button type="submit" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </form>

        {success && (
          <div className="checkoutSuccess">
            <h3>Payment Successful</h3>
            <p>Your wine is on its way. Cheers! 🍷</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
