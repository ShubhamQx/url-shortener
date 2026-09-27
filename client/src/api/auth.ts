import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";

interface User {
  id: string;
  fullName: string;
  email: string;
}

const loginUser = (email: string, password: string) => {
  return api.post<ApiResponse<User>>("/auth/login", { email, password });
};

const registerUser = (email: string, password: string, fullName: string) => {
  return api.post<ApiResponse<User>>("/auth/register", {
    email,
    password,
    fullName,
  });
};

const getMe = () => {
  return api.get<ApiResponse<User>>("/auth/me");
};

const logoutUser = () => {
  return api.post("/auth/logout");
};

export { loginUser, registerUser, logoutUser, getMe };
