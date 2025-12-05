import { apiProcessor } from "../../services/apiprocessor";
const apiBaseUrl = import.meta.env.VITE_BASE_API_URL;

export const internshipApi = apiBaseUrl + "/api/v1/internship";
export const getAllInternships = async () => {
  const url = `${internshipApi}/all-internships`;
  const method = "GET";
  return await apiProcessor({ url, method });
};
