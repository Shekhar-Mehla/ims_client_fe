import { apiProcessor } from "../../services/apiprocessor";

const apiBaseUrl = import.meta.env.VITE_BASE_API_URL || "http://localhost:8001";
const notificationApi = apiBaseUrl + "/api/v1/notification";

export const getMyNotifications = async (id) => {
  const url = `${notificationApi}/${id}`;
  const method = "GET";
  // endpoint may require auth; apiProcessor will attach tokens when isPrivate is true
  return await apiProcessor({ url, method, isPrivate: true, showToast: false });
};

export const markNotificationRead = async (id) => {
  const url = `${notificationApi}/update/${id}`;
  const method = "PATCH";
  return await apiProcessor({ url, method, isPrivate: true });
};
