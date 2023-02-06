const express = require('express')
const router = express.Router()
const postController = require('../Controllers/PostsController')
const requireAuth = require('../middleware/requireAuth')

//-- GET ALL POSTS --//
router.get('/',postController.getAllPosts)

//-- CREATE POST --//
router.post('/', requireAuth,postController.createPost)

//-- GET POSTS BY SEARCH --//
router.get('/search',postController.getPostsBySearch)

//-- GET POST BY ID --//
router.get('/:id',postController.getSinglePost)

//-- UPDATE POST --//
router.patch('/:id',requireAuth,postController.updatePost)

//-- DELETE POST --//
router.delete('/:id',requireAuth, postController.deletePost)

//-- LIKE POST --//
router.patch('/:id/likePost',requireAuth,postController.likePost)

//-- COMMENT POST --//
router.post('/:id/commentPost',requireAuth,postController.commentPost)


module.exports = router