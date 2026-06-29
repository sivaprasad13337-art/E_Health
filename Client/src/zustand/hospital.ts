import type { Doctor, Patient } from "@/types/hospital";
import { create } from "zustand";

interface useHospitalState {
  patient: Patient | null;
  doctor: Doctor | null;

  setPatient: (patientData: Patient | null) => void;

  setDoctor: (doctordata: Doctor | null) => void;
}

export const useHospitalStore = create<useHospitalState>((set) => ({
  patient: null,
  doctor: null,

  setPatient: (patientData: Patient | null) =>
    set({
      patient: patientData,
    }),

  setDoctor: (doctordata: Doctor | null) =>
    set({
      doctor: doctordata,
    }),
}));
