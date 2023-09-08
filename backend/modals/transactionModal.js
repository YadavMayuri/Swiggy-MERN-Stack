import mongoose from "mongoose";
import { Schema } from "mongoose";

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users", 
        required: true,
    },
    cartProduct: [{
        type: Schema.Types.ObjectId,
        ref: "Products", 
        required: true,
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    totalProduct: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model("Transactions", transactionSchema)