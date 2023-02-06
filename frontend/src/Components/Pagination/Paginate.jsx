import { Pagination, PaginationItem } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPosts } from '../../State/Action-Creators/PostsActions'

const Paginate = ({page}) => {
  const dispatch = useDispatch()
  const { numberOfPages } = useSelector(state=>state.posts)
  useEffect(()=>{
    
    page  && dispatch(getPosts(page))
  },[page,dispatch])

  return (
    <Pagination 
      count={numberOfPages}
      page={Number(page) || 1}
      variant='outlined'
      color='primary'
      renderItem={item=>(
        <PaginationItem 
        {...item} component={Link} to={`/posts/?page=${item.page}`}
        />
      )}
    />
      

  )
}

export default Paginate