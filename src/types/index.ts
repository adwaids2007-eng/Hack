export type UserRole = 'customer' | 'maker';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bio?: string;
  profile_image?: string;
  college?: string;
  verified: boolean;
  skills?: string[];
  created_at?: string;
}

export interface Product {
  id: string;
  maker_id: string;
  maker_name?: string;
  maker_rating?: number;
  maker_verified?: boolean;
  maker_image?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  available_quantity: number;
  customization_available: boolean;
  created_at?: string;
}

export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  customer_id: string;
  customer_name?: string;
  maker_id: string;
  maker_name?: string;
  product_id: string;
  product_name?: string;
  product_image?: string;
  product_price?: number;
  quantity: number;
  message?: string;
  status: OrderStatus;
  created_at: string;
  reviewed?: boolean;
}

export interface Message {
  id: string;
  sender_id: string;
  sender_name?: string;
  receiver_id: string;
  receiver_name?: string;
  message: string;
  created_at: string;
}

export interface Review {
  id: string;
  order_id: string;
  customer_id: string;
  customer_name?: string;
  customer_image?: string;
  maker_id: string;
  rating: number; // 1 to 5
  comment: string;
  created_at: string;
}

export interface CampusRequest {
  id: string;
  customer_id: string;
  customer_name?: string;
  customer_image?: string;
  description: string;
  budget: number;
  category: string;
  deadline: string;
  status: 'OPEN' | 'FULFILLED' | 'CLOSED';
  created_at: string;
  proposals_count?: number;
}

export interface Proposal {
  id: string;
  request_id: string;
  maker_id: string;
  maker_name?: string;
  maker_image?: string;
  maker_verified?: boolean;
  maker_rating?: number;
  price: number;
  message: string;
  estimated_completion: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  created_at: string;
}

export interface AISearchIntent {
  rawQuery: string;
  purpose?: string;
  type?: string;
  maxBudget?: number;
  style?: string;
  category?: string;
  customizationRequired?: boolean;
}
