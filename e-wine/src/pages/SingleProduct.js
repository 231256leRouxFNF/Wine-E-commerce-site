// src/pages/SingleProduct.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SingleProduct.css";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="single-product-container">
      <img
        src={product.image}
        alt={product.title}
        className="single-product-image"
      />
      <div className="single-product-info">
        <h1 className="single-product-title">{product.title}</h1>
        <p className="single-product-price">R{product.price?.toFixed(2)}</p>
        <p className="single-product-description">{product.description}</p>
        <div className="single-product-meta">
          <p>
            <strong>Type:</strong> {product.type}
          </p>
          <p>
            <strong>Region:</strong> {product.region}
          </p>
          <p>
            <strong>Varietal:</strong> {product.variety}
          </p>
          {product.style?.length > 0 && (
            <p>
              <strong>Style:</strong> {product.style.join(", ")}
            </p>
          )}
        </div>
        <button className="single-product-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default SingleProduct;
