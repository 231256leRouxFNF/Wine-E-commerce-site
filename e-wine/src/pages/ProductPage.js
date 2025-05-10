// ProductPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

// Add mock data here (same as in Home.js)
const mockProducts = [
  { id: 1, title: 'Red Wine', price: 25.99, image: 'https://example.com/red-wine.jpg' },
  { id: 2, title: 'White Wine', price: 19.99, image: 'https://example.com/white-wine.jpg' },
];

const ProductPage = () => {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === Number(id));

  // Handle case where product is undefined
  if (!product) return <div>Product not found</div>;

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid />
        </Col>
        <Col md={6}>
          <h1>{product.title}</h1>
          <p className="lead">£{product.price}</p>
          <p>{product.description || 'Premium quality wine.'}</p>
          <Button variant="primary">Add to Cart</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;