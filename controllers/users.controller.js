import { User } from "../model/user.model.js";
import { generateToken } from "../services/auth.js";

const signUpHandler = async(req,res) => {
    const {name , email , password} = req.body;
    if(!name || !email || !password){
        console.log("Something is wrong");
        return res.render("signup", {
            error : "All fields needs to be filled"
        })
    }
    try{
        const user = await User.findOne({email : email});
        if(user) return res.render("signup", {
            error : "User already registered"
        });
        await User.create({
            name : name , 
            email : email , 
            password : password
        })
        return res.redirect("/auth/login");
    }catch(err){
        console.log("something is wrong", err.message);
    }
}

const logInHandler = async(req,res) => {
    const { email , password} = req.body;
    if( !email || !password){
        console.log("Something is wrong");
        return res.render("login", {
            error : "All fields needs to be filled"
        })
    }
    try{
        const user = await User.findOne({email : email , password : password});
        if(!user) return res.render("login", {
            error : "User not Found!"
        });
       const token = generateToken(user);
        res.cookie("token", token);
        return res.redirect("/");
    }catch(err){
        console.log("something is wrong", err.message);
        return;
    }
}

const logOutHandler = (req,res) => {
res.clearCookie('token');
res.redirect("/auth/login");
}


export {
    signUpHandler , 
    logInHandler,
    logOutHandler
}