import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography,useTheme, ButtonBase,} from '@mui/material'
import { ThumbUpAlt, Delete, MoreHoriz } from '@mui/icons-material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import JWT_decoded from 'jwt-decode'
import * as styledPost from './Styles'
import { useDispatch } from 'react-redux'
import { deletePost, likePost,getSinglePost } from '../../../State/Action-Creators/PostsActions'
import { customToken, token, Token_Google_auth } from '../../../Tokens/TokenCheck'
import { useEffect } from 'react'


const Post = ({post}) => {
  const {myStyles} = styledPost
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const GoogleToken = token && JWT_decoded(token.token)
  const isUserExist = ((customToken && (token?.result?._id === post.creator)) || (Token_Google_auth && (GoogleToken?.sub === post.creator) )) 
 
  const Likes = () => {
    if (post.likeCount.length > 0) {
      return post.likeCount.find((like) => like === customToken ? token?.result?.name : GoogleToken?.name)
        ? (
          <><ThumbUpAlt fontSize="small" />&nbsp;{post.likeCount.length > 2 ? `You and ${post.likeCount.length - 1} others` : `${post.likeCount.length} like${post.likeCount.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAlt fontSize="small" />&nbsp;{post.likeCount.length} {post.likeCount.length === 1 ? 'Like' : 'Likes'}</>
        );
    }else if(post.likeCount.length === 0){
      
       return ( 
            <><ThumbUpAlt fontSize="small" />&nbsp;{post.likeCount.length} </>
            )    
    }
  }


  const hadnleDelete = (e)=>{
    e.preventDefault()

    dispatch(deletePost(post._id))

  }



  const handleLike = (e)=>{
    e.preventDefault()
      dispatch(likePost(post._id))
      // console.log(token?.result?.name)
      // console.log(JWT_decoded(token.token)?.name)
      
  } 

 

  const getPostById = (e)=>{
    dispatch(getSinglePost(post._id))
  }

  const openPost = ()=>{
    // dispatch(getSinglePost(post._id))
    navigate(`/posts/${post._id}`)
  }

  return (
    <Card sx={myStyles.card} elevation={6} >
      <ButtonBase onClick={openPost} 
      sx={{
           display: 'block',
           textAlign: 'initial',
      }}>
      <CardMedia 
      sx={myStyles.media}
      image={post.selectedFile} 
      title={post.title}
      />

      <Typography component='div'  sx={myStyles.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </Typography>
     
        <Typography variant='body2' color='black' fontWeight='bold' sx={myStyles.details}>
          {post.tags.map(tag=>`#${tag} `)}
        </Typography>

        <Typography variant='body2' color={theme.palette.warning.dark} sx={myStyles.title}>
          {post.title}
        </Typography>
      

      <CardContent>
        <Typography variant='h5' gutterBottom sx={{fontSize:'15px', color:'GrayText'}}> { post.message }</Typography>
      </CardContent>
    </ButtonBase>
    {isUserExist &&
      (<Typography component='div' sx={myStyles.overlay2}>
        <Button style={{color:'white'}} size='small' onClick={getPostById}>
          <MoreHoriz fontSize='default' />
        </Button>
      </Typography>
      )}
    <CardActions sx={myStyles.cardActions}>
     
        <Button size='small' color='primary' onClick={handleLike}>
          <Likes/>
          &nbsp;
          {/* {post.likeCount.length} */}
        </Button>
        
        { isUserExist &&
        ( 
          <Button size='small' color='primary' onClick={hadnleDelete}>
            <Delete fontSize='small'>Delete</Delete>
          </Button> 
         )
        }
    </CardActions>

    </Card>
  )
}

export default Post