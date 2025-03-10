import Router from "express";
import { BorrowedBooks } from "../model/borrowedBooks.model.js";
const router = Router();

router.get("/:id", async(req,res) => {
    const id = req.params.id;
    await BorrowedBooks.deleteOne({book: id});
    res.redirect("/");
})


export default router;