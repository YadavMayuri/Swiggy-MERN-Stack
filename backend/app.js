console.log("working");

import express from "express"
import morgan from "morgan"
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import mongoose from "mongoose";
import cors from "cors"
import productRouter from "./routes/productRoutes.js";
dotenv.config()

const app = express()

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/api', userRouter)
app.use('/api', productRouter)



mongoose.connect(`${process.env.MongoDB_URL}`)
    .then(() => console.log("DB Connected successfully"))
    .catch((err) => console.log("DB error =>", err))

const Port = 8000;

app.listen(`${Port}`, () => console.log(`Working on port ${Port}`))