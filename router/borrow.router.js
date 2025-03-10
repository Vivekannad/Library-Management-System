import Router from "express"
import { Book } from "../model/book.model.js";
import { Author } from "../model/author.model.js";
import { Category } from "../model/category.model.js";
import { BorrowedBooks } from "../model/borrowedBooks.model.js";
const router = Router();

router.get("/:id", async(req,res) => {
    const id = req.params.id;
    const user = req.user;
    const isBook = Book.find({_id:id});
    if(!isBook){
        return res.redirect("/");
    }
    await BorrowedBooks.create({
        book : id,
        user : user._id,
        borrowDate : Date.now(),
        dueDate: Date.now() + 1 * 24 * 60 * 60 * 1000
    })
    res.redirect("/");
})



export default router;