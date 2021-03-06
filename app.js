const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const dotenv = require('dotenv')

dotenv.config()

//db
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
.then(()=> console.log('DB connected'))

mongoose.connection.on('error', err =>{
    console.log(`DB connection error: ${err.message}` )
})
//bring in routes
const postRoutes = require('./routes/post.js')
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/user')

//apiDocs
app.get('/',(req,res)=>{
     fs.readFile('docs/apiDocs.json',(err,data) =>{
        if(err){
           res.status(400).json({
            error: err 
           })   
        }

        const docs = JSON.parse(data)
        res.json(docs)
     })
})

//middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cookieParser())
app.use("/", postRoutes);
app.use("/",authRoutes)
app.use("/", userRoutes)
// handle error authen
app.use(function(err, req, res, next){
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({error : 'Unauthorized !'})
    }
});

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`A NodeJS API is listening on port : ${port}`)
});

