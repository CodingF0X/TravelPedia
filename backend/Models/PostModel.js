const mongoose = require('mongoose')
const schema = mongoose.Schema

const postSchema = new schema({
    title:{
        type:String
    },
    message:{
        type:String
    },
    creator:{
        type:String
    },
    name:{
        type:String
    },
    tags:[String],
    selectedFile:{
        type:String,
        default:''
    },
    likeCount:{
        type:Array,
        default:[]
    },
    comments:{
        type:[String],
        default:[]
    }
    // likeCount: {
    //     type: Map,
    //     of: Boolean,
    //   },
},{timestamps:true})

const Post = mongoose.model('post',postSchema)

module.exports = Post