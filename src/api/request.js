import axios from "axios";
import { BASE_URL } from "../constants/api";
import { isClient } from "../helpers/isClient";

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

request.interceptors.request.use(
  (config) => {
    const user = JSON.parse(isClient ? localStorage.getItem("user") : {});

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
      isClient && window.location.assign("/login");
      isClient && localStorage.clear();
    }
    return error.response;
  }
);

export default request;
