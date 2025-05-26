import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />

      <div className="product-content">
        <h3 className="product-title">{product.title}</h3>
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

        {product.tag?.length > 0 && (
          <div className="product-tags">
            {product.tag.map((tag, index) => (
              <span key={index} className="product-tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="product-price">R{product.price?.toFixed(2)}</div>
      </div>

      <div className="product-actions">
        <Link to={`/products/${product.id || product._id}`} className="product-link">
          View Details
        </Link>
        <button className="product-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
