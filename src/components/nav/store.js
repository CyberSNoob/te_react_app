import { create } from "zustand";

export const useDataStore = create((set) => ({
  term: "",
  data: null,
  setTerm: (term) => set({ term }),
  setData: (data) => set({ data }),
}));
