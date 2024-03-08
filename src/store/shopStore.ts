import { create } from "zustand"
import { OrderCart } from "../lib/props/types";
import { persist } from 'zustand/middleware';
import { notifications } from "@mantine/notifications";
import { CartProps } from "components/Cart/CartItem";

interface CartStore {
  cart: CartProps[];
  addItem: (item: CartProps) => void;
  deleteItem: (id: string) => void;
  increaseByInput: (id: string, value: number) => void;
  increaseAmount: (id: string) => void;
  decreaseAmount: (id: string) => void;
  totalPriceCalculation: () => number;
  clearCart: () => void;
  getSumCartItems: () => number;
}

interface UserStore {
  userData: OrderCart[];
  createUser: (user: OrderCart) => void;
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
                ? {
                  ...cartItem,
                  amount: cartItem.amount + item.amount,
                  price: item.price,
                  totalPrice: (cartItem.amount + item.amount) * item.price
                }
                : cartItem
            )
            : [...state.cart, {
              ...item,
              totalPrice: item.amount * item.price
            }],
        })),
          notifications.show({
            title: "Success",
            message: "Item added successfully.",
            color: "green",
            autoClose: 1000
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
      increaseByInput: (id: string, value: number) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id
            ? {
              ...item,
              amount: value,
              totalPrice: value * item.price
            }
            : item
        )
      })),

      increaseAmount: (id: string) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id
            ? {
              ...item,
              amount: item.amount + 1,
              totalPrice: item.totalPrice + item.price
            }
            : item
        )
      })),
      decreaseAmount: (id: string) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id
            ? {
              ...item,
              amount: item.amount === 0 ? 0 : item.amount - 1,
              totalPrice: item.amount === 0 ? 0 : item.totalPrice - item.price
            }
            : item
        )
      })),
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

export const useOrderCart = create(
  persist<UserStore>(
    (set) => ({
      userData: [],
      createUser: (user) =>
        set((state) => ({
          userData:
            [...state.userData,
              user
            ],
        })),
    }),
    {
      name: "orderCartData/easyshop-malfini"
    }
  )
)
