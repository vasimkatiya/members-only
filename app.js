const express = require("express");
const path = require("path");
const session = require('express-session');
const { errorHandler } = require("./middlewares/errorHandler");
const passport = require("passport");
require("./config/passport.config");
require("dotenv").config();
const pgSession = require('connect-pg-simple');
const pool = require("./db/pool");

const app = express();

//set a view engine for displaying output.
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

const PGsession = pgSession(session);

app.use(express.urlencoded({extended:false}));

app.use(session({
    store:new PGsession({
        pool,
        tableName:"session",
        createTableIfMissing:true
    }),
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: 1000*60*60*24*30
    }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(errorHandler);
app.listen(3000,()=>{
    console.log("server running on the port on 3000 !");
});
