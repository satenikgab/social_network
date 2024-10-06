
import { useOutletContext, useParams } from "react-router-dom"
import { handelPostReaction, handleDeletePost, handleVerify } from "../lib/api"
import { BASE_URL } from "../lib/constant"
import { IContextType, IPost, IUser } from "../lib/types"
import { Post } from "./Post"
import { useState } from "react"

interface IProps{
    posts:IPost[]
    onUpdatePost?: (id:number) => void
}

export const Gallery:React.FC<IProps> = ({posts, onUpdatePost})=> {
    const {id} = useParams()
    const {account,setAccount} = useOutletContext<IContextType>()
    const [currentPost,setCurrentPost] = useState<number>(-1)

    const [verified, setVerified] = useState<IUser | null>(account)
    const reactPost = (id:number) => {
        
        handelPostReaction(id).then(() => {
            if(onUpdatePost){
                onUpdatePost(id)
            }
        })
    }
  
    

    const handleDelete = (id:number) => {
        handleDeletePost(id)
        .then(response => {
            
        })
       
    }
    return <>
        <p>You have {posts.length} posts</p>
        <div className="list">
            {
                posts.map(post=>
                    <div key={post.id} className="post">
                      
                        <img className="post-img" src={BASE_URL + post.picture} />
                        <div onClick={()=>setCurrentPost(post.id)} className="cover"></div>
                        <img 
                            onClick={()=>reactPost(post.id)}
                            className="like-btn" 
                            src={
                                post.isLiked ? "https://cdn0.iconfinder.com/data/icons/sweets/128/heart_love_pink.png"
                                : "https://cdn0.iconfinder.com/data/icons/sweets/128/heart_love_white.png" 
                            }
                        alt="" />
                        { !id &&<button onClick={() => handleDelete(post.id)} className="delete-button">delete{id}</button>}
                        
                    </div>
                )
            }
        </div>
       {currentPost != -1 && <Post handleClose={()=> setCurrentPost(-1)} postId={currentPost}/>}
    </>
}