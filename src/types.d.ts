
export interface Review {
  id: string;
  propertyId: string;
  reviewType: string;
  channel: string;
  rating: number;
  date: string;
  content: string;
  approved: boolean;
  favorite?: boolean;
}
