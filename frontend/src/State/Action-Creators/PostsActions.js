import { useEffect } from 'react'
import * as api from '../../API'
import { FETCH_ALL,CREATE,UPDATE,DELETE,LIKE_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_SINGLE_POST, COMMENT } from '../constants/constants'

export const getPosts = (page)=> async (dispatch)=>{

    
    try {
        dispatch({type:START_LOADING})

        const res = await api.fetchPosts(page)
        dispatch({type:FETCH_ALL, payload:res.data})
      dispatch({type:END_LOADING})

        //console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

export const getSinglePost = (id)=> async (dispatch)=>{

    try{
        dispatch({type:START_LOADING})

        const res = await api.fetchSinglePost(id)
        
            dispatch({type:FETCH_SINGLE_POST,payload:res.data})
            dispatch({type:END_LOADING})

        //console.log(res.data)
    }catch(err){
        console.log(err)
    }
}

export const getPostsBySearch = (searchQuery)=> async (dispatch)=>{

    try{
        dispatch({type:START_LOADING})
        // const res = await api.fetchPostsBySearch(searchQuery)
        const { data } = await api.fetchPostsBySearch(searchQuery);

        dispatch({type:FETCH_BY_SEARCH, payload:data})
        console.log(data)
        // console.log(data.map(d=>d.title))
        dispatch({type:END_LOADING})    

    }catch(err){
        console.log(err)
    }
}

export const createPost = (newPost)=> async (dispatch)=>{
    try {
        //dispatch({type:START_LOADING})

        const res = await api.createPost(newPost)

        dispatch({type:CREATE, payload:res.data})
       // dispatch({type:END_LOADING})

    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id,postData)=>async (dispatch)=>{
    try{
        const res = await api.updatePost(id,postData)
        dispatch({type:UPDATE,payload:res.data})

    }catch(err){
        console.log(err)
    }
}

export const deletePost = (id)=> async (dispatch)=>{
    
    try{

        await api.deletePost(id)
        dispatch({type:DELETE,payload:id})

    }catch(err){
        console.log(err)
    }
}

export const likePost = (id)=> async (dispatch)=>{

    try{
        const res = await api.likePost(id)
        dispatch({type:LIKE_POST,payload:res.data})
    }catch(err){
        console.log(err)
    }
}

export const commentPost = (id,value) => async (dispatch) => {
    try {
      const { data } = await api.comment( id, value);
  
      dispatch({ type: COMMENT, payload: data });
        console.log(data)
     return data.comments;
    } catch (error) {
      console.log(error);
    }
  };