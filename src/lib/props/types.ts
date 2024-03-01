export interface CartProps {
  image: string;
  title: string;
  price: number;
  totalPrice: number;
  amount: number;
  id: string;
}

export interface UserProps {
  id: string;
  userDetails: {
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
  }
  totalPrice: number;
  noVatPrice: number;
  deliveryOption: string;
  deliveryPrice: number;
  cart: CartProps[]
}

export interface PaymentItemProps {
  id: string;
  name: string;
  icon: string;
  fee: string;
}


export interface cartCheckoutProps {
  image: string;
  title: string;
  id: string;
  amount: number;
  totalPrice: number;
}

export interface ConfirmDeleteModalProps {
  confirm: () => void;
}