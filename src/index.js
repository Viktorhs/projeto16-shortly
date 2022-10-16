import dotenv from 'dotenv';
import express from "express";
import cors from "cors";

import userRouter from "./routes/usersRouters.js"
import urlRouter from "./routes/urlsRouters.js"

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter)
app.use(urlRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}.`);
  });