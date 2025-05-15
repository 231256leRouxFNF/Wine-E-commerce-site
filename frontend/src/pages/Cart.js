import React from 'react';
import { 
  Container, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, 
  Typography, Button 
} from '@mui/material';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems = [] }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell align="right">£{item.price}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">£{(item.price * item.quantity).toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right">
                <Typography variant="h6">Total:</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">£{total.toFixed(2)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          component={Link}
          to="/checkout"
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;