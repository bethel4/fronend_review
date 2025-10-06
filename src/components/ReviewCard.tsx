import React from "react";
import type { Review } from "../types";
import { Link } from "react-router-dom"; // <-- import Link

interface Props {
  review: Review;
  onApprove?: () => void;
  onFavorite?: () => void;
  isPublic?: boolean; // if true, hide approve/favorite buttons
}

const ReviewCard: React.FC<Props> = ({ review, onApprove, onFavorite, isPublic }) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "25px 20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
    >
      {/* Property Icon */}
      <div
        style={{
          backgroundColor: review.approved ? "#0f766e" : "#0891b2",
          color: "white",
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          margin: "0 auto 10px",
          fontSize: "18px",
        }}
      >
        {review.propertyId ? review.propertyId.charAt(0).toUpperCase() : "?"}
      </div>

      {/* Property ID as a clickable link */}
      <h3 style={{ fontSize: "1rem", marginBottom: "10px", color: "#0f172a", textAlign: "center" }}>
        {isPublic ? (
          review.propertyId
        ) : (
          <Link
            to={`/property/${review.propertyId}`}
            style={{ textDecoration: "none", color: "#0f172a", fontWeight: 600 }}
          >
            {review.propertyId}
          </Link>
        )}
      </h3>

      {/* Review content */}
      <p
        style={{
          fontStyle: "italic",
          color: "#334155",
          fontSize: "0.9rem",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        {review.content}
      </p>

      {/* Rating */}
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>

      {/* Approve / Favorite buttons (hidden if public) */}
      {!isPublic && (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button onClick={onApprove} style={buttonStyle("#0f766e", "white")}>
            {review.approved ? "Unapprove" : "Approve"}
          </button>
          <button
            onClick={onFavorite}
            style={buttonStyle(
              review.favorite ? "#22c55e" : "#e2e8f0",
              review.favorite ? "white" : "#0f172a"
            )}
          >
            {review.favorite ? "★ Favorite" : "☆ Favorite"}
          </button>
        </div>
      )}
    </div>
  );
};

// Reusable button style
const buttonStyle = (bg: string, color: string): React.CSSProperties => ({
  backgroundColor: bg,
  color,
  border: "none",
  borderRadius: "8px",
  padding: "8px 14px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease",
});

export default ReviewCard;
