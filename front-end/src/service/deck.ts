// import http from "@/http-common";
import Constants from "@/constants/RestAPI";
import axios from "axios";

// auth 에 대한 Action 정의
export default {
    // Get
    GetDecks(option: Record<string, unknown>): Promise<any> {
        console.log(option)
        return axios.get(`${Constants.SERVER_DOMAIN}/deck`, {params: option});
    },
    GetDecksByCookie(option: Record<string, unknown>): Promise<any> {
        console.log(option)
        return axios.get(`${Constants.SERVER_DOMAIN}/deck/info`, {params: option});
    },
    // Post
    CreateDeck(data: any): Promise<any> {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        return axios.post(`${Constants.SERVER_DOMAIN}/deck/write`, data, {headers});
    },
};