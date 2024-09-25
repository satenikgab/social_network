import axios from "axios";
import { ChangeLogin, ChangePassword, InputUser, IResponse, LoginUser } from "./types";

const Axios = axios.create({
    baseURL:"http://localhost:4002",
    withCredentials:true
})

export const handleSignup = async (user:InputUser):Promise<IResponse> => {
    const response = await Axios.post("/signup", user)
    return response.data
}

export const handleLogin = async(user:LoginUser):Promise<IResponse> => {
    const response = await Axios.post("/login", user)
    return response.data
}

export const handleVerify = async ():Promise<IResponse> => {
    const response = await Axios.get("/verify")
    return response.data

}

export const handleChangeLogin = async(changes:ChangeLogin):Promise<IResponse> => {
    const response = await Axios.patch("update/login",changes)
    return response.data
}

export const handleChangePassword = async(changes:ChangePassword):Promise<IResponse> => {

    const response = await Axios.patch("update/password",changes)
    return response.data
}

export const handleLogout = async():Promise<IResponse> => {
    const response = await Axios.post("/logout")
    return response.data
}