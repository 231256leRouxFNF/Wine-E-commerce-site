import React from "react";
import AboutHero from "../components/AboutHero";
import Offerings from "../components/Offerings";
import Testimonials from "../components/Testimonials"; // ✅ Import the component
import "./About.css";

const About = () => {
  return (
    <div>
      <AboutHero />
      <section className="ourStorySection">
        <div className="aboutTextWrapper">
          <h2>How Pour Decisions Was Uncorked</h2>
          <p>
            At Pour Decisions, we believe that wine is more than a drink — it’s
            a journey across vineyards, cultures, and generations. Our platform
            was created to connect wine lovers with hidden gems from around the
            world, helping you compare, sip, and discover your perfect pour.
          </p>

          <h2>What We Offer</h2>
          <p>
            Whether you're a connoisseur or simply curious, our marketplace
            makes it easy to compare wines by region, type, and flavour profile.
            You can also contribute by adding your favourite wines to our
            growing database, complete with your own price insights.
          </p>

          <h2>Why Choose Us</h2>
          <p>
            We're more than an online store. We're a community of wine lovers
            driven by discovery, taste, and shared experiences. Join us in
            exploring a world of flavour — one bottle at a time.
          </p>
        </div>
      </section>
      <Offerings />
      <Testimonials /> {/* ✅ Added Testimonials at the bottom */}
    </div>
  );
};

export default About;
