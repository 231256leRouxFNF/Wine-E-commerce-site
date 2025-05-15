import React from 'react';
import { 
  Card, CardMedia, CardContent, CardActions, 
  Typography, Button, Chip 
} from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image || '/placeholder-wine.jpg'}
        alt={product.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description?.substring(0, 100)}...
        </Typography>
        <Chip 
          label={`£${product.price}`} 
          color="primary" 
          variant="outlined"
          sx={{ fontWeight: 'bold' }}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Button 
          size="small" 
          color="primary"
          component={Link}
          to={`/products/${product.id}`}
        >
          View Details
        </Button>
        <Button size="small" color="secondary" variant="contained">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;