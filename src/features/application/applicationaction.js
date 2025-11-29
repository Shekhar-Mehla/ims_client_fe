import { getApplicationsByUser } from "./applicationapi.js";
import { getApplication } from "./applicationslice.js";

export const getApplicationsByUserAction = async (dispatch, userId) => {
  const applicationInfo = await getApplicationsByUser(userId);
  const { status, payload } = applicationInfo;
  console.log(status, payload);
  // You can dispatch an action to store applications in Redux if needed
  status === "success" && dispatch(getApplication(payload));
};
