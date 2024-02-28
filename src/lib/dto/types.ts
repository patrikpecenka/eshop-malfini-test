export interface ProductDto {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  rating: {
    rate: number;
  };
}