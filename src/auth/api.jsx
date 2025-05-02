import axios from "axios";
import toast from "react-hot-toast";
import { getCookies, deleteCookies } from "./auth";
import {
  API_BASE_URL,
  TOKEN_COOKIE_KEY,
  ROLE_COOKIE_KEY,
} from "../../config";

// ✅ Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Auth token injector
api.interceptors.request.use(
  async (config) => {
    const token = await getCookies(TOKEN_COOKIE_KEY);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Central error handler
const handleAuthError = (message = "Session expired. Please login again.") => {
  toast.error(message, { id: "auth-error" });
  deleteCookies(TOKEN_COOKIE_KEY);
  deleteCookies(ROLE_COOKIE_KEY);
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.error || "Something went wrong";

    if (status === 401) handleAuthError("Unauthorized. Please login again.");
    else if (status === 403) handleAuthError("Forbidden. Access denied.");
    else null;

    return Promise.reject(error);
  }
);

export default api;
