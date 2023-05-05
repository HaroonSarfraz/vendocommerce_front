import axios from "axios";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 30000,
});

request.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));

    config.headers["Authorization"] = `Bearer ${user?.access_token}`;

    if (config.url.startsWith("/sales/")) {
      const brand = JSON.parse(localStorage.getItem("brand"));
      config.url = "/brands/" + brand.id + config.url;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

request.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error?.response?.status === 401) {
      window.location.assign("/login");
      localStorage.clear();
    }
    return error.response;
  }
);

export default request;
