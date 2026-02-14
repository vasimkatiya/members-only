const pool = require("../db/pool");

exports.indexController = (req,res) =>{
    res.render("index");
}

exports.Getmessage = (req,res)=>{
    res.render("message")
}

exports.addMessageGet = (req,res)=>{
    res.render("addMessages")
}

exports.addMessagePost = async (req,res) =>{
    const {message} = req.body;
    await pool.query("insert into messages (message,user_id) values($1,$2)",[message,req.user.id]);
    res.redirect("/user/messages");
}