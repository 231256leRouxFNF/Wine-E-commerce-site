import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // update the path if different

const Products = () => {
  const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      console.log('Fetched products:', res.data); // ✅ Log this
      setProducts(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch products:', err);
    }
  };

  fetchProducts();
}, []);


  return (
    <div className="products-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '2rem' }}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
