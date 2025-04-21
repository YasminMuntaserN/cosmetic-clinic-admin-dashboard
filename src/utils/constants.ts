import axios from "axios";

export const  AUTH_TOKEN =localStorage.getItem('accessToken');

export const apiClient = axios.create({
    baseURL: "http://localhost:5030/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${AUTH_TOKEN}`,
    },
});

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