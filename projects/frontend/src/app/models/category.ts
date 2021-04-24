import { Category as Category1 } from './category';
export interface Category {
  id?: string;
  _id?: string;
  title: string;
  img?: string;
  subCategories?: Category1[];
}
