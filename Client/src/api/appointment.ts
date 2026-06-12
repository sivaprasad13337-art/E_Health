import type { AppointmentPayload } from "@/features/appointment/interface/interface";
import apiClient from "@/lib/api-client";
import { formatDateForDjango } from "@/lib/utils";

export const createAppointment = async (formData: AppointmentPayload) => {
  const payload = {
    reason: formData.reason,
    appointment_type: formData.appointmentType,
    symptoms: formData.symptoms,
    patient_id: formData.patient,
    doctor_id: formData.doctor,
    tests: formData.services,
    date: formatDateForDjango(formData.date),
    time: formData.time,
    status: "hsgsj",
  };

  try {
    const response = await apiClient.post("/appointment/create/", payload);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
