const { body } = require("express-validator");

exports.signUpValidation = [
    body("username").trim().notEmpty().withMessage("username can't be an empty !"),
    body("email").trim().isEmail().withMessage("enter valid email").notEmpty().withMessage("email can't be an empty"),
    body("password").trim().notEmpty().withMessage("password is required"),
];

