import { Paper,Typography,CircularProgress,Divider, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams,useNavigate,Link as RouterLink } from 'react-router-dom'
import { getPostsBySearch, getSinglePost } from '../../../State/Action-Creators/PostsActions'
import Comments from './Comments'

const PostDetails = () => {
  const { post,posts,isLoading } = useSelector(state=> state.posts)
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(()=>{
    // post && dispatch(getSinglePost(post._id))
   dispatch(getSinglePost(id))

   
  },[id,dispatch])

  useEffect(()=>{
    if(post)
     dispatch(getPostsBySearch({searchTerm:'none', tags:post?.tags.join(',') || 'none'}))
  },[post,dispatch])

  if(!post)
    return null

  if(isLoading){
   return (
      <Paper elevation={6}>
        <CircularProgress/>
      </Paper>
    )
   }

   const recommendedPosts = posts?.filter(({_id})=> _id !== post?._id)

   const openPost = (id)=> navigate(`/posts/${id}`)
   

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
    <Box component='div' 
    sx={[{
      display: 'flex',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
        flexDirection: 'column',
      },
    }]}
    >
      <Box component='div' 
      sx={[{
        borderRadius: '20px',
        margin: '10px',
        flex: 1,
      }]}
      >
        <Typography variant='h3' component="h2">{post?.title}</Typography>
        <Typography gutterBottom variant="h6" color="textSecondary" component='h2'>{post?.tags.map((tag) => (
          <Typography key={tag} component={RouterLink} to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
            {` #${tag} `}
          </Typography>
        ))}
        </Typography>
        <Typography gutterBottom variant="body1" component='p'>{post?.message}</Typography>
        <Typography variant="h6">
          Created by:
          <Typography component={RouterLink} to={`/creators/${post?.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
            {` ${post?.name}`}
          </Typography>
        </Typography>
        <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Comments  />
        <Divider style={{ margin: '20px 0' }} />
      </Box>
      <Box sx={[{
           marginLeft: '20px',
           [theme.breakpoints.down('sm')]: {
             marginLeft: 0,
           },
      }]}>
        <Box component='img' 
        sx={[{
          borderRadius: '20px',
          objectFit: 'cover',
          width: '100%',
          maxHeight: '600px',
        }]}
        src={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post?.title} />
      </Box>
    </Box>
    {recommendedPosts?.length && (
      <Box component='div' sx={{
        borderRadius: '20px',
        margin: '10px',
        flex: 1,
      }}>
        <Typography gutterBottom variant='h5'>You might Also Like</Typography>
        <Divider />
          <Box component='div'  
          sx={[{
              display: 'flex',
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
              },
        }]}>
            {recommendedPosts?.map(({title,message,name,likeCount,selectedFile, _id })=>(
              <Box component='div' sx={{margin:'20px', cursor:'pointer'}} onClick={()=>openPost(_id)} key={_id}>
                <Typography gutterBottom variant='h6'>{title}</Typography>
                <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                <Typography gutterBottom variant='subtitle1'>Likes :{likeCount.length}</Typography>
                <Box component='img' src={selectedFile} width='200px'/>

              </Box>
            ))}
          </Box>

      
      </Box>
    )}
    </Paper>
  )
}

export default PostDetails