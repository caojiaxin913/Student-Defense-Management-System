import axios from "axios";

const service = axios.create({
  baseURL:'http://127.0.0.1:3000',
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    // 添加其他的头部信息
  }
});

//axios拦截器
service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = window.localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
