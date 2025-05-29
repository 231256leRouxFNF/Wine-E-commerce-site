// Filters.js
import React, { useState } from "react";
import "./Filters.css";

const wineTypes = [
  "Pinot noir",
  "Cabernet Sauvignon",
  "Merlot",
  "Chardonnay",
  "Sauvignon Blanc",
  "Riesling",
  "Syrah",
  "Zinfandel",
  "Malbec",
  "Tempranillo",
  "Pinot Grigio",
  "Grenache",
  "Barbera",
  "Nebbiolo",
  "Cabernet Franc",
  "Viognier",
  "Chenin Blanc",
  "Moscato",
  "Prosecco",
  "Champagne",
  "Sparkling Wine",
  "Dessert Wine",
  "Port Wine",
  "Sherry",
  "Madeira",
];

const wineColors = ["Red", "White", "Rosé", "Sparkling", "Dessert"];

const wineRegions = [
  "Bordeaux",
  "Napa Valley",
  "Tuscany",
  "Rioja",
  "Barossa Valley",
  "Champagne",
  "Sonoma County",
  "Willamette Valley",
  "Mendoza",
  "Piedmont",
  "Loire Valley",
  "Alsace",
  "Oregon",
];

const Filters = ({ onFilterChange }) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    onFilterChange({
      type: e.target.value,
      color: selectedColor,
      region: selectedRegion,
    });
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    onFilterChange({
      type: selectedType,
      color: e.target.value,
      region: selectedRegion,
    });
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    onFilterChange({
      type: selectedType,
      color: selectedColor,
      region: e.target.value,
    });
  };

  return (
    <div className="filters-bar">
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="type">Type</label>
          <select id="type" value={selectedType} onChange={handleTypeChange}>
            <option value="">All</option>
            {wineTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="color">Color</label>
          <select id="color" value={selectedColor} onChange={handleColorChange}>
            <option value="">All</option>
            {wineColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="region">Region</label>
          <select
            id="region"
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            <option value="">All</option>
            {wineRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
