const pool = require("./pool");

exports.getMessages = async () =>{
    const {messages} = await pool.query("SELECT * FROM messages;");
    return messages.rows;
}

exports.getUser = async (id)=>{
    const {rows} = await pool.query("SELECT * FROM users WHERE id = $1;",[id]);
    return rows;
}