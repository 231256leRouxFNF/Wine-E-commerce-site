import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AboutHero from "../components/AboutHero";
import Offerings from "../components/Offerings";
import Testimonials from "../components/Testimonials";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import "./About.css";

const About = () => {
  const [randomWine, setRandomWine] = useState(null);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const res = await axios.get("/api/products");
        if (res.data.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.data.length);
          setRandomWine(res.data[randomIndex]);
        }
      } catch (err) {
        console.error("Could not fetch wines for random product section.");
      }
    };

    fetchWines();
  }, []);

  return (
    <div>
      <AboutHero />

      <section className="ourStorySection">
        <div className="aboutTextWrapper">
          <div className="aboutHeader">
            <h4>OUR STORY</h4>
            <h2>How Pour Decisions Was Uncorked</h2>
          </div>
          <p>
            At Pour Decisions, we believe that wine is more than a drink — it’s
            a journey across vineyards, cultures, and generations. Our name is a
            playful twist on the phrase “poor decisions,” celebrating those
            unforgettable wine moments that sometimes start with a pour and end
            with a story. We turned that wordplay into our identity — where
            every pour becomes a possibility, not a mistake.
          </p>

          <Offerings />

          {randomWine && (
            <div className="featuredWine">
              <div className="featuredHeader">
                <h4>FEATURED</h4>
                <h2>Have You Tried These Wines?</h2>
              </div>
              <div className="featuredSingleCardWrapper">
                <ProductCard product={randomWine} />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="whyChooseSection">
        <div className="whyChooseGrid">
          <div className="whyChooseImage" />
          <div className="whyChooseContent">
            <div className="aboutHeader">
              <h2>Why Choose Us</h2>
            </div>
            <p className="whyChooseDescription">
              <strong>Pour Decisions</strong> isn’t just a platform — it’s a
              community. Our users shape the wine database with their own
              favorites and price updates, making this a living, breathing
              cellar curated by real people. With elegant design, fast filtering
              tools, and inclusive global wines, we’re here to make your wine
              journey smart, social, and personal.
            </p>
            <div className="whyChooseButtons">
              <Link to="/Products" className="whyChoosePrimary">
                Buy Now
              </Link>
              <Link to="/Contact" className="whyChooseSecondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default About;
