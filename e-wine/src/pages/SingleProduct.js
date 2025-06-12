import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./SingleProduct.css";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext"; // ✅ import context

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);
  const { favourites, toggleFavourite } = useContext(FavouritesContext); // ✅ use context

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) return <div className="loading">Loading...</div>;

  const validTags = Array.isArray(product.tag)
    ? product.tag.filter((tag) => tag && tag.trim() !== "")
    : [];

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const isLiked = favourites.some((p) => p._id === product._id); // ✅ check if in favourites

  return (
    <div className="single-product-container">
      <div className="single-product-img-section">
        <div className="single-product-img-container">
          <img
            src={product.image}
            alt={product.title}
            className="single-product-img"
          />

          <button
            className="wishlist-button-top"
            aria-label="Add to Wishlist"
            onClick={() => toggleFavourite(product)} // ✅ toggle on click
          >
            {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
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
      </div>

      <div className="single-product-details">
        <div className="single-product-type">{product.type}</div>
        <h1 className="single-product-title">{product.title}</h1>
        <div className="product-price">R{product.price?.toFixed(2)}</div>
        <p className="single-product-description">{product.description}</p>
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

        <div className="single-product-actions">
          <div className="quantity-selector">
            <button onClick={decreaseQty}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>
          <button className="product-button" onClick={handleAddToCart}>
            Add {quantity} to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
