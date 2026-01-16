import { getAllInternships, getInternshipBySlug } from "./internshipapi.js";
import {
  clearInternships,
  setInternshipBySlug,
  setInternships,
} from "./internshipslice.js";

export const fetchInternshipActions = () => {
  return async (dispatch) => {
    dispatch(clearInternships());
    try {
      const internshipInfo = await getAllInternships();
      const { status, payload } = internshipInfo;


      if (status === "success") {
        dispatch(setInternships(payload));
        return { success: true };
      } else {
        throw new Error(payload || "Failed to fetch internships");
      }
    } catch (error) {
      throw error; // Re-throw for component handling
    }
  };
};

export const fetchInternshipBySlugActions = (slug) => {
  return async (dispatch) => {
    try {
      const internshipInfo = await getInternshipBySlug(slug);
      const { status, payload } = internshipInfo;
      if (status === "success") {
        // You can dispatch an action to set the specific internship if needed
        dispatch(setInternshipBySlug(payload));
        return { success: true, data: payload };
      } else {
        throw new Error(payload || "Failed to fetch internship by slug");
      }
    } catch (error) {
      throw error; // Re-throw for component handling
    }
  };
};
