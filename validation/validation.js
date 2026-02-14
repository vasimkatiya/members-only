const { body } = require("express-validator");

exports.signUpValidation = [
    body("username").trim().notEmpty().withMessage("username can't be an empty !"),
    body("email").trim().isEmail().withMessage("enter valid email").notEmpty().withMessage("email can't be an empty"),
    body("password").trim().notEmpty().withMessage("password is required"),
];

exports.checkRole = (allowedRole)=>{
    return (req,res,next)=>{
        if(!req.user) return res.redirect("/log-in");
        
        if(!allowedRole.includes(req.user.role)){
            return res.redirect("/user/messages");
        }
        next();
    }
}