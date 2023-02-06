const express = require('express')
const { userSignUp, userSignIn } = require('../Controllers/UserController')
const router = express.Router()

//-- USER SIGN IN --//
router.post('/signin',userSignIn)

//-- USER SIGN UP --//
router.post('/signup',userSignUp)

module.exports = router