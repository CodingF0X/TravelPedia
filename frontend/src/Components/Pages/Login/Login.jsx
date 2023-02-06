import { Avatar, Paper, Button, Grid, Typography, Container , useTheme, TextField} from '@mui/material'
import { LockOutlined, Token } from '@mui/icons-material'
import { Box } from '@mui/system'
// import { GoogleLogin } from 'react-google-login'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from "jwt-decode";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Icon from './Icon'
import Input from './Input'
import { signIn, signUp } from '../../../State/Action-Creators/AuthActions';

const Login = () => {
  const theme = useTheme()
  const [isSignup, setIsSinup] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const initialState = {firstName:'', lastName:'',email:'', password:''}
  const [formData, setFormData]=useState(initialState)

  const handleSubmit = (e)=>{
    e.preventDefault()
    // console.log(formData)

    if(isSignup){
      dispatch(signUp(formData,navigate))
    }else{
      dispatch(signIn(formData,navigate))
    }
  }

  const handleChange = (e)=>{
    e.preventDefault()
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const siwtchMode = ()=>{
    setIsSinup(((prevSignup)=> !prevSignup))
  }
  
  // const tokenx = useSelector(state=>state.auth)
  // console.log(tokenx)

  const googleSuccess =async (res)=>{
    const token = res?.credential
      // var decoded = jwt_decode(token);
      // console.log(decoded)
    
   // const customizedToken = tokenx
      
    try{
      if(token)
      dispatch({type:'AUTH', payload:{token}})
    
      navigate('/')
    }catch(error){
      console.log(error)
    }
  }

  const googleFailure =(error)=>{
    console.log(error)
    console.log('Signing in was unsuccessfull')
  }
 //{error: 'idpiframe_initialization_failed', details: 
 //'You have created a new client application that //
 //use…i/web/guides/gis-migration) for more information.'}//
 //details: "You have created a new client application that uses 
 //libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated.
 // See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."error: "idpiframe_initialization_failed"[[Prototype]]: Object


  return (
    <Container component='main' maxWidth='xs'>
      <Paper elevation={6} sx={[{
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: theme.spacing(2),
      }]}>

        <Avatar sx={[{
           margin: theme.spacing(1),
           backgroundColor: theme.palette.secondary.main,
        }]}>
            <LockOutlined />
        </Avatar>
        <Typography variant='h5'>{isSignup?'Sign Up' : 'Sign in'}</Typography>
        <Box component='form' onSubmit={handleSubmit} 
        sx={[{
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        }]}
        >
          <Grid container spacing={2}>
          {isSignup && <> 
              <Input
              name='firstName'
              label='First Name'
              handleChange={handleChange}
              autoFocus
              half
              />

              <Input 
              name='lastName'
              label='Last Name'
              handleChange={handleChange}
              autoFocus
              half
              />
             </> 
             }
              <Input 
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
              />

              <Input 
              name='password'
              label='Password'
              handleChange={handleChange}
              type='password'
             
              />
              
            { isSignup && 
            <Input 
            name="confirmPassword" 
            label="Repeat Password" 
            handleChange={handleChange} 
            type="password" 
            /> 
            }
           
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={[{ margin: theme.spacing(3, 0, 2)}]}>
            { isSignup ? 'Sign Up' : 'Sign in' }
          </Button>

            <GoogleLogin 
              // render={(renderProps)=>(
              //   <Button 
              //   color='primary' 
              //   fullWidth
              //   onClick={renderProps.onClick} 
              //   disabled={renderProps.disabled} 
              //   startIcon={<Icon/>}
              //   variant='contained' 
              //   sx={[{
              //     marginBottom: theme.spacing(2),
              //   }]}
              //   >Login with Google</Button>
              // )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy='single_host_origin'
            />

         
          <Grid container justify='flex-end' >
            <Grid item >
              <Button onClick={siwtchMode}>
                {isSignup?'Already have an account ? Sign in' : 'Dont Have an account ? Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>

  )
}

export default Login