const { validationResult } = require("express-validator");
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");


exports.getSignUp = (req,res)=>{
    try{
        res.render("sign-up",{
            error:[]
        });
    }catch(err){
        return console.error(err);
    }
}

exports.postSignUp = async (req,res,next) =>{
    try{
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.render("sign-up",{
                title:"hello",
                error:errors.array(),
            })
        }

        const {username,email,password,role} = req.body;

        const hashedPassword = await bcrypt.hash(password,10);
        console.log(username,password,email,role);
        
        await pool.query("INSERT INTO users (username,email,role,password) values ($1,$2,$3,$4);",[username,email,role,hashedPassword]);
        res.redirect("/log-in");
    }catch(err){
        return next(err)
    }
}

exports.getLogin = (req,res) =>{
    res.render("log-in");
}
