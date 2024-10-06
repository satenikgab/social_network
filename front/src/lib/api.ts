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

export const handlePictureUpload = async(data:FormData):Promise<IResponse> => {
    const response = await Axios.patch("/profile/upload",data)
    return response.data
}

export const handleCoverPictureUpload = async(data:FormData):Promise<IResponse> => {
    const response = await Axios.patch("/cover/upload", data)
    return response.data
}

export const handleGetPosts = async():Promise<IResponse> => {
    const response = await Axios.get("/posts")
    return response.data
}

export const handleAddPost = async(data:FormData):Promise<IResponse> => {
    const response = await Axios.post("/posts", data)
    return response.data
}

export const handleSearch = async (text:string):Promise<IResponse> => {
    const response = await Axios.get("/search/" + text)
    return response.data
}

export const handleGetUserAccount = async (id:string):Promise<IResponse> => {
    const response = await Axios.get("/account/" + id)
    return response.data
}

export const handleAccountPrivacy = async():Promise<IResponse> => {
    const response = await Axios.patch("/account/set")
    return response.data
}

export const handleSendFollow = async(id:number):Promise<IResponse> => {
    const response = await Axios.post("/account/follow/" + id)
    return response.data
} 

export const handleSendUnfollow = async (id: number): Promise<IResponse> => {
    const response = await Axios.post("/account/unfollow/" + id)
    return response.data
  }
  
export const getAllRequestedUsers = async():Promise<IResponse> => {
    const response = await Axios.get("/requests")
    return response.data

}

export const handleCancelRequest = async (id: number): Promise<IResponse> => {
    const response = await Axios.delete("/request/cancel/" + id)
    return response.data
  }

export const handleAcceptRequest = async (id: number): Promise<IResponse> => {
    const response = await Axios.patch("/requests/accept/" + id)
    return response.data
  }

  export const handleDeclineRequest = async (id: number): Promise<IResponse> => {
    const response = await Axios.patch("/requests/decline/" + id)
    return response.data
  }

  export const handelPostReaction = async(id:number):Promise<IResponse> => {
    const response =await Axios.post("/posts/react/" +id)
    return response.data
}

export const handleAccountBlock = async (id:number):Promise<IResponse> => {
    const response = await Axios.post("/block/" + id)
    return response.data
}

export const handleDeletePost = async (id:number):Promise<IResponse> => {
    const response = await Axios.delete("/posts/" + id)
    return response.data
}

export const handleGetPostById = async (id:number):Promise<IResponse> => {
    const response = await Axios.get("/posts/" + id)
    return response.data
}
