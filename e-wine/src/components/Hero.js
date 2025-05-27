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
        <p className="description">
          It’s time to explore top-rated wines,
          compare flavors, and track price trends—all in one place.
        </p>

        <Link to="/compare" className="button">
          Start Comparing
        </Link>
      </div>
    </section>
  );
};

export default Hero;
