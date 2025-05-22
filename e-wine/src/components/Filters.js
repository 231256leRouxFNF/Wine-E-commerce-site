import React, { useState } from "react";
import './Filters.css'; 

const wineTypes = [ "Pinot noir", "Cabernet Sauvignon", "Merlot", "Chardonnay", "Sauvignon Blanc", "Riesling", "Syrah", "Zinfandel", "Malbec", "Tempranillo", "Sauvignon Blanc", "Pinot Grigio", "Malbec", "Grenache", "Barbera", "Nebbiolo", "Cabernet Franc", "Viognier", "Chenin Blanc", "Moscato", "Prosecco", "Champagne", "Sparkling Wine", "Dessert Wine", "Port Wine", "Sherry", "Madeira" ];
const wineColors = [ "Red", "White", "Rosé", "Sparkling", "Dessert" ];
const wineRegions = [ "Bordeaux", "Napa Valley", "Tuscany", "Rioja", "Barossa Valley", "Champagne", "Sonoma County", "Willamette Valley", "Mendoza", "Piedmont", "Loire Valley", "Alsace", "Oregon" ];

export default function Filters({ onFilterChange }) {
    const [selectedType, setSelectedType] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        onFilterChange({ type: event.target.value, color: selectedColor, region: selectedRegion });
    };
    
    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
        onFilterChange({ type: selectedType, color: event.target.value, region: selectedRegion });
    };
    
    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
        onFilterChange({ type: selectedType, color: selectedColor, region: event.target.value });
    };
    
    return (
        <div>
      <h3>Filter Wines</h3>
      <div className="filters-row">
        <div className="filter-group">
          <label>Wine Type:</label>
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="">All</option>
            {wineTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Wine Color:</label>
          <select value={selectedColor} onChange={handleColorChange}>
            <option value="">All</option>
            {wineColors.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Wine Region:</label>
          <select value={selectedRegion} onChange={handleRegionChange}>
            <option value="">All</option>
            {wineRegions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
    );
    }

