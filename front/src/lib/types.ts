export interface IUser {
    id?: number;
    name: string;
    surname: string;
    login: string;
    password: string;
    picture?: string;
    cover?: string;
    followers?: IUser[];
    following?: IUser[];
    isPrivate?: number;
  }

export type InputUser = Omit<IUser, 'id'|'isPrivate'|'cover'|'picture'>
export type LoginUser = Omit<IUser, 'id'|'name'|'surname'|'isPrivate'|'cover'|'picture'>
export type UserPassword = Omit<LoginUser, 'login'> & {
    newpwd:string
}
export type UserLogin = Omit<LoginUser, 'password'> & {
    newLogin:string
}

export interface IResponse {
    status:string
    message?:string
    payload?:unknown
    user?:IWideUser
}

export interface IWideUser extends IUser{
    followers: IUser[]
    following:IUser[]
}

export interface IContextType{
    account:IWideUser
    setAccount:(user:IWideUser)=>void
}

export interface IPost {
    id:number
    title:string
    picture:string
    likes:IUser[]
    isLiked:boolean
}

export interface IAccount extends IUser {
    posts?:IPost[]
  
    available:boolean
  
    connection: {
      blockedMe:boolean
      didIBlock:boolean
      following:boolean
      followsMe:boolean
      requested:boolean
    }
  }

export interface ChangePassword{
    old:string
    newpwd:string
}

export interface ChangeLogin{
    password:string
    login:string
}

export interface IRequest{
    id:number
    user:IUser

}

