import { FavoriteItem } from "components/Cart/FavoriteItem";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface FavoriteStore {
  favoriteItems: FavoriteItem[];
  createFavorite: (favoriteItem: FavoriteItem) => void;
  updateFavoriteItems: (newIndex: number, oldIndex: number) => void;
  removeFavoriteItem: (id: string) => void;
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
      removeFavoriteItem: (id) =>
        set((state) => ({
          favoriteItems: state.favoriteItems.filter((item) => item.id !== id),
        })),
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