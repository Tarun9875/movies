import api from "../../services/axios";

export const loginAPI = (data: {
  email: string;
  password: string;
}) => api.post("/auth/login", data);

export const registerAPI = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/auth/register", data);
