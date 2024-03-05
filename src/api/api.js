import axios from "axios";

// const baseURL = "http://k7d207.p.ssafy.io:8080/api";
const baseURL = "https://까마귀공방.com/api";

const headers = {
  "Content-Type": "application/json;charset=UTF-8",
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
  withCredentials: true,
};

const api = axios.create({ baseURL, headers });

api.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    const accessToken = localStorage.getItem("access-token");
    if (accessToken) config.headers.Authorization = accessToken;
  }
  return config;
});

export default api;
