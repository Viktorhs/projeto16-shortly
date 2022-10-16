import { Router } from "express";
import * as users from "../controllers/usersControllers.js";

const router = Router()

router.post("/signup", users.signUp)
router.post("/signin", users.signIn)

export default router