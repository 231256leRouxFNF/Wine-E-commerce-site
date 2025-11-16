import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./AddReview.css";

const AddReview = ({ open, onClose, productId, onReviewAdded }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [heading, setHeading] = useState("");
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState([]);
  const [pairings, setPairings] = useState("");
  const [tastingNotes, setTastingNotes] = useState({
    color: "",
    nose: "",
    mouthfeel: "",
    aciditySugar: "",
    flavors: "",
    tannins: "",
    finish: "",
  });
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photos.length > 2) {
      alert("You can only upload up to 2 photos");
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to leave a review");
      return;
    }

    if (rating === 0) {
      alert("Please provide a rating");
      return;
    }

    if (!heading.trim() || !comment.trim()) {
      alert("Please provide a heading and comment");
      return;
    }

    setLoading(true);

    try {
      const reviewData = {
        productId,
        userId: user._id,
        userName: `${user.name} ${user.surname}`,
        rating,
        heading,
        comment,
        photos,
        pairings,
        tastingNotes,
      };

      await axios.post("/api/reviews", reviewData);
      
      // Reset form
      setRating(0);
      setHeading("");
      setComment("");
      setPhotos([]);
      setPairings("");
      setTastingNotes({
        color: "",
        nose: "",
        mouthfeel: "",
        aciditySugar: "",
        flavors: "",
        tannins: "",
        finish: "",
      });

      onReviewAdded();
      onClose();
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="add-review-title">
        Add Your Review
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box className="add-review-form">
          <Box mb={2}>
            <Typography variant="subtitle2" gutterBottom>
              Rating *
            </Typography>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              size="large"
            />
          </Box>

          <TextField
            label="Heading *"
            fullWidth
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            inputProps={{ maxLength: 100 }}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Your Review *"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            inputProps={{ maxLength: 1000 }}
            sx={{ mb: 2 }}
          />

          <Box mb={2}>
            <Typography variant="subtitle2" gutterBottom>
              Photos (Optional - Max 2)
            </Typography>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
              id="photo-upload"
            />
            <label htmlFor="photo-upload">
              <Button
                variant="outlined"
                component="span"
                disabled={photos.length >= 2}
              >
                Upload Photos
              </Button>
            </label>
            {photos.length > 0 && (
              <Box className="review-photo-preview">
                {photos.map((photo, index) => (
                  <Box key={index} className="photo-preview-item">
                    <img src={photo} alt={`Preview ${index + 1}`} />
                    <IconButton
                      onClick={() => removePhoto(index)}
                      className="remove-photo-btn"
                      size="small"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">
                Add Tasting Notes (Optional)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="tasting-notes-form">
                <TextField
                  label="Color"
                  fullWidth
                  size="small"
                  value={tastingNotes.color}
                  onChange={(e) =>
                    setTastingNotes({ ...tastingNotes, color: e.target.value })
                  }
                  placeholder="e.g., Deep ruby red"
                  inputProps={{ maxLength: 100 }}
                  sx={{ mb: 1.5 }}
                />
                <TextField
                  label="Nose/Aroma"
                  fullWidth
                  size="small"
                  value={tastingNotes.nose}
                  onChange={(e) =>
                    setTastingNotes({ ...tastingNotes, nose: e.target.value })
                  }
                  placeholder="e.g., Cherry, vanilla, oak"
                  inputProps={{ maxLength: 150 }}
                  sx={{ mb: 1.5 }}
                />
                <TextField
                  label="Mouthfeel"
                  fullWidth
                  size="small"
                  value={tastingNotes.mouthfeel}
                  onChange={(e) =>
                    setTastingNotes({
                      ...tastingNotes,
                      mouthfeel: e.target.value,
                    })
                  }
                  placeholder="e.g., Smooth, velvety"
                  inputProps={{ maxLength: 150 }}
                  sx={{ mb: 1.5 }}
                />
                <TextField
                  label="Acidity/Sugar Balance"
                  fullWidth
                  size="small"
                  value={tastingNotes.aciditySugar}
                  onChange={(e) =>
                    setTastingNotes({
                      ...tastingNotes,
                      aciditySugar: e.target.value,
                    })
                  }
                  placeholder="e.g., Well-balanced"
                  inputProps={{ maxLength: 100 }}
                  sx={{ mb: 1.5 }}
                />
                <TextField
                  label="Main Flavors"
                  fullWidth
                  size="small"
                  value={tastingNotes.flavors}
                  onChange={(e) =>
                    setTastingNotes({
                      ...tastingNotes,
                      flavors: e.target.value,
                    })
                  }
                  placeholder="e.g., Blackberry, plum, spice"
                  inputProps={{ maxLength: 200 }}
                  sx={{ mb: 1.5 }}
                />
                <TextField
                  label="Tannins"
                  fullWidth
                  size="small"
                  value={tastingNotes.tannins}
                  onChange={(e) =>
                    setTastingNotes({
                      ...tastingNotes,
                      tannins: e.target.value,
                    })
                  }
                  placeholder="e.g., Soft, well-integrated"
                  inputProps={{ maxLength: 100 }}
                  sx={{ mb: 1.5 }}
                />
                <TextField
                  label="Finish"
                  fullWidth
                  size="small"
                  value={tastingNotes.finish}
                  onChange={(e) =>
                    setTastingNotes({ ...tastingNotes, finish: e.target.value })
                  }
                  placeholder="e.g., Long and lingering"
                  inputProps={{ maxLength: 150 }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mt: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">
                Recommended Pairings (Optional)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="Food Pairings"
                fullWidth
                multiline
                rows={2}
                value={pairings}
                onChange={(e) => setPairings(e.target.value)}
                placeholder="e.g., Grilled steak, aged cheeses, dark chocolate"
                inputProps={{ maxLength: 300 }}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "#900639",
            "&:hover": { backgroundColor: "#600022" },
          }}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReview;
