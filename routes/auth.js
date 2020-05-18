const express = require('express')
const { signup, signin , signout } = require('../controllers/auth')
const { userById } = require("../controllers/user")
const { userSignupValidator } = require('../validator')

const router = express.Router();

// for signup
router.post('/signup',userSignupValidator,signup)

// for signin
router.post('/signin',signin)

//for signout
router.get('/signout',signout)
// :user_id => app se execute 
router.param("userId",userById);
module.exports = router;