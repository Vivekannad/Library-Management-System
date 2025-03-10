import { validateToken } from "../services/auth.js";

export const authenticateUser = (req,res,next) => {
    const token = req.cookies.token;
    req.user = null;
    if(!token){
      return  next();
    } 
    try{
        const user = validateToken(token);
        req.user = user;
    }catch(err){
        console.log("Invalid token")
    }
    next();
}

export const restrictTo = (roles=[]) => {
return function(req,res,next){
    if(roles.includes(req.user.role)){
       return next();
    }
   return res.sendStatus(401);
}
}