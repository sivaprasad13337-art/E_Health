// import type { DateValues } from "date-fns";

import type { Doctor, Patient } from "@/types/hospital";

export interface ServiceType {
  id: number;
  name: string;
  short_name: string;
  description: string;
  price: string;
  poster: string;
}

// {
//         "id": 7,
//         "name": "Echocardiogram",
//         "short_name": "Echo",
//         "description": "An echocardiogram (often called an echo) is an ultrasound test that uses high-frequency sound waves to create live, moving images of your heart.",
//         "price": "3500.00",
//         "poster": "image/upload/v1780397544/ajlpli9m4lu2fte9ggpq.webp"
//     },

export interface Step {
  title: string;
  path: string;
  id: number;
  component: React.ComponentType;
}

export interface StepperProps {
  steps: Step[];
  completed: string[];
  active: number;
}

type Services = {
  test: string;
  id: number;
};
export interface AppointmentPayload {
  reason: string;
  services: Services[];
  appointmentType: string;
  time: string;
  date: Date;
  symptoms: string[];
  doctor: number;
  patient: number | null;
  discount_code: string;
}

export type AppointmentErrorState = {
  service: boolean;
  time: boolean;
  date: boolean;
  reason: boolean;
  patient: boolean;
};

export interface CompsProps {
  error: AppointmentErrorState;
  setError: (args: AppointmentErrorState) => void;
  formData: AppointmentPayload;
  setFormData: (args: AppointmentPayload) => void;
}

// Payment Interfaces
export interface PaymentProps {
  navigateNext: () => void;
  orderData: OrderDataType;
}

type add_ons = {
  test: string;
  price: number;
};

type PriceDetails = {
  add_ons: add_ons[];
  doctor_consultation: string;
  total_amount: number;
  currency: string;
  discount_info: { code: string; discount: number; percentage: number };
};

type Tests = {
  id: number;
  test: string;
};

export interface Appointment {
  id: number;
  reason: string;
  appointment_type: string;
  appointment_code: string;
  symptoms: string[];
  patient: Patient;
  doctor: Doctor;
  tests: Tests[];
  status: string;
  date: string;
  time: string;
  created_at: string;
  updated_at: string;
}
export interface OrderDataType {
  order_id: string;
  Price_details: PriceDetails;
  appointment: Appointment;
}

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
}

// {
//     "order_id": "order_T1DEGDXSRGD4kX",
//     "Price_details": {
//         "add_ons": [
//             {
//                 "test": "Echocardiogram",
//                 "price": 2500.0
//             },
//             {
//                 "test": "Electrocardiogram",
//                 "price": 800.0
//             }
//         ],
//         "doctor_consultation": 1000.0,
//         "total_amount": 4300.0,
//         "currency": "INR",
// "discount_info": {"code": discount_code, "discount": discount.discount}
//     },
//     "appointment": {
//         "id": 10,
//         "reason": "Regular Check-Up, Post CABG.",
//         "appointment_type": "Clinic",
//         "symptoms": [
//             ""
//         ],
//         "patient": 1,
//         "doctor": {
//             "id": 1,
//             "user": {
//                 "id": 6,
//                 "first_name": "Thejaswi",
//                 "last_name": "N Marla",
//                 "username": "@Dr_Thejaswi",
//                 "profile_img": null,
//                 "email": "thejaswi@gmail.com",
//                 "phone": "+91 7667662174",
//                 "role": "DOCTOR",
//                 "is_staff": false
//             },
//             "education": [],
//             "experience": 18,
//             "location": "",
//             "languages": [],
//             "consultation_fee": "1000.00",
//             "availability": true,
//             "rating": "5.0",
//             "specialization": 1,
//             "department": 1
//         },
//         "tests": [
//             {
//                 "id": 7,
//                 "test": "Echocardiogram"
//             },
//             {
//                 "id": 8,
//                 "test": "Electrocardiogram"
//             }
//         ],
//         "status": "CONFIRMED",
//         "date": "2026-04-08",
//         "time": "11:00:00"
//     }
// }
