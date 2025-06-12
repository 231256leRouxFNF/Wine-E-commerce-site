import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./ProductCard.css";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";

const ProductCard = ({ product }) => {
  const [added, setAdded] = useState(false);

  const { addToCart } = useContext(CartContext);
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const liked = favourites.some((p) => p._id === product._id);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // Hide confirmation after 1.5s
  };

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
          onClick={() => toggleFavourite(product)}
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
          to={`/products/${product._id}`}
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