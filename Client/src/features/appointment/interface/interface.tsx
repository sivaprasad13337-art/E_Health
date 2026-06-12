// import type { DateValues } from "date-fns";

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

export interface AppointmentPayload {
  reason: string;
  services: number[];
  appointmentType: string;
  time: string;
  date: Date;
  symptoms: string[];
  doctor: number;
  patient: number | null;
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
