import Constants from "@/constants/RestAPI";
import axios from "axios";

// auth 에 대한 Action 정의
export default {
    // Get
    GetComments(boardId: number | string): Promise<any> {
        return axios.get(`${Constants.SERVER_DOMAIN}/comment/board/${boardId}`);
    },
    // Post
    CreateComment(boardId: number | string, data: {
        username: string,
        password: string,
        parentComment: number | string | null,
        content: string,
    }): Promise<any> {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        return axios.post(`${Constants.SERVER_DOMAIN}/comment/create/board/${boardId}`, data, {headers});
    },
};