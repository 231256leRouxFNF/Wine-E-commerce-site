import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Button, Typography, Divider } from "@mui/material";
import "./SingleProduct.css";
import { CartContext } from "../context/CartContext";
import Review from "../components/Review";
import AddReview from "../components/AddReview";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showAddReview, setShowAddReview] = useState(false);
  const { addToCart } = useContext(CartContext);

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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/product/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    if (id) {
      fetchReviews();
    }
  }, [id]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleReviewAdded = async () => {
    try {
      const res = await axios.get(`/api/reviews/product/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to refresh reviews:", err);
    }
  };

  if (!product) return <div className="loading">Loading...</div>;

  const validTags = Array.isArray(product.tag)
    ? product.tag.filter((tag) => tag && tag.trim() !== "")
    : [];

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="single-product-page">
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

      <Divider sx={{ my: 4, mx: 6 }} />

      <div className="reviews-section">
        <div className="reviews-header">
          <Typography variant="h5" className="reviews-title">
            Customer Reviews
          </Typography>
          {reviews.length > 0 && (
            <Typography variant="subtitle1" className="reviews-summary">
              {averageRating} ★ ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
            </Typography>
          )}
        </div>

        <Button
          variant="contained"
          onClick={() => setShowAddReview(true)}
          sx={{
            backgroundColor: "#900639",
            color: "white",
            fontFamily: "Montserrat",
            fontWeight: 600,
            borderRadius: "999px",
            px: 3,
            py: 1,
            mb: 3,
            "&:hover": {
              backgroundColor: "#600022",
            },
          }}
        >
          Add Review
        </Button>

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <Typography variant="body1" sx={{ color: "#666", fontFamily: "Montserrat" }}>
              No reviews yet. Be the first to review this wine!
            </Typography>
          ) : (
            reviews.map((review) => <Review key={review._id} review={review} />)
          )}
        </div>
      </div>

      <AddReview
        open={showAddReview}
        onClose={() => setShowAddReview(false)}
        productId={id}
        onReviewAdded={handleReviewAdded}
      />
    </div>
  );
};

export default SingleProduct;
