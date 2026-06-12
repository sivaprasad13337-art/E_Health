import apiClient from "@/lib/api-client";
import { useAuthStore } from "@/zustand/auth";

interface SignUpPayload {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}

export const registerUser = async (formData: SignUpPayload) => {
  const payload = new FormData();
  payload.append("first_name", formData.firstName);
  payload.append("last_name", formData.lastName);
  payload.append("username", formData.userName);
  payload.append("email", formData.email);
  payload.append("phone", formData.phone);
  payload.append("role", formData.role);
  payload.append("password", formData.password);

  try {
    const response = await apiClient.post("/users/auth/create/", payload);

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const loginUser = async (payload: object) => {
  try {
    const response = await apiClient.post("/users/auth/login/", payload);
    const data = response.data;

    if (response.status === 200) {
      const { setAuth, setUser } = useAuthStore.getState();

      setAuth(data.auth);

      setUser({
        isAdmin: data.user.is_staff,
        userName: data.user.username,
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        profileImage: data.user.profile_img,
        id: data.user.id,
      });
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const setUser = async (payload: object, id: number) => {
  try {
    const response = await apiClient.patch(
      `/users/auth/set-profile/${id}`,
      payload,
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const who = async () => {
  try {
    const response = await apiClient.get("/users/auth/me/");
    const data = response.data;

    if (response.status === 200) {
      const { setAuth, setUser } = useAuthStore.getState();

      setAuth(data.auth);

      setUser({
        isAdmin: data.user.is_staff,
        userName: data.user.username,
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        profileImage: data.user.profile_img,
        id: data.user.id,
      });
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};
