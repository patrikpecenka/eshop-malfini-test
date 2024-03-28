import { create } from "zustand";
import { OrderDetails } from "../lib/props/types";
import { persist } from 'zustand/middleware';

interface OrderStore {
  OrderDetailData: OrderDetails[];
  createOrder: (user: OrderDetails) => void;
}

export const useOrderStore = create(
  persist<OrderStore>(
    (set) => ({
      OrderDetailData: [],
      createOrder: (user) =>
        set((state) => ({
          OrderDetailData:
            [
              ...state.OrderDetailData,
              user
            ],
        })),
    }),
    {
      name: "orderCartData/easyshop-malfini"
    }
  )
);