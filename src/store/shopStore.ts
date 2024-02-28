import { create } from "zustand"
import { CartProps } from "../lib/props/types";
import { persist } from 'zustand/middleware';
import { notifications } from "@mantine/notifications";

interface CartStore {
  cart: CartProps[];
  addItem: (item: CartProps) => void;
  deleteItem: (id: string) => void;
  increaseAmount: (id: string) => void;
  decreaseAmount: (id: string) => void;
  totalPrice: () => number;
  clearCart: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cart: [],
      addItem: (item) => {
        set((state) => ({
          cart: state.cart.find((cartItem) => cartItem.id === item.id)
            ? state.cart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, amount: cartItem.amount + 1 }
                : cartItem
            )
            : [...state.cart, item],
        })),
          notifications.show({
            title: "Success",
            message: "Item added successfully.",
            color: "green",
            autoClose: 2000
          })
      },
      deleteItem: (id: string) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      clearCart: () =>
        set({
          cart: []
        }),
      increaseAmount: (id: string) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id
            ? { ...item, amount: item.amount + 1 }
            : item
        )
      })),
      decreaseAmount: (id: string) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id
            ? { ...item, amount: item.amount === 0 ? 0 : item.amount - 1 }
            : item
        )
      })),
      totalPrice: () =>
        get().cart.reduce((acc, item) => acc + item.price * item.amount, 0)
    }),



    {
      name: "cart-items/easyshop-malfini",

    }
  )
)
