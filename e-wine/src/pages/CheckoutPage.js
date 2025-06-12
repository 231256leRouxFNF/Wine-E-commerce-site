import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";
import SuccessToast from "../components/SuccessToast";
import { CartContext } from "../context/CartContext"; // ✅ Import CartContext

const CheckoutPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const { cartItems, clearCart, updateCartCount } = useContext(CartContext); // ✅ Access cart context

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowToast(true);

      // ✅ Clear cart and update count by total quantity, not item count
      const totalQuantity = cartItems.reduce(
        (acc, item) => acc + (item.quantity || 1),
        0
      );
      clearCart();
      updateCartCount(0); // ✅ Reset cart count in context (you can optionally use totalQuantity to show how many were purchased before reset)

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
