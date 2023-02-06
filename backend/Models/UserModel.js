const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    id:{
        type:String
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User