// pages/Favourites.js
import React, { useContext, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Favourites.css";
import { FavouritesContext } from "../context/FavouritesContext";

const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(favourites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFavourites = favourites.slice(
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

  return (
    <div className="grid-wrapper">
      <h1 className="favouritesHeading">Your Favourite Wines</h1>
      {/* <p className="favouritesText">
        You haven’t added any favourites yet. Click the heart icon to save your
        favourite wines.
      </p> */}

      <div className="product-grid">
        {favourites.length > 0 ? (
          paginatedFavourites.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="favouritesEmpty">
            No favourites yet. Click the heart icon to get started!
          </p>
        )}
      </div>

      {favourites.length > 0 && (
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
      )}
    </div>
  );
};

export default Favourites;
