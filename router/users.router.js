import Router from "express"
import { logInHandler, logOutHandler, signUpHandler } from "../controllers/users.controller.js";
const router = Router();

router.get("/signup", (req,res) => {
    return res.render("signup");
})

router.get("/login", (req,res) => {
    return res.render("login");
})

router.post("/signup", signUpHandler);

router.post("/login", logInHandler);

router.get("/logout", logOutHandler);


export default router;