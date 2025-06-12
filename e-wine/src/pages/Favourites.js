// pages/Favourites.js
import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import "./Favourites.css";
import { FavouritesContext } from "../context/FavouritesContext";

const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <div className="grid-wrapper">
      <h1 className="favouritesHeading">Your Favourite Wines</h1>
      <p className="favouritesText">
        Add any wine to your favourites list by clicking the heart icon at the
        top of the wine image.
      </p>

      <div className="product-grid">
        {favourites.length > 0 ? (
          favourites.map((product) => (
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
