import { getAllInternships } from "./internshipapi.js";
import { setInternships } from "./internshipslice.js";

export const fetchInternshipActions = async (dispatch) => {
  console.log(dispatch);
  const internshipInfo = await getAllInternships();
  const { status, payload } = internshipInfo;
  console.log(status, payload);
  status === "success" && dispatch(setInternships(payload));
};
