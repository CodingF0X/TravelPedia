import { Typography,Box, AppBar, useTheme, Link, Toolbar, Avatar,Button }  from '@mui/material'
import  * as mystyles from '../MyStyles/StyledBar';
import TravelPedia from '../../images/TravelPedia.jpg'
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { purple } from '@mui/material/colors';
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customToken, Token_Google_auth } from '../../Tokens/TokenCheck';



const Navbar = () => {  
   const  { StyledBar, NavbarStyles} = mystyles
   const theme = useTheme()
   const dispatch = useDispatch()
   const location = useLocation()
 
   const [user, setUser] =useState(null)

  //  //-- GET THE TOKEN FROM LOCAL STORAGE --//
  //  //---- NOTICE THE TOKEN ALREADY IS STRING SO WE NEED TO PARSE IT ----//
    const token = localStorage.getItem('userToken') ?
    JSON.parse (localStorage.getItem('userToken')) : null
  

  // useEffect(()=>{ 
  // const decoded = token && jwt_decode(token)
  // decoded ? setUser(decoded) : setUser(null)

  // },[location])   
 
  useEffect(()=>{
  //-- IF ITS CUSTOM TOKEN (COMES FROM OUR API) THEN WE JSON.parse IT AS WE NEED IT AS A JSON OBJECT.SO WE CAN EXTRACT USER DETAILS.
  //---- IF THE TOKEN COMES FORM GOOGLE AUTH THEN WE STRINGIFY IT, SO WE DECODE IT (DECODING NEED STRING) ----//
    if(token && Object.prototype.hasOwnProperty.call(token,'result')){
      const customToken = token.result
      setUser(customToken)
      console.log(customToken)
   }else if(token && !Object.prototype.hasOwnProperty.call(token,'result')){
   
    const decoded = jwt_decode( JSON.stringify(token))
    setUser(decoded)
    console.log(decoded)
   }
  },[location])

 const handleLogout = ()=>{
   dispatch({type:'LOGOUT'})
   setUser(null)
 }

 

 if(token && customToken){
  const decode = jwt_decode(token.token)
  decode.exp * 1000 < new Date().getTime() && handleLogout()
  
 }else if(token && Token_Google_auth){
  const decode = jwt_decode(token.token)
  decode.exp * 1000 < new Date().getTime() && handleLogout()


 }

  return (
    <AppBar position="static" color="inherit" sx={[NavbarStyles.appBar]}  >
        <Box component='div' sx={NavbarStyles.brandContainer} >
            <Typography component={RouterLink}
            to='/'
            variant='h2'
            sx={[{ color:'orangered',
            textDecoration: 'none',
            fontSize: '2em',
            fontWeight: 300,
              } ]}
            >
               TravelPedia    
            </Typography>

            <Box component='img' 
            sx={{
            marginLeft: '10px',
            marginTop: '5px',}} 
            src={TravelPedia} alt="icon" 
            height={60} />
        </Box>

        <Toolbar sx={NavbarStyles.toolbar}>
        {user? (
          <Box component='div' 
          sx={[NavbarStyles.profile,
            (theme)=>({
                [theme.breakpoints.down('sm')]:
              {  width: 'auto',
                marginTop: 20,
                justifyContent: 'center',}
            })
          ]}>
            <Avatar sx={{
                color:theme.palette.getContrastText(purple[500]),
                backgroundColor: purple[500],
            }}  alt={user?.name} src={user?.picture}>{user?.name.charAt(0)}</Avatar>
            <Typography sx={NavbarStyles.userName} variant="h6">{user?.name}</Typography>
            <Button variant="contained" sx={[NavbarStyles.logout]} color="secondary" onClick={ handleLogout }>Logout</Button>
          </Box>
        ) : (
          <Button component={RouterLink} to="/login" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
      </AppBar>
  )
}

export default Navbar