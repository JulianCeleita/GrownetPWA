import { create } from "zustand";

const useRecordStore = create((set) => ({
  pendingOrders: [],
  closedOrders: [],
  selectedClosedOrder: null,
  selectedPendingOrder: null,
  detailsToShow: {},
  setPendingOrders: (pendingOrders) => set({ pendingOrders: pendingOrders }),
  setClosedOrders: (closedOrders) => set({ closedOrders: closedOrders }),
  setSelectedPendingOrder: (selectedPendingOrder) => set({ selectedPendingOrder: selectedPendingOrder }),
  setSelectedClosedOrder: (selectedClosedOrder) => set({ selectedClosedOrder: selectedClosedOrder }),
  setDetailsToShow: (detailsToShow) => set({ detailsToShow: detailsToShow })
}));

export default useRecordStore;