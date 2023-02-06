const jwt = require('jsonwebtoken')
const { decode } = require('jsonwebtoken')

const requireAuth = async (req,res,next)=>{

    const {authorization} = req.headers

    console.log(req.headers)
    if(!authorization){
        return res.status(400).json({error:'authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try{

        const isCustomAuth = token.length < 500
    
        let decodedData
        if(token && isCustomAuth){
            decodedData = jwt.verify(token,process.env.SECRET)
    
            req.userId = decodedData?._id
        }else{
            decodedData = decode(token)
    
            req.userId = decodedData?.sub
        }
    
        next()
    }catch(err){
        res.status(400).json({error:err.message})
    }

}

module.exports = requireAuth

