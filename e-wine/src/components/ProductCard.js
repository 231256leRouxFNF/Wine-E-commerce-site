import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  // Use _id or id as unique ID
  const productId = product._id || product.id;

  // Setup state for liked and added status
  const [liked, setLiked] = useState(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    return favs.some((item) => (item._id || item.id) === productId);
  });
  const [added, setAdded] = useState(false);

  // Add to cart handler
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => (item._id || item.id) === productId);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  // Favourites handler
  const handleToggleFavourite = () => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    const exists = favs.find((item) => (item._id || item.id) === productId);
    let newFavs;
    if (exists) {
      newFavs = favs.filter((item) => (item._id || item.id) !== productId);
      setLiked(false);
    } else {
      newFavs = [...favs, product];
      setLiked(true);
    }
    localStorage.setItem("favourites", JSON.stringify(newFavs));
  };

  // Debug: Log cart and favourites on each render
  // console.log("Cart:", JSON.parse(localStorage.getItem("cart")));
  // console.log("Favourites:", JSON.parse(localStorage.getItem("favourites")));

  const validTags = Array.isArray(product.tag)
    ? product.tag.filter((tag) => tag && tag.trim() !== "")
    : [];

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-img" />
        <button
          className="wishlist-button-top"
          aria-label="Toggle Favourite"
          onClick={handleToggleFavourite}
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
          to={`/products/${productId}`}
          className="product-link"
        >
          View Details
        </Link>
        <button className="product-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
      {added && (
        <div
          style={{
            marginTop: 10,
            background: "#900639",
            color: "#fff",
            borderRadius: 6,
            padding: 6,
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductCard;