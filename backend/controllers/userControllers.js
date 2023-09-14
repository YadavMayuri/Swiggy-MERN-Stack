import Users from "../modals/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
import Transactions from "../modals/transactionModal.js";
import Products from "../modals/productModal.js"


export const Register = async (req, res) => {
    try {
        const { name, email, password,confirmPassword,role } = req.body;
        if (!name) return  res.status(400).json({message:"Name is required!"})
        if (!email) return  res.status(400).json({message:"Email is required!"})
        if (!password) return  res.status(400).json({message:"Password is required!"})
        if (!confirmPassword) return  res.status(400).json({message:"Confirm password is required!"})
        if (!role) return  res.status(400).json({message:"Role is required!"})
        if (password.length < 5 || confirmPassword.length < 5) return res.status(400).json({message:"Password length should be greater than 5."}) 
        if (password !== confirmPassword)  return res.status(400).json({message:"Passsword and confirm password not matched."})
        
        const existingUser = await Users.findOne({ email }).exec();
        if (existingUser) return res.status(400).json({ message: "Email already exist. Login insted." })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new Users({
            name, email, password: hashedPassword, role
        })
        console.log("user", user);
        await user.save();
        return res.status(201).json({ success: "Registration successful." })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error. - controller" })
    }
}


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Please fill all the fields!" })
        const response = await Users.findOne({ email }).exec();

        if (!response) return res.status(400).json({ message: "User not found" })
        const comparePassword = await bcrypt.compare(password, response.password);
        console.log(response,"resp from login");
        if (!comparePassword) return res.status(400).json({ message: "Credientials not matched!" })

        const userObj = { userId: response._id, name: response.name, email: response.email, role:response.role }
        console.log(userObj,"userObj");
        const token = jwt.sign({ userId: response._id }, process.env.SwiggyJwtToken)
        console.log(userObj,"userobj from login controller");

        console.log("jwt token", process.env.SwiggyJwtToken);

        return res.status(200).json({ success: "Login successful!", user: userObj, token: token })

    } catch (err) {
        return res.status(500).json({ message: "Internal server error!" })
    }
}



export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) return res.status(400).json({ success: false, message: "Token is required." })

        const decodedtoken = jwt.verify(token, process.env.SwiggyJwtToken)
        if (!decodedtoken) return res.status(404).json({ success: false, message: "Invalid token." })

        const userId = decodedtoken.userId;

        const user = await Users.findById(userId);
        // console.log(user, "user here");
        if (user) {
            const userobj = { userId: user._id, name: user.name, email: user.email,role:user.role }
            // console.log(userobj,"user obj from current user controller");
            return res.status(200).json({ success: true, user: userobj })

        } else {
            return res.status(404).json({ success: false, message: "User not found." })
        }

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error." })
    }
}



export const addCart = async (req, res) => {
    try {
        const { pId, userId } = req.body
        if (!pId) return res.json({ error: "Product id is required!" })
        if (!userId) return res.json({ error: "User id is required!" })
        console.log(pId, userId, "pid,currentUser");

        // Check if the product is already in the user's cart
        const cUser = await Users.findOne({ _id: userId }).exec();
        const existingProduct = cUser.cartProduct.includes(pId);
        console.log(existingProduct, "existingProduct");
        if (existingProduct) return res.json({ error: "Product already in cart!" });

        const user = await Users.findOneAndUpdate({ _id: userId }, { $push: { cartProduct: pId } }, { new: true }).exec();
        if (!user) return res.json({ error: "User not found!" });
        
        const cartProducts = user.cartProduct

        const discount = 0;
        let subTotal = 0;
        for (const y of cartProducts) {
            subTotal = subTotal + y.price
        }
        let totalPrice = subTotal - discount;
        console.log(totalPrice, "total price here");

        const totalProducts = cartProducts.length
        console.log(totalProducts, "total products here");

        const cartObj = { cartProducts, totalProducts }
        return res.json({ success: true, message: "product added to cart!",cart: cartObj });

    } catch (err) {
        console.log(err);
        return res.json({ error: "Internal server error!" })
    }
}


