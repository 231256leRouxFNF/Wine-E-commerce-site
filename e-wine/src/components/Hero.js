// src/components/Hero.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import heroBanner from "../assets/HeroBannerNew.png";

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
    <section className={`homeHeroSection ${isFading ? "fadeOut" : ""}`}>
      <img
        src={heroBanner}
        alt="Hero Banner"
        className="heroBannerBackground"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />
      <div className="heroOverlay">
        <h1 className="HeroTitle1">Pour Decisions</h1>
        <h2 className="HeroTitle2">end here</h2>
        {/* <p className="HeroSubtitle">Where every bottle has a story</p> */}
        <button className="button" onClick={handleTransition}>
          View Selection
        </button>
      </div>
    </section>
  );
};

export default Hero;
