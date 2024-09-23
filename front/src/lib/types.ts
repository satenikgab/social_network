export interface IUser{
    id:string
    name:string
    surname:string
    login:string
    password:string
    isPrivate:boolean
    cover:string
    picture:string
}

export type InputUser = Omit<IUser,"id" | "isPrivate" |"cover" | "picture">
export type LoginUser = Omit<IUser,"id" | "isPrivate" |"cover" | "picture" | "name" | "surname">



export interface IResponse{
    status:string
    message?:string
    payload?:unknown

}