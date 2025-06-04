import React from "react";
import "./ErrorToast.css";

const ErrorToast = ({ message, onClose }) => {
  return (
    <div className="toast-overlay">
      <div className="error-toast">
        <button className="close-toast" onClick={onClose}>
          &times;
        </button>
        <h3>Oops, Pour Decisions were made...</h3>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorToast;
