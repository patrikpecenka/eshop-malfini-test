import { CartProps } from "components/Cart/CartItem";

export interface OrderCart {
  id: string;
  userDetails: {
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    stateProvince: string | null;
    country: string | null;
    zipCode: string;
  }
  totalPrice: number;
  noVatPrice: number;
  deliveryOption: string;
  deliveryPrice: number;
  cart: CartProps[]
}
