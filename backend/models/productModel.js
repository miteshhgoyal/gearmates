import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    brand: { type: String, default: "" },
    compatibility: { type: Array, default: [] },
    color: { type: String, default: "" },
    material: { type: String, default: "" },
    warranty: { type: String, default: "6 months" },
    specifications: { type: Array, default: [] },
    bestseller: { type: Boolean, default: false },
    date: { type: Number, required: true },
    updatedAt: { type: Number, default: Date.now },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    views: { type: Number, default: 0 },
    sold: { type: Number, default: 0 }
}, { timestamps: true })

// Index for better search performance
productSchema.index({ name: 'text', description: 'text', brand: 'text' })
productSchema.index({ category: 1, subCategory: 1 })
productSchema.index({ price: 1 })
productSchema.index({ bestseller: 1 })
productSchema.index({ date: -1 })

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel
