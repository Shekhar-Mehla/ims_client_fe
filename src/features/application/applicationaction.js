import { getApplicationsByUser } from "./applicationapi.js";
import { setApplications, setLoading } from "./applicationslice.js";

export const getApplicationsByUserAction = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const applicationInfo = await getApplicationsByUser(userId);
    const { status, payload } = applicationInfo;
    
    if (status === "success") {
      dispatch(setApplications(payload));
    } else {
      dispatch(setApplications([]));
    }
  } catch {
    dispatch(setApplications([]));
  }
};
