const passport = require('passport');
const pool = require('../db/pool');
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(async(username,password,done)=>{
        try{
            const {rows} = await pool.query("SELECT * FROM users WHERE username = $1;",[username]);
            const user = rows[0];
            if(!user){
                return done(null,false,{message:"incorrect username"});
            }
            if(!user.password == password){
                return done(null,false,{message:"incorrect password"});
            }
            done(null,user);
        }catch(err){
            done(err)
        }
    })
);

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    try {
        const {rows} = await pool.query("SELECT * FROM users WHERE id = $1;",[id]);
        const user = rows[0];
        
        done(null,user);

    } catch (err) {
        done(err)
    }
});

module.exports = passport;