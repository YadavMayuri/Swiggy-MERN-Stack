import mongoose from "mongoose";
import { Schema } from "mongoose";


const Product = new Schema({
    name: String,
    price: Number,
    image: String,
    sellerId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }
});

export default mongoose.model("Products", Product)