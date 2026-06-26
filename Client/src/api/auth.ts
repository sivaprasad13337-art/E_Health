import apiClient from "@/lib/api-client";
import { useAuthStore } from "@/zustand/auth";

interface SignUpPayload {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}

export const registerUser = async (formData: SignUpPayload) => {
  const payload = new FormData();
  payload.append("first_name", formData.first_name);
  payload.append("last_name", formData.last_name);
  payload.append("username", formData.username);
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
        username: data.user.username,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
        phone: data.user.phone,
        profile_img: data.user.profile_img,
        role: data.user.role,
        is_staff: data.user.is_staff,
        is_verified: data.user.is_verified,
        id: data.user.id,
      });
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// logout
export const logoutUser = async () => {
  try {
    const response = await apiClient.get("/users/auth/login-out/");
    // const data = response.data;

    if (response.status === 200) {
      const { logout } = useAuthStore.getState();

      logout();
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

type SetUserPayload = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  profile_img: File;
};

export const setUser = async (formData: SetUserPayload, id: number) => {
  const payload = new FormData();
  payload.append("first_name", formData.first_name);
  payload.append("last_name", formData.last_name);
  payload.append("username", formData.username);
  payload.append("email", formData.email);
  payload.append("phone", formData.phone);
  payload.append("profile_img", formData.profile_img);

  console.log("====================================");
  console.log("this is setuser Data", formData);
  console.log("====================================");
  try {
    const response = await apiClient.patch(
      `/users/auth/set-profile/${id}`,
      payload,
    );

    if (response.status === 200) {
      await who();
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const who = async () => {
  try {
    const response = await apiClient.get("/users/auth/me/");
    const data = response.data;

    console.log("====================================");
    console.log(response.data);
    console.log("====================================");
    if (response.status === 200) {
      const { setAuth, setUser } = useAuthStore.getState();

      setAuth(data.auth);

      setUser({
        isAdmin: data.user.is_staff,
        username: data.user.username,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
        phone: data.user.phone,
        profile_img: data.user.profile_img,
        role: data.user.role,
        is_staff: data.user.is_staff,
        is_verified: data.user.is_verified,
        id: data.user.id,
      });
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};
