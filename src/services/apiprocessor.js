import axios from "axios";
import { toast } from "react-toastify";

const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};
const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

const setAccessToken = (token) => {
  sessionStorage.setItem("accessToken", token);
};

// Helper function to refresh access token
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const apiBaseUrl =
      import.meta.env.VITE_BASE_API_URL || "http://localhost:8001";
    const userApi = apiBaseUrl + "/api/v1/auth";

    const response = await axios({
      url: `${userApi}/renew-access-token`,
      method: "POST",
      headers: {
        authorization: `Bearer ${refreshToken}`,
      },
    });

    if (response.data?.status === "success" && response.data?.payload) {
      setAccessToken(response.data.payload);
      return response.data.payload;
    }
    return null;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
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
    // Check if it's a JWT expiration error and we can retry with refreshed token
    const isJwtExpired =
      error.response?.status === 401 ||
      error.response?.data?.message === "jwt expired" ||
      error.response?.data?.message?.toLowerCase().includes("jwt expired") ||
      error.response?.data?.message?.toLowerCase().includes("token expired");

    // Only attempt token refresh if:
    // 1. It's a JWT expired error
    // 2. We're using access token (not refresh token)
    // 3. It's a private endpoint
    // 4. We haven't already tried refreshing (avoid infinite loop)
    if (
      isJwtExpired &&
      isPrivate &&
      isAcessJWT &&
      !useRefresh &&
      !error._retried
    ) {
      console.log("Access token expired, attempting to refresh...");

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        console.log("Token refreshed successfully, retrying request...");

        // Retry the original request with new token
        try {
          const retryHeaders = { ...headers };
          retryHeaders.authorization = `Bearer ${newAccessToken}`;

          const retryResponse = await axios({
            url,
            method,
            data: payload,
            headers: retryHeaders,
          });

          return retryResponse.data;
        } catch (retryError) {
          // If retry also fails, return the error
          return {
            status: "error",
            message:
              retryError.response?.data?.message ||
              retryError.message ||
              "Request failed after token refresh",
            statusCode: retryError.response?.status || 500,
            data: retryError.response?.data,
          };
        }
      } else {
        // Token refresh failed - user needs to login again
        console.error("Token refresh failed, user needs to login");
        return {
          status: "error",
          message: "Session expired. Please log in again.",
          statusCode: 401,
          data: error.response?.data,
        };
      }
    }

    // Return a structured error response for other errors
    return {
      status: "error",
      message:
        error.response?.data?.message || error.message || "Request failed",
      statusCode: error.response?.status || 500,
      data: error.response?.data,
    };
  }
};
