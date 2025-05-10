import React from 'react';
import { Row, Container } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

// Temporary mock data
const mockProducts = [
  { id: 1, title: 'Red Wine', price: 25.99, image: 'https://example.com/red-wine.jpg' },
  { id: 2, title: 'White Wine', price: 19.99, image: 'https://example.com/white-wine.jpg' },
];

const Home = () => {
  return (
    <Container>
      <h1 className="my-4">Featured Wines</h1>
      <Row xs={1} md={2} lg={3}>
        {mockProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
};

export default Home;
