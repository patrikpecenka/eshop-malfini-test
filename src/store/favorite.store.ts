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
  updateFavoriteItems: (newIndex: number, oldIndex: number) => void;
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
      updateFavoriteItems: (oldIndex, newIndex) => {
        set((state) => {
          const items = [...state.favoriteItems];
          const itemToMove = items[oldIndex];
          items.splice(oldIndex, 1);
          items.splice(newIndex, 0, itemToMove);
          return { favoriteItems: items };
        });
      },
    }),
    {
      name: "favoriteData/easyshop-malfini"
    }
  )
);