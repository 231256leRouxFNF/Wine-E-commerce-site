import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import ProductCard from "../components/ProductCard";
import productMockImage from "../assets/productmock.svg";

const mockProducts = [
  {
    id: 1,
    title: "Cabernet Sauvignon",
    description: "Full-bodied red wine with rich blackberry and oak notes.",
    price: 28.5,
    image: productMockImage,
    category: "Red",
  },
  {
    id: 2,
    title: "Chardonnay",
    description: "Smooth white wine with hints of vanilla and butter.",
    price: 22.0,
    image: productMockImage,
    category: "White",
  },
  {
    id: 3,
    title: "Rosé Provence",
    description: "Dry and delicate rosé with floral and strawberry notes.",
    price: 24.0,
    image: productMockImage,
    category: "Rosé",
  },
  {
    id: 4,
    title: "Champagne Brut",
    description: "Sparkling wine with crisp apple and brioche tones.",
    price: 45.0,
    image: productMockImage,
    category: "Sparkling",
  },
  {
    id: 5,
    title: "Merlot",
    description: "Medium-bodied red wine with notes of plum and chocolate.",
    price: 26.0,
    image: productMockImage,
    category: "Red",
  },
  {
    id: 6,
    title: "Riesling",
    description: "Sweet white wine with honey, apricot, and floral notes.",
    price: 20.5,
    image: productMockImage,
    category: "White",
  },
];

const ProductList = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6, backgroundColor: "#f9f9f9" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 6,
          textAlign: "center",
          fontWeight: 700,
          color: "#1c1c1c",
        }}
      >
        Our Wine Collection
      </Typography>

      <Grid container spacing={4}>
        {mockProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Box sx={{ height: "100%" }}>
              <ProductCard product={product} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
