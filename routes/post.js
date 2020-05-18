const express = require('express')
const {getPosts, createPost ,postsByUser, postById,deletePost,updatePost, photo} = require('../controllers/post')
const {requireSignin } = require('../controllers/auth')
const {createPostValidator} = require('../validator')
const {userById } = require("../controllers/user")
const router = express.Router();
//requireSignin neu can authen
router.get('/posts', getPosts)
router.post('/post/new/:userId', createPost,createPostValidator)
router.get("/posts/by/:userId",postsByUser)

//delete post by user 
router.delete("/post/:postId",deletePost)

//update post by user
router.put("/post/:postId",updatePost)

// photo 
router.get("/post/photo/:postId",photo)
// :user_id execute userById()
router.param("userId", userById);
//:post_id 
router.param("postId", postById);

module.exports = router;