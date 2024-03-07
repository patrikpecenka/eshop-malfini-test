export interface ProductDto {
  id: string;
  category: string;
  title: string;
  image: string;
  price: number;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CountriesDto {
  userCountryCode: string;
  countries: [
    {
      value: string;
      label: string;
    }
  ];
}