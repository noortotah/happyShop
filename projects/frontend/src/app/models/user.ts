import { CartItem } from './cartItem';

export interface User {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  emailVerified?: boolean;
  img?: string;
  cart?: {
    items: CartItem[]
  },
  wishlist?: {
    items: CartItem[]
  },
  orders?: CartItem[];
  token?: string,
  isAdmin?: boolean
}
