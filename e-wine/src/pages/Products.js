// src/pages/Products.js
import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import ProductCard from "../components/ProductCard";
import productMockImage from "../assets/productmock.svg";

const mockProducts = [
  {
    id: 1,
    title: "Cabernet Sauvignon",
    description:
      "A full-bodied red wine with bold flavors of blackcurrant, cedar, and subtle earthy tones. Aged in oak barrels to enhance depth and character, perfect with red meats or aged cheeses.",
    price: 28.5,
    image: productMockImage,
    category: "Red",
  },
  {
    id: 2,
    title: "Chardonnay Reserve",
    description:
      "Buttery and rich with layers of vanilla, tropical fruit, and a toasty oak finish. This elegant white wine is a classic for lovers of bold Chardonnay styles.",
    price: 27.0,
    image: productMockImage,
    category: "White",
  },
  {
    id: 3,
    title: "Rosé Provence",
    description:
      "A delicate, dry rosé from Southern France with notes of strawberry, rosewater, and citrus zest. Its refreshing finish makes it ideal for warm weather sipping.",
    price: 24.0,
    image: productMockImage,
    category: "Rosé",
  },
  {
    id: 4,
    title: "Champagne Brut Prestige",
    description:
      "Elegant sparkling wine with persistent fine bubbles. Delivers crisp apple, citrus, and brioche flavors. An excellent choice for celebrations and gourmet pairings.",
    price: 55.0,
    image: productMockImage,
    category: "Sparkling",
  },
  {
    id: 5,
    title: "Merlot Classic",
    description:
      "Soft and medium-bodied, this Merlot features plum, dark cherry, and cocoa with a hint of spice. A versatile wine that complements many dishes.",
    price: 26.0,
    image: productMockImage,
    category: "Red",
  },
  {
    id: 6,
    title: "Riesling Spätlese",
    description:
      "A semi-sweet Riesling with expressive aromas of honey, apricot, and elderflower. Balanced by bright acidity for a refreshing and food-friendly finish.",
    price: 21.5,
    image: productMockImage,
    category: "White",
  },
  {
    id: 7,
    title: "Pinot Noir Elegance",
    description:
      "Light-bodied and aromatic with cherry, cranberry, and earthy undertones. Delivers finesse and smooth tannins for a silky mouthfeel.",
    price: 30.0,
    image: productMockImage,
    category: "Red",
  },
  {
    id: 8,
    title: "Sauvignon Blanc",
    description:
      "Zesty and herbaceous with bright citrus, green apple, and flint. A vibrant white wine ideal for seafood and salads.",
    price: 22.5,
    image: productMockImage,
    category: "White",
  },
  {
    id: 9,
    title: "Grenache Rosé",
    description:
      "Bright pink rosé with red berry aromas, watermelon, and a touch of minerality. A summer essential with clean, crisp acidity.",
    price: 23.0,
    image: productMockImage,
    category: "Rosé",
  },
  {
    id: 10,
    title: "Prosecco DOCG",
    description:
      "Delicate Italian sparkling wine with pear, apple, and floral notes. Light-bodied and effervescent, perfect for aperitifs.",
    price: 18.0,
    image: productMockImage,
    category: "Sparkling",
  },
  {
    id: 11,
    title: "Shiraz Reserve",
    description:
      "Intense and spicy with dark berry fruit, black pepper, and hints of mocha. Aged to develop bold structure and complexity.",
    price: 29.5,
    image: productMockImage,
    category: "Red",
  },
  {
    id: 12,
    title: "Gewürztraminer",
    description:
      "Aromatic white wine with lychee, rose petal, and spice. Rich and slightly off-dry, ideal with Asian cuisine or cheese platters.",
    price: 25.0,
    image: productMockImage,
    category: "White",
  },
];

const ProductList = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
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

      <Box display="flex" justifyContent="center">
        <Grid container spacing={4} justifyContent="center">
          {mockProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ height: "100%" }}>
                <ProductCard product={product} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductList;
