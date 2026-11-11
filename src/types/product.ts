export interface Product {
  id: number;
  title: string;
  /** USD */
  price: number;
  description: string;
  category: string;
  image: string;
  /** Present on fetched products; locally created ones have none. */
  rating?: { rate: number; count: number };
}

export type NewProduct = Pick<Product, 'title' | 'price' | 'description' | 'category' | 'image'>;
