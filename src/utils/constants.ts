import axios from "axios";
import {getTokens} from "../services/AuthService.ts";

export const apiClient = axios.create({
    baseURL: "https://clinc.runasp.net/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "text/plain",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const { accessToken } = getTokens();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const PAGE_SIZE = 5;
export const WORK_HOURS = {
    OPEN: "08:00",
    CLOSE: "18:00",
};
export const Work_Days = {
 Sunday  : 0  ,
 Monday   :1  ,
 Tuesday  :2  ,
 Wednesday:3 ,
 Thursday :4 ,
};

export const Today = new Date().toISOString().split("T")[0];

export const DAYS_OF_WEEK = [
    {label: 'Monday', value: 1},
    {label: 'Tuesday', value: 2},
    {label: 'Wednesday', value: 3},
    {label: 'Thursday', value: 4},
    {label: 'Sunday', value: 0},
];