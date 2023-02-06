const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const User = require('../Models/UserModel')

//-- CREATE THE TOKEN --//
const createToken = (email,id)=>{
    return JWT.sign({email,_id:id},process.env.SECRET,{expiresIn:'1h'})
}

//-- USER SIGN IN --//
exports.userSignIn = async (req,res)=>{
    const {email, password} = req.body

    try{

        const user = await User.findOne({email})

        if(!user)
            return res.status(500).json({error:'No such user'})

        const auth = await bcrypt.compare(password, user.password)
        if(!auth)
            return res.status(500).json({error:'Invalid email or password'})

            const token = createToken(user.email,user._id)
        res.status(200).json({ result:user, token })

    }catch(err){
        res.status(400).json({error:err.message})
    }
}


//-- USER SIGN UP --//
exports.userSignUp = async (req,res)=>{
    const {firstName,lastName, email, password, confirmPassword} = req.body

    try{

        const exsitingUser = await User.findOne({email})
        if(exsitingUser)
            return res.status(400).json({error:'Email address already registerd'})
        
        
        if(password !== confirmPassword)
            return res.status(400).json({error:'Passwords do not match'})

        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password,salt)

        const newUser = await User.create({
            email,
            password:hash,
            name:`${firstName} ${lastName}`
        })

        const token = createToken(newUser.email, newUser._id)
        res.status(200).json({result:newUser, token})
    }catch(err){

    }
}

