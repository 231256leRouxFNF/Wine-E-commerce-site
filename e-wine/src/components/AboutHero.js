import React from "react";
import "./AboutHero.css";
import AboutHeroImage from "../assets/AboutHeroImage.jpeg";

const AboutHero = () => {
  return (
    <section
      className="aboutHeroSection"
      style={{ backgroundImage: `url(${AboutHeroImage})` }}
    >
      <div className="aboutHeroOverlay">
        <h1 className="aboutHeroTitle">About Pour Decisions</h1>
        <p className="aboutHeroTagline">
          Explore wines from across the globe — and add your favourites to our
          collection.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
