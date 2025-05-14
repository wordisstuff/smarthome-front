import axios from 'axios';

export const homeApi = axios.create({
    baseURL: `http://10.0.0.70:8080/`,
    withCredentials: true,
});
