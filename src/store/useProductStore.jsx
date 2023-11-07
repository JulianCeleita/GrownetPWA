import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [],
  filteredProducts: [],
  setFilteredProducts: (results) => set({ filteredProducts: results }),
}));

export default useProductStore;