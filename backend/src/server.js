import express from "express";
import dotenv from "dotenv";
dotenv.config()
import {initDB} from "./config/db.js"
import ratelimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js"

const app = express();

app.use(ratelimiter)
app.use(express.json());

const PORT = process.env.PORT || 5001

app.use("/api/transactions",transactionsRoute)

initDB().then(()=>{
    app.listen(PORT,() =>{
    console.log("Working on port:",PORT)
})
})