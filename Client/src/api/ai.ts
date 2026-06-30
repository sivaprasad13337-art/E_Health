import apiClient from "@/lib/api-client";

export const parseLabReport = async (file: string) => {
  const payload = new FormData();
  payload.append("pdf", file);
  try {
    const response = await apiClient.post(
      `/appointment/medical-report/parse/`,
      payload,
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
