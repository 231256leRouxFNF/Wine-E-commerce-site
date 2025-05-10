import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img variant="top" src={product.image || 'https://via.placeholder.com/300'} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>£{product.price}</Card.Text>
        <Button variant="primary" as={Link} to={`/product/${product.id}`}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
