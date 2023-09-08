import express from "express"
import { Login, Register, getCurrentUser } from "../controllers/userControllers.js";
import buyerRoutes from "../routes/buyerRoutes.js"
import sellerRoutes from "../routes/sellerRoutes.js"

const userRouter = express.Router()

//user routes
userRouter.post('/register',Register)
userRouter.post('/login',Login)
userRouter.post('/getCurrentUser',getCurrentUser)


//buyer routes 
userRouter.use('/buyer',buyerRoutes)
userRouter.use('/seller',sellerRoutes)

export default userRouter;