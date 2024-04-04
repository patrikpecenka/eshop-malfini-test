import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { notifications } from "@mantine/notifications";

export interface CartItem {
  image: string;
  title: string;
  price: number;
  totalPrice: number;
  amount: number;
  id: string;
}

interface CartStore {
  cart: CartItem[];
  createItem: (item: CartItem) => void;
  deleteItem: (id: string) => void;
  updateItemQuantity: (id: string, updater: (prev: number) => number) => void;
  totalPriceCalculation: () => number;
  clearCart: () => void;
  getSumCartItems: () => number;
  getItemAmount: (id: string) => number;
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      cart: [],
      createItem: (newItem) => {
        set((state) => {
          const foundItem = state.cart.find((foundItem) => foundItem.id === newItem.id);

          if (foundItem) {
            return {
              cart: state.cart.map((existingItem) => {
                if (existingItem.id === newItem.id) {
                  return {
                    ...existingItem,
                    amount: existingItem.amount + newItem.amount,
                    price: newItem.price,
                    totalPrice: (existingItem.amount + newItem.amount) * newItem.price
                  };
                } else {
                  return existingItem;
                }
              })
            };
          } else {
            return {
              cart: [...state.cart, {
                ...newItem,
                totalPrice: newItem.amount * newItem.price
              }]
            };
          }
        });

        notifications.show({
          title: "Success",
          message: "Item added successfully.",
          color: "green",
          autoClose: 1000
        });
      },
      updateItemQuantity: (id, updater) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id
            ? {
              ...item,
              amount: updater(item.amount),
              totalPrice: updater(item.amount) * item.price
            }
            : item
        )
      })),
      deleteItem: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      clearCart: () =>
        set({
          cart: []
        }),

      getItemAmount: (id) => get().cart.find((item) => item.id === id)?.amount || 0,

      totalPriceCalculation: () =>
        get().cart.reduce((acc, item) => acc + item.totalPrice, 0),

      getSumCartItems: () =>
        get().cart.reduce((acc, item) => acc + item.amount, 0),
    }),
    {
      name: "cart-items/easyshop-malfini",
    }
  )
)


