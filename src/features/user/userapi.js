import { apiProcessor } from "../../services/apiprocessor.js";

const apiBaseUrl = import.meta.env.VITE_BASE_API_URL;

export const userApi = apiBaseUrl + "/api/v1/auth";

export const registerUser = async (userData) => {
  console.log(userData);
  const url = `${userApi}/register`;
  const method = "POST";
  const payload = userData;

  return await apiProcessor({ url, method, payload });
};

export const loginUser = async (userData) => {
  console.log(userData);
  const url = `${userApi}/login`;
  const method = "POST";
  const payload = userData;
  return await apiProcessor({ url, method, payload });
};

export const verifyEmail = async (token) => {
  console.log(token);
  const url = `${userApi}/verify-email?token=${token}`;
  const method = "GET";
  return await apiProcessor({ url, method });
};

export const getUserProfile = async () => {
  const url = `${userApi}/profile`;
  const method = "GET";
  return await apiProcessor({ url, method, isPrivate: true });
};

export const logoutUser = async () => {
  const url = `${userApi}/logout`;
  const method = "POST";
  return await apiProcessor({ url, method, isPrivate: true });
};

export const changePassword = async (passwordData) => {
  const url = `${userApi}/change-password`;
  const method = "POST";
  const payload = passwordData;
  return await apiProcessor({ url, method, payload, isPrivate: true });
};

export const fetchNewAccessTokenApi = async () => {
  const url = `${userApi}/renwew-access-token`;
  const method = "POST";
  return await apiProcessor({ url, method, isPrivate: true });
};
