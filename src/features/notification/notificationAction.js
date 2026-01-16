import { getMyNotifications } from "./notificationapi";
import { setNotification, setLoading, setError } from "./notificationslice";

export const fetchNotificationpActions = (_id) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const notificationInfo = await getMyNotifications(_id);
      const { status, payload } = notificationInfo;

      if (status === "success") {
        dispatch(setNotification(payload));
        return { success: true };
      } else {
        throw new Error(payload || "Failed to fetch notifications");
      }
    } catch (error) {
      dispatch(setError(error.message));
      throw error; 
    }
  };
};
// export const markNotificationpActionRead = (_id) => {
//   return async (dispatch) => {
//     try {
//       const notificationInfo = await markNotificationRead(_id)
//       const { status, payload } = notificationInfo;
//       console.log(status, payload, "action");

//       if (status === "success") {
//         dispatch(setNotification(payload));
//         return { success: true };
//       } else {
//         throw new Error(payload || "Failed to fetch internships");
//       }
//     } catch (error) {
//       console.error("Internship fetch error:", error);
//       throw error; // Re-throw for component handling
//     }
//   };
// };


