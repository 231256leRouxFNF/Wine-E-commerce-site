// pages/Favourites.js
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Favourites.css";

const Favourites = () => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    // Get liked product IDs from localStorage
    const liked = JSON.parse(localStorage.getItem("likedProducts")) || [];

    // Optional: replace with API fetch if liked product IDs are stored backend
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        const filtered = data.filter((product) => liked.includes(product._id));
        setLikedProducts(filtered);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div className="grid-wrapper">
      <h1 className="favouritesHeading">Your Favourite Wines</h1>
      <p className="favouritesText">
        Add any wine to your favourites list by clicking the heart icon at the
        top of the wine image.
      </p>

      <div className="product-grid">
        {likedProducts.length > 0 ? (
          likedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="favouritesEmpty">
            You haven’t added any favourites yet. ❤️
          </p>
        )}
      </div>
    </div>
  );
};

export default Favourites;
