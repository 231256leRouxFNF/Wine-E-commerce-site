import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
    inStock: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', product);
      alert('Product added!');
      setProduct({ title: '', description: '', price: '', image: '', category: '', inStock: true });
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
  alert(`Error adding product: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <input name="title" placeholder="Title" value={product.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" value={product.price} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={product.image} onChange={handleChange} />
        <input name="category" placeholder="Category" value={product.category} onChange={handleChange} />
        <label>
          In Stock:
          <input type="checkbox" name="inStock" checked={product.inStock} onChange={handleChange} />
        </label>
        <button type="submit" style={{ marginTop: '1rem' }}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
