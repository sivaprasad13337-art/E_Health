import { create } from "zustand";

interface UserData {
  isAdmin: boolean;
  userName: string;
  firstName: string;
  lastName: string;
  profileImage: URL;
  id: number;
}

interface AuthState {
  auth: boolean;
  user: UserData | null;

  setAuth: (auth: boolean) => void;
  setUser: (user: UserData | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  auth: false,

  user: null,

  setAuth: (value: boolean) =>
    set({
      auth: value,
    }),

  setUser: (userData: UserData | null) =>
    set({
      user: userData,
    }),

  logout: () =>
    set({
      auth: false,
      user: null,
    }),
}));
