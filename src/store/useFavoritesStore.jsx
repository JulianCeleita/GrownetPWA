import {create} from "zustand";

export const useFavoritesStore = create((set) => ({
  favorites: [],

  addFavorite: (id) => {
    set((state) => ({ favorites: [...state.favorites, id] }));
  },

  removeFavorite: (id) => {
    set((state) => ({
      favorites: state.favorites.filter((favoriteId) => favoriteId !== id),
    }));
  },
}));
