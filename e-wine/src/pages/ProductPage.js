import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

const ProductPage = () => {
  const { id } = useParams();
  // TODO: Fetch product data from API using the ID
  const product = mockProducts.find(p => p.id === Number(id));

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
