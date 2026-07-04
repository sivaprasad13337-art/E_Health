import type {
  AppointmentPayload,
} from "@/features/appointment/interface/interface";
import type { BillingDetail } from "@/types/payment";
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

interface AppointmentState {
  Appointment: AppointmentPayload | null;
  setAppointment: (orderData: AppointmentPayload | null) => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  Appointment: null,

  setAppointment: (appointmentData: AppointmentPayload | null) =>
    set({
      Appointment: appointmentData,
    }),
}));
