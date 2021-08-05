import axios, { AxiosResponse } from "axios";

export class HttpRequest {
    async get<T extends { [P in keyof T]: unknown }>(url: string): Promise<AxiosResponse<T>> {
        try {
            return axios.get<T>(url);
        }catch (error){
            throw error;
        }
    }
}
