import axios, { AxiosInstance } from "axios";

const BASE_API = 'http://localhost:5000/api/v1'

export const axiosPrivate: AxiosInstance  = axios.create({
    baseURL: BASE_API,
    withCredentials:true
});

export const axiosPublic: AxiosInstance = axios.create({
    baseURL: BASE_API,
})

export interface Error {
    message: string;
    code: number;
}

export default axios;