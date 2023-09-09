import express from "express";
import { addProduct, deleteProduct, getUpdateProduct, sellerAllProducts, updateProduct } from "../controllers/productControllers.js";

const router = express.Router()

router.post('/addProduct',addProduct)
router.post('/sellerAllProducts',sellerAllProducts)
router.get('/getUpdateProduct/:pId',getUpdateProduct)
router.put('/updateProduct/:pId',updateProduct)
router.post('/deleteProduct',deleteProduct)

export default router;