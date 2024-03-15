import { CartProps } from "components/Cart/CartItem";

export interface OrderCart {
  id: string;
  orderId: number;
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
  },
  paymentDetails: {
    subtotalPrice: number;
    totalPrice: number;
    noVatPrice: number;
    vatPrice: number;
    discount: number;
    dateOfOrder: string;
    paymentMethod: string;
    paymentPrice: number;
    deliveryMethod: string;
    deliveryPrice: number;
  }
  cart: CartProps[]
}
