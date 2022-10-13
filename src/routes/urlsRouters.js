import { Router } from "express";
import * as urls from "../controllers/urlsControllers.js";
import validUser from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/urls/shorten", validUser,urls.shortenUrl)
router.get("/urls/:id", urls.getUrlById)
router.get("/urls/open/:shortUrl", urls.getUrlByShortUrl)
router.delete("/urls/:id", validUser,urls.deleteUrl)
router.get("/users/me", validUser, urls.listUrlsUser)

export default router