import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";
import SuccessToast from "../components/SuccessToast";
import { CartContext } from "../context/CartContext";

const CheckoutPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const { cartItems, clearCart, updateCartCount } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowToast(true);
      clearCart();
      updateCartCount(0);

      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <div className="checkoutContainer">
        <div className="checkoutCard">
          <h2 className="checkoutTitle">Complete Your Order</h2>

          {/* ✅ Display order total */}
          <p className="checkoutTotal">
            <strong>Order Total:</strong> R{total.toFixed(2)}
          </p>

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
        </div>
      </div>

      {showToast && (
        <SuccessToast
          message="Payment successful! Your wine is on its way. Cheers!"
          onClose={() => {
            setShowToast(false);
            navigate("/");
          }}
        />
      )}
    </>
  );
};

export default CheckoutPage;
