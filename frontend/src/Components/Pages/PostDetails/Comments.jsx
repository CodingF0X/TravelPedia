import { useState,useRef, useEffect } from 'react'
import { Typography, TextField, Button, Box } from '@mui/material'
import { customToken, token, Token_Google_auth } from '../../../Tokens/TokenCheck'
import  jwt_decode  from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { commentPost } from '../../../State/Action-Creators/PostsActions'
const Comments = () => {
  const {post} = useSelector(state=>state.posts)
  const dispatch = useDispatch()
  const [comments, setComments]=useState(post?.comments)
  const [comment, setComment]=useState('')
  //const [user, setUser]=useState(null)
  const commentsRef = useRef();
  // const isUserExist = ((customToken && (token?.result?._id === post.creator)) || (Token_Google_auth && (GoogleToken?.sub === post.creator) )) 

  const decoded = Token_Google_auth && jwt_decode( JSON.stringify(token))
  const user = token ? (customToken ?  token.result.name : decoded.name) : 'user'

  
  // let decoded 
  // if(Token_Google_auth) {
  //  decoded = jwt_decode( JSON.stringify(token))
  // }


// console.log(user)
  
  const handleClick = async ()=>{
      
    const userComment = `${user} : ${comment}`
   const newComment =  await dispatch(commentPost(post._id,userComment))
   
     setComments(newComment);
     setComment('');
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });

    console.log(newComment)
   }
 
  //  useEffect(()=>{
   

  // },[dispatch])

  return (
    
     <Box component='div' >
     
      <Box component='div' >
      
         <Typography component='div' 
        sx={{
           height: '200px',
           overflowY: 'auto',
           marginRight: '30px',
        }}>
          <Typography  gutterBottom variant='h6'>Comments</Typography>
        
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c?.split(': ')[0]}</strong>
              {c?.split(':')[1]}
            </Typography>
          ))}
           <Typography component='div'   ref={commentsRef}/>
         </Typography>
     
          <Box component='div' style={{width:'70%'}}>
          <Typography gutterBottom variant='h6'>Write a comment</Typography>
            
            <TextField 
            fullWidth
            rows={4}
            variant='outlined'
            label='comment'
            multiline
            value={comment}
            onChange={e=>setComment(e.target.value)}
            />

            <Button 
            style={{marginTop:'10px'}}
            fullWidth disabled={!comment}
            variant='contained' 
            onClick={handleClick}
            >
              comment... 
          
            </Button>
            {/* <Typography>{`${user} : ${comment}`}</Typography> */}
          </Box>
       
      </Box>

     </Box>
    
  )
}

export default Comments