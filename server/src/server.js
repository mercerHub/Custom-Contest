import app from "./app.js";
import dotenv from "dotenv"

import connectDB from "../db/index.js";
const PORT = 8000;

dotenv.config({
    path: './.env'
})
connectDB()
.then(() => {
    app.listen(PORT,() => {
        console.log(`Listening at port ${PORT}`)
    })
})
.catch((err) => {
    console.log("MongoDb connection error !!!", err);
})

