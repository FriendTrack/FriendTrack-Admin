import axios from "axios";

export const $api = axios.create({
  baseURL: "http://89.111.155.61:9001/api/v1/",
  withCredentials: false,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);

    if (error.response.status === 403) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      window.location.href = "/login";
    }

    return error;
  }
);
