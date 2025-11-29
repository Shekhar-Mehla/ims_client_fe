import axios from "axios";
import { toast } from "react-toastify";

const getAccessToken = () => {
  return localStorage.getItem("token");
};
const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const apiProcessor = async ({
  url,
  method,
  payload,
  isPrivate,
  isRefreshJWT,
}) => {
  console.log(payload, url, method);
  try {
    const headers = {};
    if (isPrivate) {
      const token = isRefreshJWT ? getRefreshToken() : getAccessToken();
      headers.authorization = `Bearer ${token}`;
    }
    const responsePending = axios({
      url,
      method,
      data: payload,
    });
    console.log(responsePending);
    toast.promise(responsePending, {
      pending: "Processing your request...",
    });
    const { data } = await responsePending;
    console.log("user registered", data);
    return data;
  } catch (error) {
    console.log("ERROR:", error.response?.data);
    console.log("STATUS:", error.response?.status);
    console.log("MESSAGE:", error.message);
  }
};
