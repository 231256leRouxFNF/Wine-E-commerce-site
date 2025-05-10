import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';

const Cart = () => {
  return (
    <Container className="my-5">
      <h1>Your Cart</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO: Dynamic cart items */}
          <tr>
            <td>Red Wine</td>
            <td>£25.99</td>
            <td>1</td>
            <td>£25.99</td>
          </tr>
        </tbody>
      </Table>
      <div className="text-end">
        <h4>Total: £25.99</h4>
        <Button variant="success">Checkout</Button>
      </div>
    </Container>
  );
};

export default Cart;
