import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DatabaseWines.css";
import ErrorToast from "./ErrorToast";
import ConfirmModal from "./ConfirmModal";

const DatabaseWines = () => {
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedWineId, setSelectedWineId] = useState(null);

  useEffect(() => {
    fetchWines();
  }, []);

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
    // Immediately close the confirmation popup
    setSelectedWineId(null);

    try {
      await axios.delete(`/api/products/${wineId}`);
      setWines((prev) => prev.filter((w) => w._id !== wineId));
    } catch (err) {
      setError("Could not delete wine.");
    }
  };

  return (
    <div className="database-wines-container">
      <h2>All Wines</h2>

      {loading ? (
        <p>Loading wines...</p>
      ) : (
        <ul className="wine-list-admin">
          {wines.map((wine) => (
            <li key={wine._id} className="wine-list-item-admin">
              <div>
                <strong>{wine.title}</strong> - R{wine.price}
                {wine.type && <span> | {wine.type}</span>}
                {wine.region && <span> | {wine.region}</span>}
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
