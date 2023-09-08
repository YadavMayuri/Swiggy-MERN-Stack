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
app.use('/api',userRouter)
app.use('/api',productRouter)



mongoose.connect("mongodb+srv://mayuriyadav54:HGU1ZbJCNcqlTu0z@cluster0.s9gcceb.mongodb.net/Swiggy-MERN_DB")
.then(()=>console.log("DB Connected successfully"))
.catch((err)=>console.log("DB error =>",err))

const Port = process.env.PORT ;

// app.listen(Port,()=>console.log(`Server listining on Port ${Port}`))
app.listen(3000,()=>console.log("working on port 3000"))