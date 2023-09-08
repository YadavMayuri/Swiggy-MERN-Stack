import express from "express"
import {  getAllProducts, getSingleProduct } from "../controllers/productControllers.js";

const productRouter = express.Router()

productRouter.get('/getAllProducts',getAllProducts)
productRouter.get('/getSingleProduct/:id',getSingleProduct)



export default productRouter;