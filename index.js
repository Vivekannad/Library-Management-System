import express from "express"
import userRouter from "./router/users.router.js";
import bookRouter from "./router/home.router.js";
import borrowRouter from "./router/borrow.router.js";
import addBookRouter from "./router/addBook.router.js";
import returnBookRouter from "./router/returnBook.router.js"
import { connection } from "./db/connection.js";
import cookieParser from "cookie-parser"
import { authenticateUser, restrictTo } from "./middleware/auth.js";
import { config } from "dotenv";
const app = express();

config();

const PORT = process.env.PORT | 5000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cookieParser());
app.use(authenticateUser);

connection();

app.use("/auth", userRouter);
app.use("/borrow", borrowRouter);
app.use("/add", restrictTo(["ADMIN"]) , addBookRouter);
app.use("/return", returnBookRouter);
app.use("/", bookRouter)




app.listen(PORT, () => {
    console.log("server is running on PORT", PORT);
})