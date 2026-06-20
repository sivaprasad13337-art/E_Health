import apiClient from "@/lib/api-client";

export const getDoctors = async () => {
  const response = await apiClient.get("/hospital/doctor/get/");

  return response.data;
};

export const getDoctor = async (id: number) => {
  const response = await apiClient.get(`/hospital/doctor/get/${id}`);

  return response.data;
};