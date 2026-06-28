import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiClient.defaults.xsrfCookieName = "csrftoken";
// apiClient.defaults.xsrfHeaderName = "X-CSRFToken";
// apiClient.interceptors.request.use((config) => {
//   const token = document.cookie
//     .split("; ")
//     .find((c) => c.startsWith("csrftoken="))
//     ?.split("=")[1];

//   if (token) {
//     config.headers["X-CSRFToken"] = token;
//   }

//   return config;
// });

apiClient.interceptors.request.use((config) => {
  const token = document.cookie.match(/csrftoken=([^;]+)/)?.[1];

  if (token) {
    config.headers.set("X-CSRFToken", token);
  }

  return config;
});

export default apiClient;
