import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import heroBanner from "../assets/Illustration3.svg";

const Hero = () => {
  const [isFading, setIsFading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  const handleTransition = () => {
    setIsFading(true);
    setTimeout(() => {
      navigate("/products");
    }, 400);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={`heroSection ${isFading ? "fadeOut" : ""}`}>
      <div
        className="heroBackground"
        style={{
          backgroundImage: `url(${heroBanner})`,
          transform: `translateY(${Math.max(-scrollY * 0.2, -200)}px)`,
        }}
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
