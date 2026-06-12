import apiClient from "@/lib/api-client";

export const registerUser = async (payload) => {
  try {
    const response = await apiClient.post("", payload);

    return response.data;
  } catch (err) {
    console.error(err);
  }
};
