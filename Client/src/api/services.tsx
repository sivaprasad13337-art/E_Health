import apiClient from "@/lib/api-client";

export const getAllTests = async () => {
  try {
    const response = await apiClient.get("/hospital/test/get");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
