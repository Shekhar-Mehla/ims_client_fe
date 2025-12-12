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
  useRefresh = false,
}) => {
  try {
    const headers = {};
    if (isPrivate) {
      const token =
        isAcessJWT && !useRefresh ? getAccessToken() : getRefreshToken();
      headers.authorization = `Bearer ${token}`;
    }
    console.log("api proccess is called");

    const responsePending = axios({
      url,
      method,
      data: payload,
      headers,
    });

    toast.promise(responsePending, {
      pending: "Processing your request...",
    });
    const { data } = await responsePending;

    return data;
  } catch (error) {
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
