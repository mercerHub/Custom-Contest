import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.json());


app.use(express.static("public"));
app.use(cookieParser());

app.use(cors());
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