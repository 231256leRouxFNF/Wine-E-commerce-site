// components/AboutProductCard.js

import React from "react";
import { Link } from "react-router-dom";
import "./AboutProductCard.css";

const AboutProductCard = ({ product }) => {
  const validTags = Array.isArray(product.tag)
    ? product.tag.filter((tag) => tag && tag.trim() !== "")
    : [];

  return (
    <div className="about-product-card">
      <div className="about-product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="about-product-image"
        />
        {validTags.length > 0 && (
          <div className="about-product-tag">{validTags[0]}</div>
        )}
      </div>

      <div className="about-product-content">
        <div className="about-product-price">R{product.price?.toFixed(2)}</div>

        {product.title && (
          <h3 className="about-product-title">{product.title}</h3>
        )}

        <p
          className={`about-product-description ${
            !product.title ? "no-title" : ""
          }`}
        >
          {product.description?.substring(0, 80)}...
        </p>

        <Link
          to={`/products/${product._id || product.id}`}
          className="about-product-button"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default AboutProductCard;