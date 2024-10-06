import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { handleGetPostById } from '../lib/api';
import { useEffect, useState } from 'react';
import { IPost } from '../lib/types';
import { BASE_URL, DEFAULT_PIC } from '../lib/constant';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export interface IProps{
    postId:number
    handleClose:()=> void
}
export  function Post({postId, handleClose}:IProps) {
  const [post, setPost] = useState<IPost>()

  useEffect(() => {
    handleGetPostById(postId)
    .then(response => {
      setPost(response.payload as IPost)
    })
  },[postId])

  
 
  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            POST no. {postId}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          
          </Typography>
          <img src={post?.picture?BASE_URL + post.picture:"NO IMAGE"} />
          <p>{post?.likes.length}</p>
          <div>
            {
              post?.likes.map(u => <p>{u.name} {u.surname}</p>)
            }
          </div>
        </Box>
      </Modal>
    </div>
  );
}