import apiClient from "@/lib/api-client";
import { useHospitalStore } from "@/zustand/hospital";

export const getPatient = async (id: number) => {
  try {
    const response = await apiClient.get(`/hospital/patient/get/${id}`);

    if (response.status === 200) {
      const { setPatient } = useHospitalStore.getState();

      setPatient(response.data);
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getDoctors = async () => {
  try {
    const response = await apiClient.get("/hospital/doctor/get/");

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getDoctor = async (id: number) => {
  try {
    const response = await apiClient.get(`/hospital/doctor/get/${id}`);

    if (response.status === 200) {
      const { setDoctor } = useHospitalStore.getState();

      setDoctor(response.data);
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateDoctorAvailability = async (id: number) => {
  try {
    const response = await apiClient.patch(
      `/hospital/doctor/update-availability/${id}`,
      {},
      // {
      //   headers: {
      //     "X-CSRFToken": document.cookie
      //       .split("; ")
      //       .find((c) => c.startsWith("csrftoken="))
      //       ?.split("=")[1],
      //   },
      // },
    );

    if (response.status === 200) {
      const { setDoctor } = useHospitalStore.getState();

      setDoctor(response.data);
    }
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
