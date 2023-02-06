import { Container, Grow, Grid, Paper,AppBar,TextField,Button,Chip, useTheme}  from '@mui/material'
import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { MuiChipsInput } from 'mui-chips-input'
import { Search } from '@mui/icons-material';


import Posts from '../../Posts/Posts';
import Form from '../../Form/Form';
import { getPostsBySearch, getPosts } from '../../../State/Action-Creators/PostsActions';
import { token } from '../../../Tokens/TokenCheck';
import Paginate from '../../Pagination/Paginate';

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = useQuery()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const theme = useTheme()
    const { post,posts,isLoading } = useSelector(state=> state.posts)


    const [searchTerm,setSearchTerm] = useState('')
    const [tags, setTags] = useState([])
   // const [currentId, setCurrentId] = useState(null)

    // useEffect(()=>{
    //   dispatch(getPosts(page))
    // },[page,dispatch])
 

   const searchPost = ()=>{
    if (searchTerm.trim() || tags) {
      dispatch(getPostsBySearch({ searchTerm, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${searchTerm || 'none'}&tags=${tags.join(',')}`);
      console.log(searchTerm.trim())
      setTags([])
      setSearchTerm('')
    } else {
      navigate('/');
      
    }
   }

   const handleKeyPress = (e)=>{
       if(e.keyCode === 13){
        //post Search logic
       }
   }



   const handleOnAdd =(tag) => {
        setTags([...tags,tag])
  }

   const handleDelete = (tagToDelete)=>{
    setTags(tags.filter(tag=>tag !== tagToDelete))
   }


  
  return (
    <Grow in>
          <Container maxWidth='xl'>
            <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}
            sx={[{
              [theme.breakpoints.down('xs')]: {
                flexDirection: 'column-reverse',
              },
            }]}
            >
              <Grid item xs={12} sm={6} md={9}>
                <Posts />
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <AppBar position='static' color='inherit' 
                sx={{
                  borderRadius: 4,
                  marginBottom: '1rem',
                  display: 'flex',
                  padding: '16px',
                }}
                >
                  <TextField 
                  name='search'
                  variant='outlined'
                  label='Search Posts'
                  value={searchTerm}
                  onChange={e=>setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  
                  />
                 
              
                  <MuiChipsInput 
                  sx={{margin:'10px 0'}}
                  variant='outlined'
                  label='Search Tags'
                  value={tags}
                  onAddChip={handleOnAdd}
                  onDeleteChip={handleDelete}
                  />
                  <Button onClick={searchPost} color='primary' variant='contained'> search <Search/></Button>
                </AppBar>
                <Form />
              </Grid>
              
            </Grid>
            <Paper elevation={6} sx={{
               borderRadius: 4,
               marginTop: '1rem',
               padding: '16px',
              
             }}>
              
             <Paginate page={page} />
                
              
             </Paper>
            </Container>
        
          </Grow>
  )
}

export default Home