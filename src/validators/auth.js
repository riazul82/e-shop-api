const { check } = require('express-validator');
const { validationResult } = require('express-validator');

exports.validateSignupRequest = [
    check('firstName').notEmpty().withMessage('First name is required!'),
    check('lastName').notEmpty().withMessage('Last name is required!'),
    check('email').isEmail().withMessage('Enter a valid email!'),
    check('password').isLength({ min: 6 }).withMessage('Password must be 6 character long')
];

exports.validateLoginRequest = [
    check('email').isEmail().withMessage('Enter a valid email!'),
    check('password').isLength({ min: 6 }).withMessage('Password must be 6 character long')
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}