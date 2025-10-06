import axios from 'axios';
import type { Review } from '../types';

const BASE_URL = "https://backend-blush-alpha-59.vercel.app/api/reviews"; // replace with your Vercel deployment URL



// Fetch all reviews from backend
export const fetchReviews = async (): Promise<Review[]> => {
  const res = await axios.get<Review[]>(`${BASE_URL}/hostaway`);
  return res.data;
};

// Update a single review (approve/favorite)
export const updateReview = async (id: string, data: Partial<Review>): Promise<Review> => {
  const res = await axios.patch<Review>(`${BASE_URL}/${id}`, data);
  return res.data;
};
