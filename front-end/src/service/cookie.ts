import Constants from "@/constants/RestAPI";
import axios from "axios";

// auth 에 대한 Action 정의
export default {
    // Get
    GetGoodTopping(cookie: string): Promise<any> {
        return axios.get(`${Constants.SERVER_DOMAIN}/cookie/${cookie}`);
    },
    // Post
};