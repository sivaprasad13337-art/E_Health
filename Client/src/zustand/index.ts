import { create } from "zustand";

interface useFlareStoreState {
  loading: boolean;
  setLoading: (arg: boolean) => void;
}

export const useFlareStore = create<useFlareStoreState>((set) => ({
  loading: false,

  setLoading: (loading: boolean) =>
    set({
      loading: loading,
    }),
}));
