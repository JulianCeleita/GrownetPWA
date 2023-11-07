import { create } from "zustand";

const useTokenStore = create((set) => ({
  countryCode: localStorage.getItem("countryCode") || null,
  token: localStorage.getItem("token") || '',
  setToken: (newToken) => {
    set({ token: newToken });
    localStorage.setItem("token", newToken);
  },
  setCountryCode: (newCountryCode) => {
    set({ countryCode: newCountryCode });
    localStorage.setItem("countryCode", newCountryCode);
  },
}));

export default useTokenStore;
