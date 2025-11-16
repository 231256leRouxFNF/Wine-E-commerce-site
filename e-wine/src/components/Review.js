import React from "react";
import { Box, Typography, Rating, Avatar } from "@mui/material";
import "./Review.css";

const Review = ({ review }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const hasTastingNotes =
    review.tastingNotes &&
    Object.values(review.tastingNotes).some((note) => note);

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-user-info">
          <Avatar sx={{ bgcolor: "#900639", width: 40, height: 40 }}>
            {review.userName.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <Typography variant="subtitle1" className="review-user-name">
              {review.userName}
            </Typography>
            <Typography variant="caption" className="review-date">
              {formatDate(review.createdAt)}
            </Typography>
          </div>
        </div>
        <Rating value={review.rating} readOnly size="small" />
      </div>

      <Typography variant="h6" className="review-heading">
        {review.heading}
      </Typography>

      <Typography variant="body2" className="review-comment">
        {review.comment}
      </Typography>

      {review.photos && review.photos.length > 0 && (
        <div className="review-photos">
          {review.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Review ${index + 1}`}
              className="review-photo"
            />
          ))}
        </div>
      )}

      {hasTastingNotes && (
        <div className="tasting-notes">
          <Typography variant="subtitle2" className="tasting-notes-title">
            Tasting Notes
          </Typography>
          <div className="tasting-notes-grid">
            {review.tastingNotes.color && (
              <div className="tasting-note-item">
                <strong>Color:</strong> {review.tastingNotes.color}
              </div>
            )}
            {review.tastingNotes.nose && (
              <div className="tasting-note-item">
                <strong>Nose/Aroma:</strong> {review.tastingNotes.nose}
              </div>
            )}
            {review.tastingNotes.mouthfeel && (
              <div className="tasting-note-item">
                <strong>Mouthfeel:</strong> {review.tastingNotes.mouthfeel}
              </div>
            )}
            {review.tastingNotes.aciditySugar && (
              <div className="tasting-note-item">
                <strong>Acidity/Sugar:</strong>{" "}
                {review.tastingNotes.aciditySugar}
              </div>
            )}
            {review.tastingNotes.flavors && (
              <div className="tasting-note-item">
                <strong>Flavors:</strong> {review.tastingNotes.flavors}
              </div>
            )}
            {review.tastingNotes.tannins && (
              <div className="tasting-note-item">
                <strong>Tannins:</strong> {review.tastingNotes.tannins}
              </div>
            )}
            {review.tastingNotes.finish && (
              <div className="tasting-note-item">
                <strong>Finish:</strong> {review.tastingNotes.finish}
              </div>
            )}
          </div>
        </div>
      )}

      {review.pairings && (
        <div className="review-pairings">
          <Typography variant="subtitle2" className="pairings-title">
            Recommended Pairings
          </Typography>
          <Typography variant="body2">{review.pairings}</Typography>
        </div>
      )}
    </div>
  );
};

export default Review;
