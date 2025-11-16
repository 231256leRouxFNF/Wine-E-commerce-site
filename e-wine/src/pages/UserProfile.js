import React, { useState, useContext } from "react";
import {
  Container,
  Box,
  Typography,
  Tab,
  Tabs,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Review from "../components/Review";
import "./UserProfile.css";

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const [addressForm, setAddressForm] = useState({
    nickname: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",
    postalCode: "",
    country: "South Africa",
  });

  const [paymentForm, setPaymentForm] = useState({
    nickname: "",
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cardType: "",
  });

  const fetchProfileData = React.useCallback(async () => {
    if (!user) return;
    try {
      const res = await axios.get(`/api/user-profile/${user._id}`);
      setProfileData(res.data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  }, [user]);

  const fetchUserReviews = React.useCallback(async () => {
    if (!user) return;
    try {
      const res = await axios.get(`/api/reviews/user/${user._id}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  }, [user]);

  React.useEffect(() => {
    if (user) {
      fetchProfileData();
      fetchUserReviews();
    }
  }, [user, fetchProfileData, fetchUserReviews]);

  const handleAddAddress = async () => {
    try {
      await axios.post(`/api/user-profile/${user._id}/addresses`, addressForm);
      fetchProfileData();
      setShowAddressDialog(false);
      resetAddressForm();
    } catch (err) {
      console.error("Failed to add address:", err);
      alert("Failed to add address");
    }
  };

  const handleUpdateAddress = async () => {
    try {
      await axios.put(
        `/api/user-profile/${user._id}/addresses/${editingAddress}`,
        addressForm
      );
      fetchProfileData();
      setShowAddressDialog(false);
      setEditingAddress(null);
      resetAddressForm();
    } catch (err) {
      console.error("Failed to update address:", err);
      alert("Failed to update address");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await axios.delete(
          `/api/user-profile/${user._id}/addresses/${addressId}`
        );
        fetchProfileData();
      } catch (err) {
        console.error("Failed to delete address:", err);
        alert("Failed to delete address");
      }
    }
  };

  const handleAddPayment = async () => {
    try {
      await axios.post(
        `/api/user-profile/${user._id}/payment-methods`,
        paymentForm
      );
      fetchProfileData();
      setShowPaymentDialog(false);
      resetPaymentForm();
    } catch (err) {
      console.error("Failed to add payment method:", err);
      alert("Failed to add payment method");
    }
  };

  const handleUpdatePayment = async () => {
    try {
      await axios.put(
        `/api/user-profile/${user._id}/payment-methods/${editingPayment}`,
        paymentForm
      );
      fetchProfileData();
      setShowPaymentDialog(false);
      setEditingPayment(null);
      resetPaymentForm();
    } catch (err) {
      console.error("Failed to update payment method:", err);
      alert("Failed to update payment method");
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (window.confirm("Are you sure you want to delete this payment method?")) {
      try {
        await axios.delete(
          `/api/user-profile/${user._id}/payment-methods/${paymentId}`
        );
        fetchProfileData();
      } catch (err) {
        console.error("Failed to delete payment method:", err);
        alert("Failed to delete payment method");
      }
    }
  };

  const openEditAddress = (address) => {
    setAddressForm(address);
    setEditingAddress(address._id);
    setShowAddressDialog(true);
  };

  const openEditPayment = (payment) => {
    setPaymentForm(payment);
    setEditingPayment(payment._id);
    setShowPaymentDialog(true);
  };

  const resetAddressForm = () => {
    setAddressForm({
      nickname: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      province: "",
      postalCode: "",
      country: "South Africa",
    });
  };

  const resetPaymentForm = () => {
    setPaymentForm({
      nickname: "",
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cardType: "",
    });
  };

  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return "";
    const last4 = cardNumber.slice(-4);
    return `**** **** **** ${last4}`;
  };

  if (!user) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Please log in to view your profile.</Typography>
      </Container>
    );
  }

  return (
    <div className="user-profile-page">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box className="profile-header">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#900639",
              fontSize: "2rem",
              fontWeight: 600,
            }}
          >
            {user.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h4" className="profile-name">
              {user.name} {user.surname}
            </Typography>
            <Typography variant="body1" className="profile-email">
              {user.email}
            </Typography>
          </Box>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
        >
          <Tab label="Shipping Addresses" className="profile-tab" />
          <Tab label="Payment Methods" className="profile-tab" />
          <Tab label="My Reviews" className="profile-tab" />
          <Tab label="Settings" className="profile-tab" />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            <Box className="section-header">
              <Typography variant="h6">Shipping Addresses</Typography>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() => {
                  resetAddressForm();
                  setEditingAddress(null);
                  setShowAddressDialog(true);
                }}
                sx={{
                  backgroundColor: "#900639",
                  "&:hover": { backgroundColor: "#600022" },
                }}
              >
                Add Address
              </Button>
            </Box>

            <div className="cards-grid">
              {profileData?.shippingAddresses?.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No addresses saved yet.
                </Typography>
              ) : (
                profileData?.shippingAddresses?.map((address) => (
                  <Card key={address._id} className="info-card">
                    <CardContent>
                      <Box className="card-header">
                        <Typography variant="h6" className="card-nickname">
                          {address.nickname}
                        </Typography>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => openEditAddress(address)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteAddress(address._id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body2">
                        {address.addressLine1}
                      </Typography>
                      {address.addressLine2 && (
                        <Typography variant="body2">
                          {address.addressLine2}
                        </Typography>
                      )}
                      <Typography variant="body2">
                        {address.city}, {address.province} {address.postalCode}
                      </Typography>
                      <Typography variant="body2">{address.country}</Typography>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Box className="section-header">
              <Typography variant="h6">Payment Methods</Typography>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() => {
                  resetPaymentForm();
                  setEditingPayment(null);
                  setShowPaymentDialog(true);
                }}
                sx={{
                  backgroundColor: "#900639",
                  "&:hover": { backgroundColor: "#600022" },
                }}
              >
                Add Payment Method
              </Button>
            </Box>

            <div className="cards-grid">
              {profileData?.paymentMethods?.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No payment methods saved yet.
                </Typography>
              ) : (
                profileData?.paymentMethods?.map((payment) => (
                  <Card key={payment._id} className="info-card">
                    <CardContent>
                      <Box className="card-header">
                        <Typography variant="h6" className="card-nickname">
                          {payment.nickname}
                        </Typography>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => openEditPayment(payment)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeletePayment(payment._id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body2">
                        {maskCardNumber(payment.cardNumber)}
                      </Typography>
                      <Typography variant="body2">
                        {payment.cardholderName}
                      </Typography>
                      <Typography variant="body2">
                        Expires: {payment.expiryDate}
                      </Typography>
                      {payment.cardType && (
                        <Typography variant="body2" className="card-type">
                          {payment.cardType}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" mb={2}>
              My Reviews
            </Typography>
            {reviews.length === 0 ? (
              <Typography variant="body1" color="text.secondary">
                You haven't written any reviews yet.
              </Typography>
            ) : (
              reviews.map((review) => <Review key={review._id} review={review} />)
            )}
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <Typography variant="h6" mb={2}>
              Account Settings
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={logout}
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                borderRadius: "999px",
                px: 3,
                py: 1,
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Container>

      {/* Address Dialog */}
      <Dialog
        open={showAddressDialog}
        onClose={() => {
          setShowAddressDialog(false);
          setEditingAddress(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingAddress ? "Edit Address" : "Add New Address"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Nickname"
              fullWidth
              value={addressForm.nickname}
              onChange={(e) =>
                setAddressForm({ ...addressForm, nickname: e.target.value })
              }
              placeholder="e.g., Home, Work"
            />
            <TextField
              label="Address Line 1"
              fullWidth
              value={addressForm.addressLine1}
              onChange={(e) =>
                setAddressForm({ ...addressForm, addressLine1: e.target.value })
              }
            />
            <TextField
              label="Address Line 2"
              fullWidth
              value={addressForm.addressLine2}
              onChange={(e) =>
                setAddressForm({ ...addressForm, addressLine2: e.target.value })
              }
            />
            <TextField
              label="City"
              fullWidth
              value={addressForm.city}
              onChange={(e) =>
                setAddressForm({ ...addressForm, city: e.target.value })
              }
            />
            <TextField
              label="Province"
              fullWidth
              value={addressForm.province}
              onChange={(e) =>
                setAddressForm({ ...addressForm, province: e.target.value })
              }
            />
            <TextField
              label="Postal Code"
              fullWidth
              value={addressForm.postalCode}
              onChange={(e) =>
                setAddressForm({ ...addressForm, postalCode: e.target.value })
              }
            />
            <TextField
              label="Country"
              fullWidth
              value={addressForm.country}
              onChange={(e) =>
                setAddressForm({ ...addressForm, country: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAddressDialog(false);
              setEditingAddress(null);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
            sx={{
              backgroundColor: "#900639",
              "&:hover": { backgroundColor: "#600022" },
            }}
          >
            {editingAddress ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog
        open={showPaymentDialog}
        onClose={() => {
          setShowPaymentDialog(false);
          setEditingPayment(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingPayment ? "Edit Payment Method" : "Add New Payment Method"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Nickname"
              fullWidth
              value={paymentForm.nickname}
              onChange={(e) =>
                setPaymentForm({ ...paymentForm, nickname: e.target.value })
              }
              placeholder="e.g., Personal Card, Business Card"
            />
            <TextField
              label="Card Number"
              fullWidth
              value={paymentForm.cardNumber}
              onChange={(e) =>
                setPaymentForm({ ...paymentForm, cardNumber: e.target.value })
              }
              placeholder="1234 5678 9012 3456"
            />
            <TextField
              label="Cardholder Name"
              fullWidth
              value={paymentForm.cardholderName}
              onChange={(e) =>
                setPaymentForm({
                  ...paymentForm,
                  cardholderName: e.target.value,
                })
              }
            />
            <TextField
              label="Expiry Date"
              fullWidth
              value={paymentForm.expiryDate}
              onChange={(e) =>
                setPaymentForm({ ...paymentForm, expiryDate: e.target.value })
              }
              placeholder="MM/YY"
            />
            <TextField
              label="Card Type"
              fullWidth
              value={paymentForm.cardType}
              onChange={(e) =>
                setPaymentForm({ ...paymentForm, cardType: e.target.value })
              }
              placeholder="e.g., Visa, Mastercard"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowPaymentDialog(false);
              setEditingPayment(null);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={editingPayment ? handleUpdatePayment : handleAddPayment}
            sx={{
              backgroundColor: "#900639",
              "&:hover": { backgroundColor: "#600022" },
            }}
          >
            {editingPayment ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfile;
