import type { Appointment } from "@/features/appointment/interface/interface";

export interface BillingDetail {
  appointment: Appointment;
  particular: string;
  total_amount: string;
  add_ons: [
    {
      test: string;
      price: number;
    },
  ];
  discount: string;
  discount_code: string;
  discount_percentage: string;
  amount_paid: string;
  transaction_status: string;
  created_at: string;
  updated_at: string;
}
