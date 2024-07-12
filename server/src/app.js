import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

const app = express();

app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.json());


app.use(express.static("public"));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.get("/",(req,res) => {
    res.send("hii");
})


import fetchProblemRoute  from "./routes/fetchProblems.routes.js"
import saveProblemRoute from "./routes/saveFetchedProblems.routes.js"

import userRoute from "./routes/user.routes.js"
import contestRoute from "./routes/contest.routes.js"


app.use("/api/v1",fetchProblemRoute);
app.use("/api/v1",saveProblemRoute);

app.use("/api/v1/user",userRoute);
app.use("/api/v1/contest",contestRoute);

export default app;