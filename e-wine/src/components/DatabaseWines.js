import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DatabaseWines.css";
import ErrorToast from "./ErrorToast";
import ConfirmModal from "./ConfirmModal";

const DatabaseWines = () => {
  const [wines, setWines] = useState([]);
  const [filteredWines, setFilteredWines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedWineId, setSelectedWineId] = useState(null);
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    fetchWines();
  }, []);

  useEffect(() => {
    if (filterType === "All") {
      setFilteredWines(wines);
    } else {
      setFilteredWines(wines.filter((wine) => wine.type === filterType));
    }
  }, [filterType, wines]);

  const fetchWines = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/products");
      setWines(res.data);
    } catch (err) {
      setError("Could not fetch wines.");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    const wineId = selectedWineId;
    setSelectedWineId(null);
    try {
      await axios.delete(`/api/products/${wineId}`);
      setWines((prev) => prev.filter((w) => w._id !== wineId));
    } catch (err) {
      setError("Could not delete wine.");
    }
  };

  const uniqueTypes = [
    "All",
    ...new Set(wines.map((wine) => wine.type).filter(Boolean)),
  ];

  return (
    <div className="database-wines-container">
      {/* <h2 className="db-title">All Wines</h2> */}

      <div className="filter-bar">
        <label htmlFor="type-filter">Filter by Type:</label>
        <select
          id="type-filter"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading wines...</p>
      ) : (
        <ul className="wine-list-admin">
          {filteredWines.map((wine) => (
            <li key={wine._id} className="wine-list-item-admin">
              <div className="wine-title">{wine.title}</div>
              <div className="wine-details">
                R{wine.price} {wine.type && <>| {wine.type}</>}{" "}
                {wine.region && <>| {wine.region}</>}
              </div>
              <button
                onClick={() => setSelectedWineId(wine._id)}
                className="delete-wine-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedWineId && (
        <ConfirmModal
          message="Are you sure you want to delete this wine?"
          onConfirm={handleDelete}
          onCancel={() => setSelectedWineId(null)}
        />
      )}

      {error && <ErrorToast message={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default DatabaseWines;
