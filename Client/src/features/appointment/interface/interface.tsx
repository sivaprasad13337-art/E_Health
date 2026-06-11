// import type { DateValues } from "date-fns";

export interface ServiceType {
  id: number;
  name: string;
  price: string;
  img: string;
}

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

export interface FormData {
  reason: string;
  services: number[];
  appointmentType: string;
  time: string;
  date: Date;
  symptoms: string[];
}

export interface CompsProps {
  formData: FormData;
  setFormData: (args: FormData) => void;
}
