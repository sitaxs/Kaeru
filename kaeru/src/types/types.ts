export type PaymentType = "free" | "paid" | "donation";
export type EventCategory = "IT & Tech" | "Design" | "Education" | "Business" | "Sport" | "Music" | "Art" | "Charity" | "Other";

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  price?: number | null;
  paymentType: PaymentType;
  category: EventCategory;
  imageUrl: string[];
  tags: string[];
  add_tags?: string[];
  status: "active" | "pending" | "inactive";
  description?: string;
  
bannerUrl?: string;
  startsAt?: string;
  endsAt?: string; // ДОДАНО
  locationDetail?: string;
  speaker?: {
    name: string;
    role: string;
    avatarUrl: string;
    about: string;
  };
  seo?: EventMeta;
  reviews?: Review[];
}
export interface Review {
  id: string;
  authorName: string;
  authorInitial: string;
  date: string;
  rating: number;
  text?: string;
  mediaUrl?: string;
  adminReply?: {
    author: string;
    text: string;
    date: string;
  };
}

export interface EventMeta {
  title: string;
  description: string;
  ogImage: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  photoUser?: string;
}