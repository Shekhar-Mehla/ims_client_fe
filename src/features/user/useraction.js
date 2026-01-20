import {
  loginUser,
  getUserProfile,
  logoutUser,
  changePassword,
  updateUserProfile,
  googleLoginUser,
} from "./userapi.js";
import { setLoading, setUser } from "./userslice.js";

export const googleLoginAction = (userData) => {
  return async (dispatch) => {
    const userInfo = await googleLoginUser(userData);
    const { status, payload } = userInfo;

    if (status === "success") {
      const { accessToken, refreshToken } = payload;

      if (accessToken && refreshToken) {
        sessionStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        try {
          const profileResponse = await getUserProfile();

          if (profileResponse.status === "success") {
            dispatch(setUser(profileResponse.payload));
            return { success: true };
          } else {
            dispatch(setUser({ email: userData.email, isLoggedIn: true }));
            return { success: true };
          }
        } catch {
          dispatch(setUser({ email: userData.email, isLoggedIn: true }));
          return { success: true };
        }
      } else {
        throw new Error("Tokens not received from server");
      }
    } else {
      throw new Error(payload || "Google login failed");
    }
  };
};

export const loginAction = (userData) => {
  return async (dispatch) => {
    const userInfo = await loginUser(userData);
    const { status, payload } = userInfo;

    if (status === "success") {
      // Store tokens in session and local storage
      const { accessToken, refreshToken } = payload;

      if (accessToken && refreshToken) {
        // Store access token in session storage (short-lived)
        sessionStorage.setItem("accessToken", accessToken);

        // Store refresh token in local storage (long-lived)
        localStorage.setItem("refreshToken", refreshToken);

        // Fetch user profile after successful token storage
        try {
          const profileResponse = await getUserProfile();

          if (profileResponse.status === "success") {
            dispatch(setUser(profileResponse.payload));

            return { success: true };
          } else {
            // Still return success since login worked
            dispatch(setUser({ email: userData.email, isLoggedIn: true }));
            return { success: true };
          }
        } catch {
          // Still return success since login worked
          dispatch(setUser({ email: userData.email, isLoggedIn: true }));
          return { success: true };
        }
      } else {
        throw new Error("Tokens not received from server");
      }
    } else {
      throw new Error(payload || "Login failed");
    }
  };
};

export const fetchProfileAction = () => {
  return async (dispatch) => {
    const profileResponse = await getUserProfile();

    if (profileResponse.status === "success") {
      dispatch(setUser(profileResponse.payload));

      return { success: true };
    } else {
      throw new Error(profileResponse.message || "Failed to fetch profile");
    }
  };
};

export const changePasswordAction = (passwordData) => {
  return async (dispatch) => {
    const response = await changePassword(passwordData);

    if (response.status === "success") {
      return { success: true };
    } else {
      // Handle session expiration
      if (
        response.statusCode === 401 ||
        response.message?.includes("Session expired")
      ) {
        // Clear tokens and redirect to login
        sessionStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser([]));
        throw new Error("Session expired. Please log in again.");
      }
      throw new Error(response.message || "Failed to change password");
    }
  };
};

export const updateProfileAction = (profileData) => {
  return async (dispatch) => {
    try {
   
      const response = await updateUserProfile(profileData);
     

      if (response.status === "success") {
        // Update Redux user state with latest profile
        dispatch(setUser(response.payload));
        return { success: true };
      } else {
        // Handle session expiration
        if (
          response.statusCode === 401 ||
          response.message?.includes("Session expired")
        ) {
          // Clear tokens and redirect to login
          sessionStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser([]));
          return {
            success: false,
            error: "Session expired. Please log in again.",
          };
        }
        return {
          success: false,
          error: response.message || "Failed to update profile",
        };
      }
    } catch {
      // Don't block application submission on profile update failure
      return {
        success: false,
        error: "Failed to update profile",
      };
    }
  };
};

export const logoutAction = (authId) => {
  return async (dispatch) => {
    try {
      

      // Call the logout API to clear server-side tokens/sessions
      await logoutUser(authId);
     

      // Clear tokens from browser storage regardless of API response
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Reset user state in Redux
      dispatch(setUser([]));

  

      return { success: true };
    } catch {
      // Even if API call fails, clear local tokens and reset state
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser([]));

      return { success: true };
    }
  };
};

export const autologinAction = () => {
  return async (dispatch) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return;
    }
    
    dispatch(setLoading(true));
    
    try {
      // Attempt to fetch profile. apiProcessor will handle token refresh 
      // if accessToken is missing or expired, as long as refreshToken is in localStorage.
      const response = await getUserProfile();
      
      if (response?.status === "success" && response?.payload) {
        dispatch(setUser(response.payload));
        return { success: true };
      } else {
        // If autologin failed (e.g., refresh token expired), clear tokens to prevent loops
        sessionStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    } catch (error) {
      console.error("Auto-login failed:", error);
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } finally {
      dispatch(setLoading(false));
    }
  };
};
