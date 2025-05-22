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

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        maxWidth: 320,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "16px",
        backgroundColor: "#FFFEFC",
        color: "#1c1c1c",
        boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-6px)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{
          objectFit: "cover",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Playfair Display, serif",
            fontWeight: 700,
            fontSize: "20px",
            mb: 0.5,
          }}
        >
          {product.title}
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: "13px",
            color: "#900639",
            mb: 1,
          }}
        >
          {product.type}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "14px",
            color: "#555",
            mb: 1,
          }}
        >
          {product.description?.substring(0, 100)}...
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "13px",
            mb: 0.5,
          }}
        >
          <strong>Varietal:</strong> {product.variety}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "13px",
            mb: 0.5,
          }}
        >
          <strong>Region:</strong> {product.region}
        </Typography>

        {product.style && product.style.length > 0 && (
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "13px",
              mb: 0.5,
            }}
          >
            <strong>Style:</strong> {product.style.join(", ")}
          </Typography>
        )}

        {product.tag && product.tag.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
            {product.tag.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: "#f3f3f3",
                  color: "#900639",
                  fontSize: "12px",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                }}
              />
            ))}
          </Stack>
        )}

        <Box sx={{ mt: 2 }}>
          <Chip
            label={`R${product.price.toFixed(2)}`}
            variant="outlined"
            sx={{
              fontWeight: 600,
              fontSize: "0.85rem",
              fontFamily: "Montserrat, sans-serif",
              px: 1.5,
              py: 0.5,
              color: "#900639",
              borderColor: "#900639",
              backgroundColor: "#ffffff",
            }}
          />
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          size="small"
          component={Link}
          to={`/products/${product.id}`}
          sx={{
            color: "#900639",
            fontWeight: 500,
            fontFamily: "Montserrat, sans-serif",
            textTransform: "none",
          }}
        >
          View Details
        </Button>

        <Button
          size="small"
          variant="contained"
          sx={{
            backgroundColor: "#900639",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "999px",
            px: 3,
            "&:hover": {
              backgroundColor: "#600022",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
