import {Schema , model} from "mongoose";


const authorSchema = new Schema({
    name : {
        type : String ,
        required : true,
        unique: true,
        trim:true
    }
})

export const Author = model("Author", authorSchema);