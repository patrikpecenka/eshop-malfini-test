import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { CartItem } from "./cart.store";

export interface OrderDetails {
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
    paymentId: string;
    deliveryId: string;
  };
  cart: CartItem[];
}

interface OrderStore {
  orderDetailData: OrderDetails[];
  createOrder: (user: OrderDetails) => void;
}

export const useOrderStore = create(
  persist<OrderStore>(
    (set) => ({
      orderDetailData: [],
      createOrder: (user) =>
        set((state) => ({
          orderDetailData:
            [
              ...state.orderDetailData,
              user
            ],
        })),
    }),
    {
      name: "orderCartData/easyshop-malfini"
    }
  )
);