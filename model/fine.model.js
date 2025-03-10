import {Schema , model} from "mongoose";

const fineSchema = new Schema({
    book : {
        type : Schema.Types.ObjectId,
        ref : "Book"
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    amount : {
        type : Number , 
        required : true
    },
    paid : {
        type : Boolean,
        required : true
    }
})

export const Fine = model("Fine", fineSchema);