export const getCartProducts = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: "User is required!" })

        const user = await Users.findById(userId).populate('cartProduct')
        if (!user) return res.status(404).json({ message: "User not found!" })

        const cartProducts = user.cartProduct
        console.log(cartProducts, "cart pro from getcart pro cont");

        const discount = 0;
        let subTotal = 0;
        for (const y of cartProducts) {
            subTotal = subTotal + y.price
        }
        let totalPrice = subTotal - discount;
        console.log(totalPrice, "total price here");

        const totalProducts = cartProducts.length
        console.log(totalProducts, "total products here");

        const cartObj = { cartProducts, totalProducts }
        console.log(cartObj,"cartobject here from getcpro contr");
        return res.status(200).json({ success: true, cartProducts, totalPrice, totalProducts, subTotal, cart: cartObj })


    } catch (err) {
        return res.status(500).json({ message: "Internal server error!" })
    }
}


export const removeproduct = async (req, res) => {
    try {
        const { userId, pId } = req.body;

        if (!userId || !pId) {
            return res.status(400).json({ message: "User ID and Product ID are required!" });
        }

        const user = await Users.findByIdAndUpdate(userId, { $pull: { cartProduct: pId } }, { new: true }).populate('cartProduct').exec();

        if (!user) {
            return res.status(404).json({ success: false, message: "Error while removing product from cart!" });
        }

        const cartProducts = user.cartProduct
        console.log(cartProducts, "cart pro from getcart pro cont");

        const discount = 0;
        let subTotal = 0;
        for (const y of cartProducts) {
            subTotal = subTotal + y.price
        }
        let totalPrice = subTotal - discount;
        console.log(totalPrice, "total price here");

        const totalProducts = cartProducts.length
        console.log(totalProducts, "total products here");

        const cartObj = { cartProducts, totalProducts }
        console.log(cartObj,"cartobject here from remove contr");

        return res.status(200).json({ success: true, message: "Product removed from cart!", cartProducts, totalPrice, totalProducts, subTotal, cart: cartObj });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error!" });
    }
};


export const buyNow = async (req, res) => {
    try {
        const { userId, cartProduct, totalPrice, totalProduct } = req.body;
        if (!userId) return res.json({ error: "User id is required!" });
        console.log(userId, cartProduct, totalPrice, totalProduct, " userId, cart,totalPrice, totalProducts");

        const user = await Users.findById(userId).populate().exec();
        if (!user) return res.json({ error: "User not found!" });

        const addToTransaction = new Transactions({
            userId: user._id,
            cartProduct,
            totalPrice,
            totalProduct,
        });
        await addToTransaction.save();
        console.log(addToTransaction, "addToTransactions");

        const updateCart = await Users.findOneAndUpdate({ _id: userId }, { cartProduct: [] }, { new: true }).exec();
        console.log(updateCart, "updateUserrr");

        const finalCart = updateCart.cartProduct
        const totalProducts = finalCart.length;
        const cartObj = { allCartproducts: finalCart, totalProducts }
        console.log(cartObj,"cartobject here from buynow contr");

        return res.json({ success: true, finalCart, cart: cartObj })

    } catch (err) {
        console.log(err);
        return res.json({ error: "Internal server error!" })
    }
}


export const getOrderHistory = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.json({ error: "User id is required!" });

        const orders = await Transactions.find({ userId }).populate('cartProduct').exec();
        console.log(orders, "orders");
        if (!orders) return res.json({ error: "You have not placed any orders yet!" });

        // create an arrray to store the order history
        const orderHistory = [];

        for (const order of orders) {
            // extraact the product IDs from the cart for this order
            const productIds = order.cartProduct.map(item => item._id);

            //   find the cart products for this order
            const cartProducts = await Products.find({ _id: { $in: productIds } }).exec();

            // add this  order to the order hiistory
            orderHistory.push({
                orderDetails: order,
                cartProduct: cartProducts,
            });
        }

        return res.json({ success: true, orderHistory });

    } catch (err) {
        console.log(err);
        return res.json({ error: "Internal server error!" })
    }
}