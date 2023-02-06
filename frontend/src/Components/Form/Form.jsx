import React, { useState } from 'react'
import { TextField, Typography, Button, useTheme, Paper } from '@mui/material'
import { Box } from '@mui/system'
import FileBase from 'react-file-base64'
import * as mystyles from '../MyStyles/StyledBar';
import { useDispatch, useSelector } from 'react-redux';
import { createPost,updatePost } from '../../State/Action-Creators/PostsActions';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { token,customToken,Token_Google_auth } from '../../Tokens/TokenCheck';
import { useNavigate } from 'react-router-dom';




const Form = ({}) => {
  const { StyledPaper } = mystyles
  const theme = useTheme()
  const navigate = useNavigate()
  const [postData, setPostData] = useState({
    title:'',message:'',tags:'', selectedFile:''
  })

  const targetPost = useSelector(state=>state.posts?.post)
  const post = useSelector( state=> targetPost?._id ? state.posts.posts.find(p=> p._id === targetPost?._id ) : null )
  const dispatch = useDispatch()

  // const token = localStorage.getItem('userToken') ?
  // JSON.parse (localStorage.getItem('userToken')) : null
  // const customToken = token && Object.prototype.hasOwnProperty.call(token,'result')
  // const Token_Google_auth = token && !Object.prototype.hasOwnProperty.call(token,'result')

 
  const handleSubmit =  (e)=>{
    e.preventDefault()
   // console.log(token?.result?.name)
   
    if(targetPost?._id){
      customToken ? dispatch(updatePost(targetPost._id,{...postData,name:token?.result?.name}))
      : dispatch(updatePost(targetPost._id,{...postData,name:jwt_decode(JSON.stringify(token))?.name}))

    }else{
      
      customToken ?  dispatch(createPost({...postData,name:token?.result?.name}))
      :  dispatch(createPost({...postData,name:jwt_decode(JSON.stringify(token))?.name}))
      //console.log(jwt_decode(JSON.stringify(token))?.name )
      // navigate('/')
    }

    handleClear()
  }

  useEffect(()=>{
    if(post)
     setPostData(post)

  },[post])

  
const handleClear = ()=>{
  // setCurrentId(null)
  setPostData({
    title:'',message:'',tags:'', selectedFile:''
  })
}


// if(!customToken && !Token_Google_auth ){
//   return(
//     <StyledPaper>
//       <Typography variant='h4'>login first !</Typography>
//     </StyledPaper>
//   )
// }
 
  return (
    <StyledPaper>
      {token ?
        <Box component='form'
         autoComplete='off' 
         noValidate
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            '& .MuiTextField-root': {
            margin: theme.spacing(0.5)},
          }}
         onSubmit={handleSubmit}
         >
          
          <Typography variant='h6' >
            {!post ? 'Creating Post' :
            'Update Post'
            } 
          </Typography>

          {/* <TextField
          name='creator' 
          variant='outlined' 
          label='Creator'
          fullWidth
          value={ postData.creator }
          onChange={e=>setPostData({...postData, creator:e.target.value})}
          /> */}

          <TextField
          name='title' 
          variant='outlined' 
          label='Title'
          fullWidth
          value={ postData.title}
          onChange={e=>setPostData({...postData, title:e.target.value})}
          />

          <TextField
          name='tags' 
          variant='outlined' 
          label='Tags'
          fullWidth
          value={postData.tags}
          onChange={e=>setPostData({...postData, tags:e.target.value.split(',')})}
          />

          <TextField
          name='message' 
          variant='outlined' 
          label='Message'
          fullWidth
          value={postData.message}
          onChange={e=>setPostData({...postData, message:e.target.value})}
          />

          <Box component='div'
           sx={{
            width: '97%',
             margin: '10px 0'
           }}   
          >
            <FileBase 
            type='file' 
            multiple={false} 
            onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
            />
          </Box>

          <Button  
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          fullWidth
          >
            submit
          </Button>

          <Button  
          type='submit'
          variant='contained'
          color='warning'
          size='large'
          fullWidth
          sx={{
            marginTop:'10px'
          }}
          onClick={handleClear}
          >
            Clear
          </Button>
        </Box> 
        :
        <StyledPaper>
        <Typography variant='h4'>login first !</Typography>
        </StyledPaper>
        }
    
    </StyledPaper>
  )
}

export default Form