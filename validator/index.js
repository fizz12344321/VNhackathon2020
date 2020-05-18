exports.createPostValidator = (req,res,next) => {
    req.check('title','Write a title').notEmpty()
    req.check('title','Title must between 4 to 150 characters').isLength({
        min:4,
        max:150
    })

    //body
    req.check('body','Write a body').notEmpty()
    req.check('body','Body must be between 4 to 2000 characters').isLength({
        min : 4, 
        max: 2000
    })

    //check error
    const errors = req.validationErrors()
    //if error show  the first one 
    if(errors){
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next();
}

exports.userSignupValidator = (req, res, next) => {
        //name khong duoc null va between 4-10 characters
        req.check("name","Name is required").notEmpty();
        // email khong duoc null, valid va normalized
        req.check("email","Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min : 4, 
            max : 2000 
        })

        // check password 
        req.check("password","Password is required").notEmpty()
        req.check('password')
           .isLength({min : 6})
           .withMessage("Password must contain at least 6 character")
           .matches(/\d/)
           .withMessage("Password must contain a number")

        // check for errors 
        const errors = req.validationErrors();
        // if errors -> show happen 
        if(errors){
           const firstError = errors.map(error => error.msg)[0]
           return res.status(400).json({ error: firstError })
        }
        next();
}    