import express from "express";
import dotenv from "dotenv";
dotenv.config()
import {initDB} from "./config/db.js"
import ratelimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js"
import job from "./config/cron.js";

const app = express();

if(process.env.NODE_ENV === "production") job.start();

app.use(ratelimiter)
app.use(express.json());

const PORT = process.env.PORT || 5001

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


app.use("/api/transactions",transactionsRoute)

initDB().then(()=>{
    app.listen(PORT,() =>{
    console.log("Working on port:",PORT)
})
})