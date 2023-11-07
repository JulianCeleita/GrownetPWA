import { create } from "zustand";

const useOrderStore = create((set) => ({
  restaurants: [],
  selectedRestaurant: null,
  //TODO AGREGAR SUPPLIERS DE LA BD CUANDO SE INTEGRE A RESTAURANTS
  suppliers: [],
  selectedSupplier: null,
  articlesToPay: [],
  totalNet: 0,
  totalTaxes: 0,
  totalToPay: 0,
  uomToPay: null,
  idUomToPay: null,
  deliveryData: null,
  specialRequirements: "",
  orderNumber: null,
  setRestaurants: (restaurants) => set({ restaurants: restaurants }),
  setSelectedRestaurant: (restaurant) =>
    set({ selectedRestaurant: restaurant }),
  setSuppliers: (suppliers) => set({ suppliers: suppliers }),
  setSelectedSupplier: (supplier) => set({ selectedSupplier: supplier }),
  setArticlesToPay: (articles) => set({ articlesToPay: articles }),
  setTotalNet: (newNet) => set({ totalNet: newNet }),
  setTotalTaxes: (newTaxes) => set({ totalTaxes: newTaxes }),
  setTotalToPay: (newTotal) => set({ totalToPay: newTotal }),
  setDeliveryData: (deliveryData) => set({ deliveryData: deliveryData }),
  setSpecialRequirements: (specialRequirements) =>
    set({ specialRequirements: specialRequirements }),
  setOrderNumber: (orderNumber) => set({ orderNumber: orderNumber }),
}));

export default useOrderStore;
