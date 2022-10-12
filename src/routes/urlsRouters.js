import { Router } from "express";
import * as urls from "../controllers/urlsControllers.js";
import validUser from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/urls/shorten", validUser,urls.shortenUrl)
router.get("/urls/:id", urls.getUrlById)

export default router