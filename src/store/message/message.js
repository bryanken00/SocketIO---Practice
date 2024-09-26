import { create } from "zustand";

export const useStoreMessage = create((set) => ({
  message: [],
  setMessage: (message) => set({ message }),
}));
