import {
  loginUser,
  getUserProfile,
  logoutUser,
  changePassword,
  fetchNewAccessTokenApi,
  updateUserProfile,
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
     
      const profileResponse = await getUserProfile();
     

      if (profileResponse.status === "success") {
        dispatch(setUser(profileResponse.payload));
    
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
    } catch (error) {
      console.error("Password change error:", error);
      throw error;
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
    } catch (error) {
      console.error("Profile update error:", error);
      // Don't block application submission on profile update failure
      return {
        success: false,
        error: error.message || "Failed to update profile",
      };
    }
  };
};

export const logoutAction = (authId) => {
  return async (dispatch) => {
    try {
      

      // Call the logout API to clear server-side tokens/sessions
      const logoutResponse = await logoutUser(authId);
     

      // Clear tokens from browser storage regardless of API response
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Reset user state in Redux
      dispatch(setUser([]));

  

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
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return;
    }
    dispatch(setLoading(true));
    
    try {
      if (accessToken) {
        // dispatch(fetchProfileAction());
        const response = await getUserProfile();
        if (
          response?.status === "error" &&
          response?.message === "jwt expired"
        ) {
          const tokens = await fetchNewAccessTokenApi();
          
          if (tokens.status === "success" && tokens?.payload) {
            sessionStorage.setItem("accessToken", tokens?.payload);

            const getUser = await getUserProfile();
            if (getUser?.status === "success") {
              dispatch(setUser(getUser?.payload));
              return { success: true };
            }
          }
        }
        if (response?.status === "success" && response?.payload) {
          dispatch(setUser(response?.payload));
          return { success: true };
        }
      }
    } catch (error) {
      console.error("Auto-login error:", error);
      throw error;
    }
  };
};
