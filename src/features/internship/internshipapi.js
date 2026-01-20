import { apiProcessor } from "../../services/apiprocessor";
const apiBaseUrl = import.meta.env.VITE_BASE_API_URL || "http://localhost:8001";

export const internshipApi = apiBaseUrl + "/api/v1/internship";
export const getAllInternships = async () => {
  const url = `${internshipApi}/all-internships`;
  const method = "GET";
  return await apiProcessor({ url, method, showToast: false });
};

export const getInternshipBySlug = async (slug) => {
  const url = `${internshipApi}/${slug}`;
  const method = "GET";
  return await apiProcessor({ url, method, showToast: false });
};
