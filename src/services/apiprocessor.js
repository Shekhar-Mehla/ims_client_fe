import axios from "axios";
import { toast } from "react-toastify";

const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};
const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const apiProcessor = async ({
  url,
  method,
  payload,
  isPrivate,
  isAcessJWT = true,
}) => {
  console.log(payload, url, method);
  try {
    const headers = {};
    if (isPrivate) {
      const token = isAcessJWT ? getAccessToken() : getRefreshToken();
      headers.authorization = `Bearer ${token}`;
    }
    const responsePending = axios({
      url,
      method,
      data: payload,
      headers,
    });
    console.log(responsePending);
    toast.promise(responsePending, {
      pending: "Processing your request...",
    });
    const { data } = await responsePending;

    return data;
  } catch (error) {
    console.log("ERROR:", error.response?.data);
    console.log("STATUS:", error.response?.status);
    console.log("MESSAGE:", error?.message);

    // Return a structured error response
    return {
      status: "error",
      message:
        error.response?.data?.message || error.message || "Request failed",
      statusCode: error.response?.status || 500,
      data: error.response?.data,
    };
  }
};
