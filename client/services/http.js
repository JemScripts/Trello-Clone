import axios from "axios";
import userService from "./user.service";

const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    }
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});

http.interceptors.response.use(
    (response) => response,
    (err) => {
        if (err.response && err.response.status === 401) {
            userService.logout();
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);

export default http;