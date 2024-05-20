//1. import express-validator
const { body, validationResult } = require('express-validator');


//2. exports userRegister validation
exports.userRegValidator = async (req, res, next) => {
    try {
        await Promise.all([
            body('username').notEmpty().withMessage('Name is required')
            .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long').run(req),

            body('phone').notEmpty().withMessage('Phone number is required')
            .isMobilePhone().withMessage('Phone number is not valid').run(req),

            body('email').notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Email is not valid').run(req),

            body('password').notEmpty().withMessage('Password is required')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            .matches(/[\W_]/).withMessage('Password must contain at least one special character').run(req)   
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next()
                
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};



//3. exports userLogin validation
exports.userLogValidator = async (req, res,next) => {
    try {
        
        await Promise.all([
            body('email').isEmail().withMessage('Invalid email address')
            .isEmail().withMessage('Email is not valid').run(req),

            body('password').notEmpty().withMessage('Password is required')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req)    
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({msg:"validation error", errors: errors.array() });
        }

        next()       
        
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

   