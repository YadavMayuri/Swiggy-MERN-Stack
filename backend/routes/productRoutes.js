import express from "express"
import {  getAllProducts, getByCategory, getSingleProduct } from "../controllers/productControllers.js";

const productRouter = express.Router()

productRouter.get('/getAllProducts',getAllProducts)
productRouter.get('/getSingleProduct/:id',getSingleProduct)
productRouter.get('/getByCategory', getByCategory);



export default productRouter;