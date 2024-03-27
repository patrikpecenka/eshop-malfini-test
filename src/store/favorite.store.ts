import { FavoriteItem } from "components/Cart/FavoriteItem";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface FavoriteStore {
  favoriteItems: FavoriteItem[];
  history: FavoriteItem[];
  createFavorite: (favoriteItem: FavoriteItem) => void;
  // updateFavoriteItems: (newIndex: number, oldIndex: number) => void;
  deleteAndSaveToHistory: (id: string) => void;
  restoreFromHistory: (id: string) => void;
  permanentlyDelete: (id: string) => void;
  clearHistory: () => void;
}

export const useFavoriteStore = create(
  persist<FavoriteStore>(
    (set) => ({
      favoriteItems: [],
      history: [],
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
      deleteAndSaveToHistory: (id) =>
        set((state) => {
          const filteredItem = state.favoriteItems.filter((item) => item.id !== id);
          const removedItem = state.favoriteItems.find((item) => item.id === id);
          if (removedItem) {
            return {
              favoriteItems: filteredItem,
              history: [removedItem, ...state.history]
            };
          }
          return state;
        }),
      restoreFromHistory: (id) =>
        set((state) => {
          const filteredItem = state.history.filter((item) => item.id === id);
          return {
            favoriteItems: [...state.favoriteItems, ...filteredItem],
            history: state.history.filter((item) => item.id !== id)
          };
        }),

      permanentlyDelete: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id)
        })),

      clearHistory: () =>
        set({
          history: []
        }),

      //   updateFavoriteItems: (oldIndex, newIndex) => {
      //     set((state) => {
      //       const items = [...state.favoriteItems];
      //       const itemToMove = items[oldIndex];
      //       items.splice(oldIndex, 1);
      //       items.splice(newIndex, 0, itemToMove);
      //       return { favoriteItems: items };
      //     });
      //   },
    }),
    {
      name: "favoriteData/easyshop-malfini"
    }
  )
);