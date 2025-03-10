import jwt from "jsonwebtoken"
import {  configDotenv } from "dotenv";
configDotenv();

export const generateToken = (user) => {
  const token =  jwt.sign(
    {name : user.name ,
    email : user.email ,
     role : user.role,
     _id: user._id
    } , process.env.SECRET_KEY);
  return token;
}

export const validateToken = (token) => {
    if(!token) return null;
    const validToken = jwt.verify(token , process.env.SECRET_KEY);
    return validToken;
}