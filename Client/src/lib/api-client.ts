import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiClient.defaults.xsrfCookieName = "csrftoken";
apiClient.defaults.xsrfHeaderName = "X-CSRFToken";

export default apiClient;
