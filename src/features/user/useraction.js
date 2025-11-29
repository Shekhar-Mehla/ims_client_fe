import { loginUser } from "./userapi.js";
import { setUser } from "./userslice.js";
export const loginAction = async (dispatch, userData) => {
  console.log(dispatch, userData);
  const userInfo = await loginUser(userData);
  const { status, payload } = userInfo;
  console.log(status, payload);
  status === "success" && dispatch(setUser(payload));
};
