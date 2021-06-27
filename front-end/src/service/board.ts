import Constants from "@/constants/RestAPI";
import axios from "axios";

// auth 에 대한 Action 정의
export default {
    // Get
    GetBoards(option: {
        query: string | null,
    }): Promise<any> {
        console.log(option)
        return axios.get(`${Constants.SERVER_DOMAIN}/board`, {params: option});
    },
    GetBoardById(id: number | string): Promise<any> {
        return axios.get(`${Constants.SERVER_DOMAIN}/board/${id}`);
    },
    // Post
    CreateBoard(data: {
        username: string,
        password: string,
        title: string,
        content: string,
    }): Promise<any> {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        return axios.post(`${Constants.SERVER_DOMAIN}/board/write`, data, {headers});
    },
};