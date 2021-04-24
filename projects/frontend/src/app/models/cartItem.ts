import { Product } from './product';
export interface CartItem {
  _id? : string;
  productId? :  string;
  product: Product;
  selectedVariation: {id: number, type: string,  value: string}[];
}
