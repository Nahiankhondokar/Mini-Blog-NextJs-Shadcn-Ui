import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    'Content-Type': 'multipart/form-data',
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Automatically add Authorization token if it exists
api.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default api;
