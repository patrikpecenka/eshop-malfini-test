import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { notifications } from "@mantine/notifications";
import { CartItem } from "components/Cart/CartItem";

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
      createItem: (item) => {
        set((state) => {
          const foundItem = state.cart.find((cartItem) => cartItem.id === item.id);

          if (foundItem) {
            return {
              cart: state.cart.map((cartItem) => {
                if (cartItem.id === item.id) {
                  return {
                    ...cartItem,
                    amount: cartItem.amount + item.amount,
                    price: item.price,
                    totalPrice: (cartItem.amount + item.amount) * item.price
                  };
                } else {
                  return cartItem;
                }
              })
            };
          } else {
            return {
              cart: [...state.cart, {
                ...item,
                totalPrice: item.amount * item.price
              }]
            };
          }
        }),
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


