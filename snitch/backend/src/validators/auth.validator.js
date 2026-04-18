import {body , validationResult} from 'express-validator'

const validate = (req,res,next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    res.status(400).json({
        errors: errors.array()
    })
}

export const registerValidate = [
    body("fullname").isString().withMessage("a fullname is required"),
    body("email").isEmail().withMessage("a valid email is required"),
    body("password").isLength({min:4}).withMessage("password must be at least 4 characters"),
    body("contact").isNumeric.withMessage("a valid contact number is required"),
    body("role").isBoolean().withMessage("isSeller must be a boolean value"),
    validate 
]
