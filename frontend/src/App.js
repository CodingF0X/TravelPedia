import './App.css';
import { Container}  from '@mui/material'
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Pages/Home/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Components/Pages/Login/Login';
import PostDetails from './Components/Pages/PostDetails/PostDetails';
import { customToken, token, Token_Google_auth } from './Tokens/TokenCheck';

function App() {
 
  return ( 
    <Container  maxWidth='xl'>     
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/posts' />} />
        <Route path='/posts' element={<Home />} />
        <Route path='/posts/search' element={<Home />} />
        <Route path='/posts/:id' element={<PostDetails />} />

        <Route path='/login' element={ !token ? <Login /> : <Navigate to='/posts' />} />
      </Routes>
    </BrowserRouter>
    </Container>
  );
}

export default App;
