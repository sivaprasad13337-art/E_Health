import type { User } from "@/types/users";

type Specialization = {
  id: number;
  name: string;
  description: string;
};

type Department = {
  id: number;
  name: string;
};
export interface Doctor {
  id: number;
  user: User;
  specialization: Specialization;
  department: Department;
  education: string[];
  experience: number;
  location: string;
  languages: string[];
  consultation_fee: string;
  availability: boolean;
  rating: string;
}

export interface Patient {
  id: number;
  user: User
  age: number;
  height: number;
  weight: number;
  blood_group: string;
}
