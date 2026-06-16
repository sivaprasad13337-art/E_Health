import apiClient from "@/lib/api-client";

export const getDoctors = async () => {
  const response = await apiClient.get("/hospital/doctor/get/");

  return response.data;
};
