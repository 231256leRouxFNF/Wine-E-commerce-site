// src/components/FeaturedCarousel.js
import React from "react";
import Slider from "react-slick";
import AboutProductCard from "./AboutProductCard";
import "./FeaturedCarousel.css";

const FeaturedCarousel = ({ products }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="featuredCarouselWrapper">
      <Slider {...settings}>
        {products.map((wine) => (
          <AboutProductCard key={wine._id} product={wine} />
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedCarousel;
