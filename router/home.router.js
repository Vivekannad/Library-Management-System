import Router from "express"
import { Book } from "../model/book.model.js";
import { BorrowedBooks } from "../model/borrowedBooks.model.js";
import { Fine } from "../model/fine.model.js";
const router = Router();

router.get("/", async (req, res) => {
    if (!req.user) return res.redirect("/auth/login");

    try {
        const { filter } = req.query; // Get the filter from query parameters

        // Fetch books and borrowed books data
        let books = await Book.find()
            .populate("author", "name")
            .populate("category", "category")
            .lean();
            
            const borrowedBooks = await BorrowedBooks.find({user:req.user._id}).lean();
        const borrowedBooksId = new Set(borrowedBooks.map(b => b.book.toString()));

        // Apply filtering logic
        if (filter === "borrowedBooks") {
            books = books.filter(b => borrowedBooksId.has(b._id.toString()));
        } else if (filter === "availableBooks") {
            books = books.filter(b => !borrowedBooksId.has(b._id.toString()));
        }

        res.render("home", { books, borrowedBooksId, selectedFilter: filter || "allBooks" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});




const calculateFine = (dueDate, returnDate) => {
    const finePerDay = 10; // Example fine rate
    const daysLate = Math.max(0, Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24))); 
    return daysLate * finePerDay;
};

router.get("/book/:id", async(req,res) => {
    const id = req.params.id;
    const book = await Book.findById(id).populate("author").populate("category").lean();
    const borrowedBook = await BorrowedBooks.findOne({book: id, user: req.user._id});
    let fine = 0;
    if(borrowedBook){
        const returnDate = Date.now();
        if(borrowedBook.dueDate <  returnDate){
             fine = calculateFine(borrowedBook.dueDate , returnDate);
            Fine.create({
                book: book._id,
                user : req.user._id,
                amount: fine,
                paid: false
            })
        }
        // return res.render("book",{book,borrowedBook,fine:fine})
    }
    res.render("book", {
        book,
        borrowedBook,
        fine:fine
    })
})

export default router;