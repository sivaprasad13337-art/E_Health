import type { Doctor } from "@/types/hospital";
import { create } from "zustand";

interface useHospitalState {
  patient: Doctor | null;
  doctor: Doctor | null;

  setPatient: (patientData: Doctor | null) => void;

  setDoctor: (doctordata: Doctor | null) => void;
}

export const useHospitalStore = create<useHospitalState>((set) => ({
  patient: null,
  doctor: null,

  setPatient: (patientData: Doctor | null) =>
    set({
      patient: patientData,
    }),

  setDoctor: (doctordata: Doctor | null) =>
    set({
      doctor: doctordata,
    }),
}));
