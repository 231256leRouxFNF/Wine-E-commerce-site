import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import heroBanner from "../assets/HeroBanner.svg";

const Hero = () => {
  return (
    <section className="heroSection">
      <div
        className="heroBackground"
        style={{ backgroundImage: `url(${heroBanner})` }}
      ></div>

      {/* Content Container */}
      <div className="heroContent">
        <h3 className="subtitle">Compare, Sip & Discover</h3>
        <h1 className="title">The Perfect Wine</h1>

        <Link to="/compare" className="button">
          View Selection
        </Link>
      </div>
    </section>
  );
};

export default Hero;
