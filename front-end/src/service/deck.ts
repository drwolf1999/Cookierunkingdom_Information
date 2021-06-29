// import http from "@/http-common";
import Constants from "@/constants/RestAPI";
import axios from "axios";

// auth 에 대한 Action 정의
export default {
    // Get
    GetDecks(option: Record<string, unknown>): Promise<any> {
        return axios.get(`${Constants.SERVER_DOMAIN}/deck`, {params: option});
    },
    GetDeckById(id: number): Promise<any> {
        return axios.get(`${Constants.SERVER_DOMAIN}/deck/get/${id}`);
    },
    GetDecksByCookie(option: Record<string, unknown>): Promise<any> {
        return axios.get(`${Constants.SERVER_DOMAIN}/deck/include`, {params: option});
    },
    // Post
    CreateDeck(data: any): Promise<any> {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        return axios.post(`${Constants.SERVER_DOMAIN}/deck/write`, data, {headers});
    },
    Update(data: any): Promise<any> {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        return axios.post(`${Constants.SERVER_DOMAIN}/deck/update`, data, {headers});
    },
    Vote(data: {
        ip: string,
        deckId: number,
    }): Promise<any> {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        return axios.post(`${Constants.SERVER_DOMAIN}/deck/vote`, data, {headers});
    }
};