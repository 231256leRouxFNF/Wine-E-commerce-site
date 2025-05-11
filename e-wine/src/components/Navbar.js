// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { Cart3, PersonCircle } from 'react-bootstrap-icons';
import './Navbar.css'; // Create this CSS file

const CustomNavbar = () => {
  // Temporary cart items count - replace with state/context later
  const cartItemsCount = 3;

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          🍷 e-Wine
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/products" className="nav-link-custom">
              Wines
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link-custom">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="nav-link-custom">
              <PersonCircle className="me-1" />
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="nav-link-custom">
              <Cart3 />
              <Badge bg="danger" className="ms-1 cart-badge">
                {cartItemsCount}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;