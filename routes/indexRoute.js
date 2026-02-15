const { Router } = require("express");
const passport = require("passport");
const { getSignUp, postSignUp, getLogin } = require("../controllers/authControllers");
const { signUpValidation, checkRole } = require("../validation/validation");
const { indexController, Getmessage, addMessageGet, addMessagePost, deleteController } = require("../controllers/indexController");
const { isAuth, isAdmin } = require("../middlewares/auth");

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

indexRouter.get("/user/messages",Getmessage);
indexRouter.get("/user/messages/add",isAuth,checkRole(["user","admin"]),addMessageGet)
indexRouter.post("/user/messages/add",isAuth,checkRole(["user","admin"]),addMessagePost)

indexRouter.get("/user/messages/delete/:id",deleteController)

module.exports = indexRouter;