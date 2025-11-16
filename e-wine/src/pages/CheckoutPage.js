import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Card,
  CardContent,
  Divider,
  TextField,
} from "@mui/material";
import "./CheckoutPage.css";
import SuccessToast from "../components/SuccessToast";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const CheckoutPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const { cartItems, clearCart, updateCartCount } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [profileData, setProfileData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("new");
  const [selectedPayment, setSelectedPayment] = useState("new");

  const [newAddress, setNewAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",
    postalCode: "",
    country: "South Africa",
  });

  const [newPayment, setNewPayment] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  });

  const [saveAddress, setSaveAddress] = useState(false);
  const [savePayment, setSavePayment] = useState(false);
  const [addressNickname, setAddressNickname] = useState("");
  const [paymentNickname, setPaymentNickname] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const fetchProfileData = React.useCallback(async () => {
    if (!user) return;
    try {
      const res = await axios.get(`/api/user-profile/${user._id}`);
      setProfileData(res.data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchProfileData();
    }
  }, [user, fetchProfileData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Save new address if requested
      if (saveAddress && selectedAddress === "new" && user) {
        await axios.post(`/api/user-profile/${user._id}/addresses`, {
          nickname: addressNickname || "Address",
          ...newAddress,
        });
      }

      // Save new payment method if requested
      if (savePayment && selectedPayment === "new" && user) {
        await axios.post(`/api/user-profile/${user._id}/payment-methods`, {
          nickname: paymentNickname || "Card",
          cardNumber: newPayment.cardNumber,
          cardholderName: newPayment.cardholderName,
          expiryDate: newPayment.expiryDate,
        });
      }

      setTimeout(() => {
        setIsProcessing(false);
        setShowToast(true);
        clearCart();
        updateCartCount(0);

        setTimeout(() => {
          setShowToast(false);
          navigate("/");
        }, 3000);
      }, 1500);
    } catch (err) {
      console.error("Failed to save data:", err);
      setIsProcessing(false);
      alert("Failed to process checkout. Please try again.");
    }
  };

  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return "";
    const last4 = cardNumber.slice(-4);
    return `**** **** **** ${last4}`;
  };

  return (
    <>
      <div className="checkoutContainer">
        <div className="checkoutCard checkoutCardWide">
          <h2 className="checkoutTitle">Complete Your Order</h2>

          {/* Cart Summary */}
          <Box className="cart-summary" mb={3}>
            <Typography variant="h6" mb={2} className="section-title">
              Order Summary
            </Typography>
            <Box className="cart-items-list">
              {cartItems.map((item) => (
                <Box key={item._id} className="cart-summary-item">
                  <Typography variant="body2">
                    {item.title} x {item.quantity}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    R{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box className="cart-summary-total">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="#900639">
                R{total.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          <form className="checkoutForm" onSubmit={handleSubmit}>
            {/* Shipping Address Section */}
            <Box mb={3}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" className="section-title">
                  Shipping Address
                </FormLabel>
                <RadioGroup
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                >
                  {profileData?.shippingAddresses?.map((address) => (
                    <Card key={address._id} className="address-card">
                      <CardContent>
                        <FormControlLabel
                          value={address._id}
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="subtitle1" fontWeight={600}>
                                {address.nickname}
                              </Typography>
                              <Typography variant="body2">
                                {address.addressLine1}
                                {address.addressLine2 && `, ${address.addressLine2}`}
                              </Typography>
                              <Typography variant="body2">
                                {address.city}, {address.province} {address.postalCode}
                              </Typography>
                            </Box>
                          }
                        />
                      </CardContent>
                    </Card>
                  ))}

                  <Card className="address-card">
                    <CardContent>
                      <FormControlLabel
                        value="new"
                        control={<Radio />}
                        label="Use a new address"
                      />
                      {selectedAddress === "new" && (
                        <Box mt={2} className="new-address-form">
                          <TextField
                            label="Address Line 1"
                            fullWidth
                            size="small"
                            value={newAddress.addressLine1}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                addressLine1: e.target.value,
                              })
                            }
                            required
                            sx={{ mb: 1.5 }}
                          />
                          <TextField
                            label="Address Line 2"
                            fullWidth
                            size="small"
                            value={newAddress.addressLine2}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                addressLine2: e.target.value,
                              })
                            }
                            sx={{ mb: 1.5 }}
                          />
                          <Box display="flex" gap={1.5} mb={1.5}>
                            <TextField
                              label="City"
                              fullWidth
                              size="small"
                              value={newAddress.city}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  city: e.target.value,
                                })
                              }
                              required
                            />
                            <TextField
                              label="Province"
                              fullWidth
                              size="small"
                              value={newAddress.province}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  province: e.target.value,
                                })
                              }
                              required
                            />
                          </Box>
                          <TextField
                            label="Postal Code"
                            fullWidth
                            size="small"
                            value={newAddress.postalCode}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                postalCode: e.target.value,
                              })
                            }
                            required
                            sx={{ mb: 1.5 }}
                          />
                          {user && (
                            <Box>
                              <FormControlLabel
                                control={
                                  <input
                                    type="checkbox"
                                    checked={saveAddress}
                                    onChange={(e) =>
                                      setSaveAddress(e.target.checked)
                                    }
                                  />
                                }
                                label="Save this address for future orders"
                              />
                              {saveAddress && (
                                <TextField
                                  label="Nickname for this address"
                                  fullWidth
                                  size="small"
                                  value={addressNickname}
                                  onChange={(e) =>
                                    setAddressNickname(e.target.value)
                                  }
                                  placeholder="e.g., Home, Work"
                                  sx={{ mt: 1 }}
                                />
                              )}
                            </Box>
                          )}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </RadioGroup>
              </FormControl>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Payment Method Section */}
            <Box mb={3}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" className="section-title">
                  Payment Method
                </FormLabel>
                <RadioGroup
                  value={selectedPayment}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                >
                  {profileData?.paymentMethods?.map((payment) => (
                    <Card key={payment._id} className="payment-card">
                      <CardContent>
                        <FormControlLabel
                          value={payment._id}
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="subtitle1" fontWeight={600}>
                                {payment.nickname}
                              </Typography>
                              <Typography variant="body2">
                                {maskCardNumber(payment.cardNumber)}
                              </Typography>
                              <Typography variant="body2">
                                {payment.cardholderName}
                              </Typography>
                              <Typography variant="body2">
                                Expires: {payment.expiryDate}
                              </Typography>
                            </Box>
                          }
                        />
                      </CardContent>
                    </Card>
                  ))}

                  <Card className="payment-card">
                    <CardContent>
                      <FormControlLabel
                        value="new"
                        control={<Radio />}
                        label="Use a new card"
                      />
                      {selectedPayment === "new" && (
                        <Box mt={2} className="new-payment-form">
                          <TextField
                            label="Cardholder Name"
                            fullWidth
                            size="small"
                            value={newPayment.cardholderName}
                            onChange={(e) =>
                              setNewPayment({
                                ...newPayment,
                                cardholderName: e.target.value,
                              })
                            }
                            required
                            sx={{ mb: 1.5 }}
                          />
                          <TextField
                            label="Card Number"
                            fullWidth
                            size="small"
                            value={newPayment.cardNumber}
                            onChange={(e) =>
                              setNewPayment({
                                ...newPayment,
                                cardNumber: e.target.value,
                              })
                            }
                            placeholder="1234 5678 9012 3456"
                            required
                            sx={{ mb: 1.5 }}
                          />
                          <Box display="flex" gap={1.5} mb={1.5}>
                            <TextField
                              label="Expiry Date"
                              fullWidth
                              size="small"
                              value={newPayment.expiryDate}
                              onChange={(e) =>
                                setNewPayment({
                                  ...newPayment,
                                  expiryDate: e.target.value,
                                })
                              }
                              placeholder="MM/YY"
                              required
                            />
                            <TextField
                              label="CVV"
                              fullWidth
                              size="small"
                              value={newPayment.cvv}
                              onChange={(e) =>
                                setNewPayment({
                                  ...newPayment,
                                  cvv: e.target.value,
                                })
                              }
                              placeholder="123"
                              required
                            />
                          </Box>
                          {user && (
                            <Box>
                              <FormControlLabel
                                control={
                                  <input
                                    type="checkbox"
                                    checked={savePayment}
                                    onChange={(e) =>
                                      setSavePayment(e.target.checked)
                                    }
                                  />
                                }
                                label="Save this card for future purchases"
                              />
                              {savePayment && (
                                <TextField
                                  label="Nickname for this card"
                                  fullWidth
                                  size="small"
                                  value={paymentNickname}
                                  onChange={(e) =>
                                    setPaymentNickname(e.target.value)
                                  }
                                  placeholder="e.g., Personal Card, Business Card"
                                  sx={{ mt: 1 }}
                                />
                              )}
                            </Box>
                          )}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </RadioGroup>
              </FormControl>
            </Box>

            <button type="submit" disabled={isProcessing} className="checkout-button">
              {isProcessing ? "Processing..." : `Pay R${total.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>

      {showToast && (
        <SuccessToast
          message="Payment successful! Your wine is on its way. Cheers!"
          onClose={() => {
            setShowToast(false);
            navigate("/");
          }}
        />
      )}
    </>
  );
};

export default CheckoutPage;
