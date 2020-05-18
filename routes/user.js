const express = require('express')

const { userById , 
       allUsers , 
       getUser, updateUser,deleteUser , addFollower, addFollowing,
       removeFollower, removeFollowing} = require("../controllers/user")

const { requireSignin }  = require("../controllers/auth")
const router = express.Router();


//for get all user
router.get('/users',allUsers)
// for get user id
router.get('/user/:userId', getUser)

// updateUser
router.put('/user/:userId',  updateUser)
//delete user 
router.delete('/user/:userId', deleteUser)

//router follow
// router.put("/user/follow", addFollowing, addFollower);
// router.put("/user/unfollow",removeFollowing, removeFollower)
// :user_id => app se execute 
router.param("userId",userById);
module.exports = router;