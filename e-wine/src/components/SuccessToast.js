import React from "react";
import "./SuccessToast.css";

const SuccessToast = ({ message, onClose }) => {
  return (
    <div className="toast-overlay">
      <div className="success-toast">
        <button onClick={onClose}>&times;</button>
        <h2>Wine-tastic!</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SuccessToast;
