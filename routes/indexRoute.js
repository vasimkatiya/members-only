const { Router } = require("express");
const passport = require("passport");
const { getSignUp, postSignUp, getLogin } = require("../controllers/authControllers");
const { signUpValidation } = require("../validation/validation");
const { indexController } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.post('/log-in',
    passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/log-in",       
    })
);
indexRouter.get("/log-in",getLogin);

indexRouter.get("/log-out", (req, res, next) => {
    req.logout((err)=> {
        if (err) {
            return next(err);
        }
        return res.redirect("/");
    });
});



indexRouter.get("/",indexController)

//setup the add sign-up routes.

indexRouter.get("/sign-up",getSignUp);
indexRouter.post("/sign-up",signUpValidation,postSignUp);

module.exports = indexRouter;