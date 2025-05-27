import React, { useState } from "react";
import axios from "axios";
import ErrorToast from "../components/ErrorToast";
import "./AddProduct.css";

const typeOptions = [
  "Red Wine",
  "White Wine",
  "Rosé Wine",
  "Sparkling Wine",
  "Dessert Wine",
  "Fortified Wine (e.g., Port, Sherry)",
];

const regionOptions = [
  "France",
  "Italy",
  "Spain",
  "South Africa",
  "USA",
  "Chile",
  "Argentina",
  "Australia",
  "New Zealand",
];

const varietyOptions = [
  "Merlot",
  "Cabernet Sauvignon",
  "Pinot Noir",
  "Shiraz / Syrah",
  "Malbec",
  "Zinfandel",
  "Tempranillo",
  "Sangiovese",
  "Sauvignon Blanc",
  "Chardonnay",
  "Riesling",
  "Chenin Blanc",
  "Pinot Grigio / Pinot Gris",
  "Viognier",
  "Gewürztraminer",
  "Semillon",
];

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    type: "",
    description: "",
    variety: "",
    region: "",
    style: "",
    tag: "",
    price: "",
    image: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/products", {
        ...product,
        price: parseFloat(product.price),
        style: Array.isArray(product.style)
          ? product.style
          : product.style.split(",").map((s) => s.trim()),
        tag: Array.isArray(product.tag)
          ? product.tag
          : product.tag.split(",").map((t) => t.trim()),
      });
      alert("✅ Product added successfully!");
      setProduct({
        title: "",
        type: "",
        description: "",
        variety: "",
        region: "",
        style: "",
        tag: "",
        price: "",
        image: "",
      });
      setError(null);
    } catch (err) {
      console.error(
        "❌ Error adding product:",
        err.response?.data || err.message
      );
      setError("Could not add wine.");
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="form-title">Add New Wine Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
        />

        <label>Type:</label>
        <select
          name="type"
          value={product.type}
          onChange={handleChange}
          required
        >
          <option value="">Select a type</option>
          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />

        <label>Varietal:</label>
        <select
          name="variety"
          value={product.variety}
          onChange={handleChange}
          required
        >
          <option value="">Select a varietal</option>
          {varietyOptions.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        <label>Region:</label>
        <select
          name="region"
          value={product.region}
          onChange={handleChange}
          required
        >
          <option value="">Select a region</option>
          {regionOptions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <label>Style (comma-separated):</label>
        <input
          type="text"
          name="style"
          value={product.style}
          onChange={handleChange}
        />

        <label>Tags (comma-separated):</label>
        <input
          type="text"
          name="tag"
          value={product.tag}
          onChange={handleChange}
        />

        <label>Price (R):</label>
        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          required
        />

        <label>Wine Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {product.image && (
          <img src={product.image} alt="Preview" className="preview-image" />
        )}

        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>

      {error && <ErrorToast message={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default AddProduct;
