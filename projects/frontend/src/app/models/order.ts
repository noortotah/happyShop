import { User } from './user';
import { Product } from './product';
export interface Order {
  _id?: string,
  items: [
    {
     product: Product[],
      selectedVariation: [{
        id: number
        type: string
        value: string
      }]
    }
  ],
  user: User
}
