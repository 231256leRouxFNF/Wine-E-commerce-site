// src/components/CheckoutForm.js
import React from "react";
import {
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { CreditCard, LocalShipping, Person } from "@mui/icons-material";
import "./CheckoutForm.css";

const validationSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  address: yup.string().required("Required"),
  city: yup.string().required("Required"),
  country: yup.string().required("Required"),
  cardNumber: yup
    .string()
    .required("Required")
    .matches(/^\d{16}$/, "Must be 16 digits"),
  expDate: yup
    .string()
    .required("Required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY format"),
  cvc: yup
    .string()
    .required("Required")
    .matches(/^\d{3}$/, "Must be 3 digits"),
});

const CheckoutForm = ({ cartItems, total }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      country: "",
      saveInfo: false,
      cardNumber: "",
      expDate: "",
      cvc: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Submitting:", values);
      alert("Order placed successfully!");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="checkoutForm">
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box className="sectionBox">
            <Typography variant="h5" className="sectionHeading">
              <LocalShipping className="sectionIcon" /> Shipping Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.saveInfo}
                      onChange={formik.handleChange}
                      name="saveInfo"
                    />
                  }
                  label="Save shipping information for next time"
                />
              </Grid>
            </Grid>
          </Box>

          <Box className="sectionBox">
            <Typography variant="h5" className="sectionHeading">
              <CreditCard className="sectionIcon" /> Payment Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  value={formik.values.cardNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cardNumber &&
                    Boolean(formik.errors.cardNumber)
                  }
                  helperText={
                    formik.touched.cardNumber && formik.errors.cardNumber
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiration Date (MM/YY)"
                  name="expDate"
                  placeholder="12/24"
                  value={formik.values.expDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.expDate && Boolean(formik.errors.expDate)
                  }
                  helperText={formik.touched.expDate && formik.errors.expDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CVC"
                  name="cvc"
                  placeholder="123"
                  value={formik.values.cvc}
                  onChange={formik.handleChange}
                  error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                  helperText={formik.touched.cvc && formik.errors.cvc}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card className="orderSummaryCard">
            <CardContent>
              <Typography variant="h5" className="sectionHeading">
                <Person className="sectionIcon" /> Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />

              {cartItems.map((item) => (
                <Box key={item.id} className="summaryItem">
                  <Typography variant="body1">
                    {item.title} x{item.quantity}
                  </Typography>
                  <Typography variant="body1">
                    £{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box className="summaryItem">
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">£{total.toFixed(2)}</Typography>
              </Box>
              <Box className="summaryItem">
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1">£0.00</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box className="summaryItem">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  £{total.toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                className="placeOrderBtn"
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

export default CheckoutForm;
