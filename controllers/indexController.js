const pool = require("../db/pool");

exports.indexController = (req,res) =>{
    res.render("index");
}

exports.Getmessage = async (req,res)=>{
    const {rows} = await pool.query("select u.username,u.role,m.message,m.id from users u join messages m on u.id = m.user_id;",);
    console.log(rows);
    res.render("message",{
        message:rows || [],
    })
}

exports.addMessageGet = (req,res)=>{
    res.render("addMessages")
}

exports.addMessagePost = async (req,res) =>{
    const {message} = req.body;
    await pool.query("insert into messages (message,user_id) values($1,$2)",[message,req.user.id]);
    res.redirect("/user/messages");
}

exports.deleteController = async (req,res)=>{
    const {id} = req.params;
    await pool.query("delete from messages where id = $1",[id]);
    res.redirect("/user/messages")
}