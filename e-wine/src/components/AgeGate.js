import React from "react";
import "./AgeGate.css";
import WineLogoWhiteRed from "../assets/WineLogoRedBlack.png";

const AgeGate = ({ onConfirm }) => {
  return (
    <div className="age-gate-overlay">
      <div className="age-gate-box">
        <img
          src={WineLogoWhiteRed}
          alt="Pour Decisions Logo"
          className="age-gate-logo"
        />
        <h2>Welcome to Pour Decisions</h2>
        <p>
          You must be 18 or older to enter this site. Are you of legal drinking
          age?
        </p>
        <button onClick={onConfirm}>Yes, I am 18 or older</button>
      </div>
    </div>
  );
};

export default AgeGate;
