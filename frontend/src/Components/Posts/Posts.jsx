import React from 'react'
import { useSelector } from 'react-redux'
import Post from './Post/Post'
import { Grid, CircularProgress } from '@mui/material'

const Posts = () => {
  const {posts,isLoading} = useSelector(state=>state.posts)

 
 
  if(!posts?.length && !isLoading)
    return 'no posts'
    
  return (
   
        isLoading ? <CircularProgress /> : (
          <Grid container alignItems='stretch' spacing='50'>
              {posts.map(post=>(
                <Grid key={post._id} item xs={12} sm={6} md={6} lg={3} >
                  <Post post={post} />
                  </Grid>
              ))}
          </Grid>
        
        )
  )
}

export default Posts