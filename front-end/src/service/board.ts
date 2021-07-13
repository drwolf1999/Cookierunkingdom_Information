import Constants from "@/constants/RestAPI";
import axios from "axios";
import {IBoard} from "@/interface/board";

// auth 에 대한 Action 정의
export default {
    // Get
    GetBoards(option: {
        query: string | null,
        page: number,
    }): Promise<any> {
        return axios.get(`${Constants.SERVER_DOMAIN}/board`, {params: option});
    },
    GetBoardById(id: number | string): Promise<any> {
        return axios.get(`${Constants.SERVER_DOMAIN}/board/${id}`);
    },
    // Post
    CreateBoard(data: IBoard): Promise<any> {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        return axios.post(`${Constants.SERVER_DOMAIN}/board/write`, data, {headers});
    },
    UpdateBoard(data: IBoard): Promise<any> {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        return axios.post(`${Constants.SERVER_DOMAIN}/board/update`, data, {headers});
    },
    CheckPassword(data: {
        id: number,
        password: string,
    }): Promise<any> {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        return axios.post(`${Constants.SERVER_DOMAIN}/board/password`, data, {headers});
    }
};