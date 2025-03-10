import {Schema , model} from "mongoose";

const boorowedBooksSchema = new Schema({
    book : {
        type : Schema.Types.ObjectId,
        ref : "Book",
        unique : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    borrowDate : {
        type : Number,
        required : true
    },
    dueDate : {
        type : Number,
        required : true
    },
    returnDate : {
        type : Number
    }
})

export const BorrowedBooks = model("BorrowedBooks", boorowedBooksSchema);