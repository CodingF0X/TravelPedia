import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:4000'})

const token = localStorage.getItem('userToken') ?
JSON.parse (localStorage.getItem('userToken')) : null



API.interceptors.request.use((req)=>{

    //-- CHEKING IF THE LOCALSTORAGE HAS 'result' PROPERTY
    if(token && Object.prototype.hasOwnProperty.call(token,'result')){
        const customToken = token?.token
        req.headers.authorization = `Bearer ${customToken}`
        //console.log(customToken)

        // return req
     }
    if(token && !Object.prototype.hasOwnProperty.call(token,'result')){
        req.headers.authorization = `Bearer ${token?.token}`

      //console.log(token.token)
     
     }
     
     return req
    
})

// const url_ = 'http://localhost:4000/api/posts'
// const userUrl_ = 'http://localhost:4000/api/user'



//-- POSTS METHODS --//
export const fetchPosts = (page)=> API.get(`/api/posts?page=${page}`)
export const fetchSinglePost = (id)=> API.get(`/api/posts/${id}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/api/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost)=> API.post('/api/posts',newPost)
export const updatePost = (id,postData)=> API.patch(`/api/posts/${id}`,postData)
export const deletePost = (id)=> API.delete(`/api/posts/${id}`)
export const likePost = (id)=> API.patch(`/api/posts/${id}/likePost`)  
export const comment = (id,value) => API.post(`/api/posts/${id}/commentPost`, { value });
                                                      // carefull about this object//

//-- AUTH METHODS --//
export const signup = (formData)=>API.post(`/api/user/signup`,formData)
export const signin = (formData)=>API.post(`/api/user/signin`,formData)



