import axios from "axios";
import { InputUser, IResponse, LoginUser } from "./types";

const Axios = axios.create({
    baseURL:"http://localhost:4002"
})

export const handleSignup = async (user:InputUser):Promise<IResponse> => {
    const response = await Axios.post("/signup", user)
    return response.data
}

export const handleLogin = async(user:LoginUser):Promise<IResponse> => {
    const response = await Axios.post("/login", user)
    return response.data
}