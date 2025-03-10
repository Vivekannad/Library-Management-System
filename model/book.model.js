import {Schema , model} from "mongoose";

const bookSchema = new Schema({
    title : {
        type : String ,
        required : true
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : "Category",
        required : true
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : "Author",
        required : true
    },
    publishedOn : {
        type : Date , 
        required : true
    }
})

export const Book = new model("Book", bookSchema);