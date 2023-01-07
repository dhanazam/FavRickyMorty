import Axios, { AxiosInstance } from "axios";
import { GetCharactersResponse } from "@api/api.types";
import ENDPOINTS from "@api/endPoints";

export class Api {
    private static instance: Api;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = Axios.create({
            baseURL: "https://rickandmortyapi.com/",
            timeout: 3000,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    setup() {
        this.axiosInstance.interceptors.response.use(
            response => {
                return response.data;
            },
            error => {
                return Promise.reject(error);
            },
        );
    }

    public static getInstance() {
        if (!Api.instance) {
            Api.instance = new Api();
            Api.instance.setup();
        }

        return Api.instance;
    }

    async getCharacters(params?: any) {
        return this.axiosInstance.get<any, GetCharactersResponse>(
            ENDPOINTS.CHARACTERS,
            { params },
        );
    }
}
