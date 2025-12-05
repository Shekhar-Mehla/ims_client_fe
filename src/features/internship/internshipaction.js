import { getAllInternships } from "./internshipapi.js";
import { setInternships } from "./internshipslice.js";

export const fetchInternshipActions = () => {
  return async (dispatch) => {
    try {
      console.log("Fetching internships...");
      const internshipInfo = await getAllInternships();
      const { status, payload } = internshipInfo;
      console.log("Internship fetch result:", status, payload);

      if (status === "success") {
        dispatch(setInternships(payload));
        return { success: true };
      } else {
        throw new Error(payload || "Failed to fetch internships");
      }
    } catch (error) {
      console.error("Internship fetch error:", error);
      throw error; // Re-throw for component handling
    }
  };
};
