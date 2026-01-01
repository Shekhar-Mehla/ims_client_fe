import { getApplicationsByUser } from "./applicationapi.js";
import { setApplications } from "./applicationslice.js";

export const getApplicationsByUserAction = (userId) => async (dispatch) => {
  const applicationInfo = await getApplicationsByUser(userId);
  const { status, payload } = applicationInfo;
  
  // You can dispatch an action to store applications in Redux if needed
  status === "success" && dispatch(setApplications(payload));
};
