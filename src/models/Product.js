import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, maxLength: 20 },
    desc: { type: String, required: true, maxLength: 200 },
    img: { type: String, required: true },
    price: { type: [Number], required: true },
    extraOptions: {
        type: [{
            text: { type: String, required: true },
            price: { type: Number, required: true }
        }]
    }
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model("Product", ProductSchema)