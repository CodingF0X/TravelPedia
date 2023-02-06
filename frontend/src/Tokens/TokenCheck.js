
  export const token = localStorage.getItem('userToken') ?   
  JSON.parse (localStorage.getItem('userToken')) : null

  //-- CHEKING IF THE LOCALSTORAGE HAS 'result' PROPERTY ON IT
  export const customToken = token && Object.prototype.hasOwnProperty.call(token,'result')
  export const Token_Google_auth = token && ! Object.prototype.hasOwnProperty.call(token,'result')

  // export const isUserExist = ((customToken && (token?.result?._id === post.creator)) || (Token_Google_auth && (GoogleToken?.sub === post.creator) ))      