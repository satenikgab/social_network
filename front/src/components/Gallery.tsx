import { IPost } from "../lib/types"
import { BASE_URL } from "../lib/constant"

interface IProps{
    posts:IPost[]
}

export const Gallery :React.FC<IProps>= ({posts}) => {
    return <>
    <p>You have {posts?.length} posts</p>
       <div className="list">
        {
            posts.map(post => <div key={post.id}>
                <img className= "post-img" src={BASE_URL + post.picture} />
                <p>{post.title}</p>
            </div>)
        }

       </div>
    </>
}