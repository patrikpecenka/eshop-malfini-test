export interface CartProps {
  image: string;
  title: string;
  price: number;
  totalPrice: number;
  amount: number;
  id: string;
}

export interface ConfirmDeleteModalProps {
  confirm: () => void;
}