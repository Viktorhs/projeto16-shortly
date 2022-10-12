import { Router } from "express";
import * as users from "../controllers/usersControllers.js";

const router = Router()

router.post("/signup", users.singUp)

export default router