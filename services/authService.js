// client/src/services/authService.js
import api from "../lib/api";

export async function signup({ name, email, password }) {
  const { data } = await api.post("/auth/signup", { name, email, password });
  return data;
}


export async function login({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}


export async function googleLogin(idToken) {
  const { data } = await api.post("/auth/google", { idToken });
  return data;
}
