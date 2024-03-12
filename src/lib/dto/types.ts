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

interface Country {
  [x: string]: any;
  name: string;
  iso3: string;
  iso2: string;
  states: {
    name: string;
    state_code: string;
  }[];
}

export interface CountriesDto {
  error: boolean;
  msg: string;
  data: Country[];
}