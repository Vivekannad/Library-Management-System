import Router from "express"
const router = Router();
import { Book } from "../model/book.model.js";
import { Author } from "../model/author.model.js";
import { Category } from "../model/category.model.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/my-uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

router.get("/", (req,res) => {
    if(!req.user) return res.redirect("/auth/login");
    return res.render("addBook");
})

router.post("/",upload.single("file") ,   async(req,res) => {
    const {title , category , author , date, file} = req.body;
    if(!title || !category || !author ||!date || !file ){
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
        if(categoryDoc <= 0){
            categoryDoc = await Category.create({
                category : category
            });
        }
        await Book.create({
            title : title , 
            category : categoryDoc._id, 
            author : authorDoc._id,
            publishedOn : date,
            image : `/my-uploads/${req.file.filename}`
        })
        return res.redirect("/");
    }catch(err){
        console.log("Error detected:- ", err.message);
        res.status(500).send("Internal Server Error!!");
    }
})

export default router;