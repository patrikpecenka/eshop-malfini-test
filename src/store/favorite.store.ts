import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface FavoriteItem {
  image: string;
  title: string;
  price: number;
  totalPrice: number;
  amount: number;
  id: string;
}

interface FavoriteStore {
  favoriteItems: FavoriteItem[];
  createFavorite: (favoriteItem: FavoriteItem) => void;
  updateItems: (newIndex: number, oldIndex: number) => void;
}

export const useFavoriteStore = create(
  persist<FavoriteStore>(
    (set) => ({
      favoriteItems: [],
      createFavorite: (favoriteItem) =>
        set((state) => {
          const foundItem = state.favoriteItems.find((item) => item.id === favoriteItem.id);

          if (foundItem) {
            return state;
          } else {
            return {
              favoriteItems: [...state.favoriteItems, favoriteItem],
            };
          }
        }),
      updateItems: (oldIndex, newIndex) => {
        set((state) => {
          const items = [...state.favoriteItems]; // Create a copy of the array
          const itemToMove = items[oldIndex];
          items.splice(oldIndex, 1); // Remove the item from the original array
          items.splice(newIndex, 0, itemToMove); // Insert the item at the new index
          return { favoriteItems: items };
        });
      },
    }),
    {
      name: "favoriteData/easyshop-malfini"
    }
  )
);