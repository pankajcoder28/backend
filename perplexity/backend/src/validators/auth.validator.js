import { body, validationResult } from "express-validator";

export function handleValidationErrors (req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            errors: errors.array()  
    })
    }
    next();
}
 
export const registerValidation = [
    body('username')
        .isString()
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 20 }),
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Invalid email format'), 
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 3 , max: 10 }),
       
    handleValidationErrors    
];