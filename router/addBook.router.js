import Router from "express"
import { Book } from "../model/book.model.js";
import { Author } from "../model/author.model.js";
import { Category } from "../model/category.model.js";
const router = Router();

router.get("/", (req,res) => {
    if(!req.user) return res.redirect("/auth/login");
    return res.render("addBook");
})

router.post("/",   async(req,res) => {
    const {title , category , author , date} = req.body;
    if(!title || !category || !author ||!date){
        return res.redirect("/add");
    }
    try{
        let authorDoc = await Author.findOne({name:author});
        if(authorDoc.length <= 0){
            authorDoc = await Author.create({
                name : author
            });
        }
        let categoryDoc = await Category.findOne({category:category});
        console.log(authorDoc)
        if(categoryDoc <= 0){
            categoryDoc = await Category.create({
                category : category
            });
        }
        console.log(categoryDoc)
        await Book.create({
            title : title , 
            category : categoryDoc._id, 
            author : authorDoc._id,
            publishedOn : date
        })
        return res.redirect("/");
    }catch(err){
        console.log("Error detected:- ", err.message);
        res.status(500).send("Internal Server Error!!");
    }
})

export default router;