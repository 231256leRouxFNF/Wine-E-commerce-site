// src/components/ProductCard.js
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <Card className="productCard">
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        className="productImage"
      />

      <CardContent className="productContent">
        <Typography variant="h6" className="productTitle">
          {product.title}
        </Typography>

        <Typography variant="subtitle2" className="productType">
          {product.type}
        </Typography>

        <Typography variant="body2" className="productDescription">
          {product.description?.substring(0, 100)}...
        </Typography>

        <Typography variant="body2" className="productMeta">
          <strong>Varietal:</strong> {product.variety}
        </Typography>

        <Typography variant="body2" className="productMeta">
          <strong>Region:</strong> {product.region}
        </Typography>

        {product.style?.length > 0 && (
          <Typography variant="body2" className="productMeta">
            <strong>Style:</strong> {product.style.join(", ")}
          </Typography>
        )}

        {product.tag?.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
            {product.tag.map((tag, index) => (
              <Chip key={index} label={tag} className="productTag" />
            ))}
          </Stack>
        )}

        <Box sx={{ mt: 2 }}>
          <Chip
            label={`R${product.price.toFixed(2)}`}
            variant="outlined"
            className="productPrice"
          />
        </Box>
      </CardContent>

      <CardActions className="productActions">
        <Button
          size="small"
          component={Link}
          to={`/products/${product.id}`}
          className="viewDetailsButton"
        >
          View Details
        </Button>

        <Button size="small" variant="contained" className="addToCartButton">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
