const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const postSchema = new mongoose.Schema({
    title : {
        type: String,
        required: "Title is required",
        minlength: 4,
        maxlength: 150
    },
    body : {
        type: String, 
        required: "body is required",
        minlength: 4,
        maxlength: 2000
    },
    location : {
        type: String
    },
    budge : {
        type: String
    },
    description : {
        type: String 
    },
    rating :{
        type:Number
    },
    photo: {
        data: Buffer,
        contenType: String
    },
    postedBy: {
        type: ObjectId,
        ref : "User"
    },
    created: {
        type : Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Post",postSchema)