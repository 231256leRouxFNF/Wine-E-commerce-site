import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);

  const validTags = Array.isArray(product.tag)
    ? product.tag.filter((tag) => tag && tag.trim() !== "")
    : [];

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-img" />
        <button
          className="wishlist-button-top"
          aria-label="Add to Wishlist"
          onClick={() => setLiked(!liked)}
        >
          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
        {validTags.length > 0 && (
          <div className="product-badges">
            {validTags.slice(0, 2).map((tag, index) => (
              <span key={index} className="product-badge">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="product-content">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price">R{product.price?.toFixed(2)}</div>
        <div className="product-type">{product.type}</div>
        <p className="product-description">
          {product.description?.substring(0, 100)}...
        </p>
        <p className="product-meta">
          <strong>Varietal:</strong> {product.variety}
        </p>
        <p className="product-meta">
          <strong>Region:</strong> {product.region}
        </p>
        {product.style?.length > 0 && (
          <p className="product-meta">
            <strong>Style:</strong> {product.style.join(", ")}
          </p>
        )}
      </div>

      <div className="product-actions">
        <Link
          to={`/products/${product.id || product._id}`}
          className="product-link"
        >
          View Details
        </Link>
        <button className="product-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
