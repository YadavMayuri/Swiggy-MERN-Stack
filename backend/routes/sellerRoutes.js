import express from "express";
import { addProduct, sellerAllProducts } from "../controllers/productControllers.js";

const router = express.Router()

router.post('/addProduct',addProduct)
router.post('/sellerAllProducts',sellerAllProducts)


export default router;