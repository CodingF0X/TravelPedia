import { AUTH, LOGOUT } from '../constants/constants'

export const authReducer = (state={authData:null},action)=>{
    switch(action.type){
        case AUTH:
            console.log(action?.payload)
                localStorage.setItem('userToken',JSON.stringify(action?.payload))
            
            return {...state,authData:action?.payload}

        case LOGOUT:
            localStorage.removeItem('userToken') 
            return {...state,authData:null}

        default:
            return state
    }
}