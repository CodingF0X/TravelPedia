const { default: mongoose } = require("mongoose")
const Post = require("../Models/PostModel")

//-- GET ALL POSTS --//
exports.getAllPosts = async (req,res)=>{
    const { page } = req.query
    try{
        const LIMIT = 8
        const startIndex =  (Number(page)-1) * LIMIT
        const total = await Post.countDocuments({})

        const posts = await Post.find().sort({_id:-1}).limit(LIMIT).skip(startIndex)
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)})
    }catch(err){
        res.status(400).json({error:err.message})
    }
   
}

//-- GET POST BY ID --//
exports.getSinglePost = async (req,res)=>{
    const id = req.params.id
    try{

        const singlePost = await Post.findById(id)
        res.status(200).json(singlePost)

    }catch(err){
        res.status(400).json({error:err.message})
    }
}

//-- GET POSTS BY SEARCH --//
exports.getPostsBySearch = async (req,res)=>{
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await Post.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (err) {    
        res.status(404).json({ error: err.message });
    }
}

//-- CREATE POST --//
exports.createPost = async (req,res)=>{
    const userId = req.userId
   // console.log(req)
    try{

        const newPost = await Post.create({...req.body,creator:userId})
        res.status(200).json(newPost)

    }catch(err){
        res.status(400).json({error:err.message})
    }
}

//-- UPDATE POST --//
exports.updatePost = async (req,res)=>{
    const id = req.params.id
     try{
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(500).json({error:'No such post'})

        const updatedPost = await Post.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})

        res.status(200).json(updatedPost)

     }catch(err){
        res.status(400).json({error:err.message})
     }
}

//-- DELETE POST --//
exports.deletePost = async (req,res)=>{
    const id = req.params.id

    try{
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(500).json({error:'No such post'})

        const deletedPost = await Post.findByIdAndDelete(id)
        res.status(200).json(deletedPost)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

//-- LIKE POST --//
exports.likePost = async (req,res)=>{
    const id = req.params.id
    const userId = req.userId
    try{
        if(!req.userId)
            return res.status(400).json({error: 'request unauthorized'})

        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(500).json({error:'No such post'})

           const post = await Post.findById(id)
           const isLiked = post.likeCount.findIndex(id=>id===userId)

           if(isLiked){
            post.likeCount.push(userId)
           }else{
            post.likeCount.pop(userId,true)
           }

           const updatedPost = await Post.findByIdAndUpdate(id,{
              likeCount:post.likeCount
           },{new:true})

           res.status(200).json(updatedPost)


        // const post = await Post.findById(id)
        // if(!post.likeCount.includes(userId)){
        //     await post.updateOne({$push:{likeCount:userId}})
        //     res.status(200).json(post)
        // }else{
        //     await post.updateOne({$pull:{likeCount:userId}})
        //     res.status(200).json(post)

        // }
        //const updatedPost = await Post.findByIdAndUpdate(id,post,{new : true})

       
        //res.status(200).json(post)

        
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.commentPost= async (req,res)=>{
    const id =req.params.id
    const { value } = req.body;
     //console.log(req.body)
    try{
       const post = await Post.findById(id);

         post.comments.push(value);
    
        // await post.updateOne({$push:{comments:[value]}})

        const updatedPost = await Post.findByIdAndUpdate(id,post,{ new: true });

        // const updatedPost = await Post.findByIdAndUpdate(id,{
        //     $set:req.body
        // },{new:true})
        
        res.status(200).json(updatedPost)
    }catch(err){
        res.status(400).json({error:err.message})

    }
}