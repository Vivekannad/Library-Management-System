import {Schema , model} from "mongoose";

const userSchema = new Schema({
    name : {
        type : String , 
        required : true
    },
    email : {
        type : String , 
        required : true,
        lowercase : true,
        unique : true
    },
    password : {
        type : String , 
        required : true
    },
    role : {
        type : String , 
        enum : ["MEMBER", "ADMIN"],
        default : "MEMBER"
    }
},{timestamps : true});

export const User = model("User", userSchema);
