import axios from "axios";

const createApiClient = (baseURL) =>
  axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

const apiClient = createApiClient(import.meta.env.VITE_API_URL);
const apiFindIngredients = createApiClient(import.meta.env.VITE_API_URL_FIND_INGREDIENTS);
const translateClient = createApiClient(import.meta.env.VITE_API_URL_TRANSLATE);

// Add interceptor for `apiClient`
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { apiClient, apiFindIngredients, translateClient };
