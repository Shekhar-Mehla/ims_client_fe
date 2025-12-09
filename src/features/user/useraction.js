import {
  loginUser,
  getUserProfile,
  logoutUser,
  changePassword,
  fetchNewAccessTokenApi,
} from "./userapi.js";
import { setLoading, setUser } from "./userslice.js";
export const loginAction = (userData) => {
  return async (dispatch) => {
    try {
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
              console.log("User profile loaded and stored in Redux");
              return { success: true };
            } else {
              console.warn("Failed to fetch user profile, but login succeeded");
              // Still return success since login worked
              dispatch(setUser({ email: userData.email, isLoggedIn: true }));
              return { success: true };
            }
          } catch (profileError) {
            console.error("Error fetching user profile:", profileError);
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
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Re-throw to be caught by the component
    }
  };
};

export const fetchProfileAction = () => {
  return async (dispatch) => {
    try {
      console.log("Fetching user profile...");
      const profileResponse = await getUserProfile();
      console.log("Profile fetch response:", profileResponse);

      if (profileResponse.status === "success") {
        dispatch(setUser(profileResponse.payload));
        console.log("User profile updated in Redux");
        return { success: true };
      } else {
        throw new Error(profileResponse.message || "Failed to fetch profile");
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
      throw error;
    }
  };
};

export const changePasswordAction = (passwordData) => {
  return async (dispatch) => {
    try {
      console.log("Changing password...");
      const response = await changePassword(passwordData);
      console.log("Password change response:", response);

      if (response.status === "success") {
        console.log("Password changed successfully");
        return { success: true };
      } else {
        throw new Error(response.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Password change error:", error);
      throw error;
    }
  };
};

export const logoutAction = () => {
  return async (dispatch) => {
    try {
      console.log("Logout action called");

      // Call the logout API to clear server-side tokens/sessions
      const logoutResponse = await logoutUser();
      console.log("Logout API response:", logoutResponse);

      // Clear tokens from browser storage regardless of API response
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Reset user state in Redux
      dispatch(setUser([]));

      console.log("User logged out successfully, tokens cleared");

      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);

      // Even if API call fails, clear local tokens and reset state
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser([]));

      console.log("Local logout completed despite API error");
      return { success: true };
    }
  };
};

export const autologinAction = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      console.log(accessToken, " from autologin action");
      if (accessToken) {
        dispatch(fetchProfileAction());
        dispatch(setLoading(false));
        return { success: true };
      }
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        //  call an API to get the access token
        const { status, payload } = await fetchNewAccessTokenApi();
        if (status === "success") {
          const { accessToken } = payload;
          sessionStorage.setItem("accessToken", accessToken);
          dispatch(fetchProfileAction());
          dispatch(setLoading(false));
          return { success: true };
        }
      }
    } catch (error) {
      console.error("Auto-login error:", error);
      throw error;
    }
  };
};
