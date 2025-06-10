import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import heroBanner from "../assets/HeroBanner.svg";

const Hero = () => {
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();

  const handleTransition = () => {
    setIsFading(true);
    setTimeout(() => {
      navigate("/products");
    }, 400);
  };

  return (
    <section className={`heroSection ${isFading ? "fadeOut" : ""}`}>
      <div
        className="heroBackground"
        style={{ backgroundImage: `url(${heroBanner})` }}
      ></div>

      <div className="heroContent">
        <h3 className="subtitle">Compare, Sip & Discover</h3>
        <h1 className="title">The Perfect Wine</h1>

        <button className="button" onClick={handleTransition}>
          View Selection
        </button>
      </div>
    </section>
  );
};

export default Hero;
