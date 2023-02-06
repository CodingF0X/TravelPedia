import { AUTH } from '../constants/constants'
import * as api from '../../API'

export const signUp = (formData,navigate)=>async (dispatch)=>{

    try{

        const res = await api.signup(formData)
        dispatch({type:AUTH, payload:res.data})
        navigate('/')
        console.log(res.data)

    }catch(err){
        console.log(err)
    }
}

export const signIn = (formData,navigate)=> async (dispatch)=>{

    try{
        const res = await api.signin(formData,navigate)
        dispatch({type:AUTH, payload:res.data})
        navigate('/')

        console.log(res.data)
    }catch(err){
        console.log(err)
    }
}