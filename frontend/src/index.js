import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './State/store';
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='1085341453665-ht570g5gm6qqm455ifcr0o0mg8stfp8q.apps.googleusercontent.com'
    >
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>   
  </React.StrictMode>
);


