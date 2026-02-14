
exports.globalVariables = (req,res,next)=>{
    res.locals.user = req.user || null ;
    res.locals.copy = "copyRights"
    next();
}