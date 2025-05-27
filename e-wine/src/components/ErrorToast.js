// src/components/ErrorToast.js
import React from "react";
import "./ErrorToast.css";

const ErrorToast = ({ message, onClose }) => {
  return (
    <div className="error-toast">
      <div className="toast-header">
        <div>
          <h4 className="toast-title">Whoops O'Clock</h4>
          <p className="toast-subtitle">Pour decisions were made...</p>
        </div>
      </div>
      <p className="toast-message">{message || "Something went wrong."}</p>
      <button onClick={onClose} className="toast-close">
        Okay
      </button>
    </div>
  );
};

export default ErrorToast;
