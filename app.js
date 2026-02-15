const express = require("express");
const path = require("path");
const session = require('express-session');
const { errorHandler } = require("./middlewares/errorHandler");
const passport = require("passport");
require("./config/passport.config");
require("dotenv").config();
const pgSession = require('connect-pg-simple');
const pool = require("./db/pool");
const indexRouter = require("./routes/indexRoute");
const { globalVariables } = require("./middlewares/globalEjsVar");
const main = require("./db/populateDB");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname,"public")))
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

// add indexRouter where every-paths start to link with the each others
app.use(globalVariables); // add global variable in all ejs tamplates.

app.use("/",indexRouter);

app.use(errorHandler);
app.listen(port,()=>{
    main();
    console.log("server running on the port on 3000 !");
});
