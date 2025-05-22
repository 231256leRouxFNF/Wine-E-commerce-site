import React, { useState, useEffect } from 'react';
import { Container, Grid, CircularProgress, Typography } from '@mui/material';

import Filters from '../components/Filters'; 
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <CircularProgress sx={{ display: 'block', m: 'auto' }} />;

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Our Wine Collection
        </Typography>
              <Filters />
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              {/* Render your product card here */}
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ProductList;