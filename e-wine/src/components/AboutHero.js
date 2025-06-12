import React from "react";
import "./AboutHero.css";
import AboutHeroImage from "../assets/Illustration1.svg";

const AboutHero = () => {
  return (
    <section
      className="aboutHeroSection"
      style={{ backgroundImage: `url(${AboutHeroImage})` }}
    >
      <div className="aboutHeroOverlay">
      </div>
    </section>
  );
};

export default AboutHero;
