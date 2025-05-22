import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        backgroundColor: "#ffffff",
        color: "#1c1c1c",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-6px)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={product.image}
        alt={product.title}
        sx={{
          objectFit: "cover",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" sx={{ fontWeight: 600 }}>
          {product.title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "#555" }}>
          {product.description?.substring(0, 100)}...
        </Typography>
        <Chip
          label={`R${product.price.toFixed(2)}`}
          sx={{
            backgroundColor: "#7b002c",
            color: "white",
            fontWeight: "bold",
            fontSize: "0.9rem",
          }}
        />
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          size="small"
          component={Link}
          to={`/products/${product.id}`}
          sx={{ color: "#7b002c", fontWeight: 500 }}
        >
          View Details
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{
            backgroundColor: "#7b002c",
            "&:hover": { backgroundColor: "#600022" },
            fontWeight: 500,
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
