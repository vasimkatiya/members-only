const pool = require("../db/pool");

exports.indexController = (req,res) =>{
    res.render("index");
}