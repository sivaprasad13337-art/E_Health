import type { BillingDetail } from "@/features/appointment/interface/interface";
import { create } from "zustand";



interface OrderState {
  Order: BillingDetail | null;
  setOrder: (orderData: BillingDetail | null) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  Order: null,

  setOrder: (orderData: BillingDetail | null) =>
    set({
      Order: orderData,
    }),
}));
