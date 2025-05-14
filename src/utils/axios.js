import axios from 'axios';


export const homeApi = axios.create({
    baseURL: `http://localhost:8080/`,
    withCredentials: true,
});
