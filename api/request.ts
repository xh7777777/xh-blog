import axios from "axios";
import { URL } from "@/data/constant";

const request = axios.create({
    baseURL: URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    }
})

export default request;