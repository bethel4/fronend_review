import React, { useEffect, useState } from "react";
import type { Review } from "../types";
import { fetchReviews, updateReview } from "../services/api";
import ReviewCard from "./ReviewCard";

const Dashboard: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterApproved, setFilterApproved] = useState<boolean | null>(null);

  useEffect(() => {
    fetchReviews().then(setReviews);
  }, []);

 const toggleApprove = async (id: string) => {
  const review = reviews.find(r => r.id === id);
  if (!review) return;

  const updated = await updateReview(id, { approved: !review.approved });
  setReviews(prev => prev.map(r => (r.id === id ? updated : r)));
};

const toggleFavorite = async (id: string) => {
  const review = reviews.find(r => r.id === id);
  if (!review) return;

  const updated = await updateReview(id, { favorite: !review.favorite });
  setReviews(prev => prev.map(r => (r.id === id ? updated : r)));
};


  const filtered = reviews.filter(r =>
    filterApproved === null ? true : r.approved === filterApproved
  );

  return (
    <div style={{ textAlign: "center", width: "100%", maxWidth: "1100px", margin: "0 auto" }}>
      <h2 style={{ color: "#0f766e", marginBottom: "25px", fontWeight: 700, fontSize: "1.5rem" }}>
        Reviews Dashboard
      </h2>

      <div style={{ marginBottom: "30px" }}>
        {["All", "Approved", "Pending"].map((label, i) => (
          <button
            key={label}
            style={{
              backgroundColor:
                filterApproved === (i === 0 ? null : i === 1)
                  ? "#115e59"
                  : "#0f766e",
              color: "white",
              border: "none",
              padding: "10px 18px",
              margin: "0 8px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 500,
              transition: "all 0.3s ease",
            }}
            onClick={() =>
              setFilterApproved(i === 0 ? null : i === 1 ? true : false)
            }
          >
            {label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px",
        }}
      >
        {filtered.map(r => (
          <ReviewCard
            key={r.id}
            review={r}
            onApprove={() => toggleApprove(r.id)}
            onFavorite={() => toggleFavorite(r.id)}
            isPublic={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
