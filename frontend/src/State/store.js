import { createStore, applyMiddleware, combineReducers } from 'redux' 
import thunk from 'redux-thunk'
import  { composeWithDevTools } from 'redux-devtools-extension'
import { postsReducer } from './Reducers/PostsReducer'
import { authReducer } from './Reducers/AuthReducer'


const reducers = combineReducers({
    posts:postsReducer,
    auth: authReducer
})

//  //-- GET THE TOKEN FROM LOCAL STORAGE --//
// //---- NOTICE THE TOKEN ALREADY IS STRING SO NO NEED TO USE JSON.parse(...) ----//
// const token = localStorage.getItem('userToken') ?
//    JSON.parse (localStorage.getItem('userToken')) : null
const initialState={
    posts:{},
    //auth:token
}

const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(thunk)))

export default store