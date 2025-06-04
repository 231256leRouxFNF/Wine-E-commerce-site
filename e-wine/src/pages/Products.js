// src/pages/Products.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters"; // ✅ Import the Filters component
import "./Products.css"; // ✅ Import page styling

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        console.log("Fetched products:", res.data);
        setProducts(res.data);
        setFilteredProducts(res.data); // Initialize filtered list
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = ({ type, color, region }) => {
    let filtered = [...products];

    if (type) {
      filtered = filtered.filter(
        (p) => p.type?.toLowerCase() === type.toLowerCase()
      );
    }

    if (color) {
      filtered = filtered.filter(
        (p) => p.color?.toLowerCase() === color.toLowerCase()
      );
    }

    if (region) {
      filtered = filtered.filter(
        (p) => p.region?.toLowerCase() === region.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      <Filters onFilterChange={handleFilterChange} />
      <div className="grid-wrapper">
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
