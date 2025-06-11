// src/pages/Products.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import ImageLoader from "../components/ImageLoader";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
        setLoading(false);
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
    setCurrentPage(1); // Reset to page 1 when filters change
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

const goToPage = (pageNum) => {
  if (pageNum >= 1 && pageNum <= totalPages) {
    setCurrentPage(pageNum);
    const gridTop = document.querySelector(".product-grid");
    if (gridTop) {
      gridTop.scrollIntoView({ behavior: "smooth" });
    }
  }
};

  if (loading) return <ImageLoader />;

  return (
    <>
      <Filters onFilterChange={handleFilterChange} />

      <div className="grid-wrapper">
        <div className="product-grid">
          {paginatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;
