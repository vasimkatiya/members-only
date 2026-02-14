exports.isAuth = (req,res,next)=>{
    if(req.isAuthenticated()) return next();
    return res.status(401).render("error",{
        error:"please login for continue."
    })
}

exports.isAdmin = (req,res,next)=>{
    if(req.isAuthenticated() && req.user.role == "admin") return next();
    
    return res.status(403).render("error",{
        error:"only admin can see this page."
    })

}