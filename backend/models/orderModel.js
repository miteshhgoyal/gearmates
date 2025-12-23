// models/orderModel.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },

        items: { type: Array, required: true },

        amount: { type: Number, required: true },

        address: { type: Object, required: true },

        status: {
            type: String,
            required: true,
            default: 'Order Placed',
            enum: [
                'Order Placed',
                'Packing',
                'Shipped',
                'Out for delivery',
                'Delivered',
                'Canceled',
            ],
        },

        paymentMethod: { type: String, required: true },

        payment: { type: Boolean, required: true, default: false },

        date: { type: Number, required: true },

        // Shiprocket tracking fields
        shiprocketOrderId: { type: Number },
        shiprocketShipmentId: { type: Number },
        awbCode: { type: String },
        courierId: { type: Number },
        courierName: { type: String },
        trackingUrl: { type: String },

        // New: labels & manifests
        labelUrl: { type: String },
        manifestUrl: { type: String },

        // New: pickup info
        pickupScheduled: { type: Boolean, default: false },
        pickupDate: { type: Date },
        pickupStatus: { type: String },

        // New: dimensions used when creating Shiprocket order
        dimensions: {
            length: { type: Number, default: 10 },
            breadth: { type: Number, default: 10 },
            height: { type: Number, default: 10 },
            weight: { type: Number, default: 0.5 },
        },

        // New: store tracking history (for webhooks / manual sync)
        trackingHistory: [
            {
                status: String,
                timestamp: { type: Date, default: Date.now },
                location: String,
                eventDetail: String,
            },
        ],

        // New: internal integration status
        shiprocketStatus: {
            type: String,
            enum: [
                'pending',
                'created',
                'awb_assigned',
                'label_generated',
                'pickup_scheduled',
                'error',
            ],
            default: 'pending',
        },
        shiprocketError: { type: String },
    },
    { timestamps: true }
);

orderSchema.index({ shiprocketOrderId: 1 });
orderSchema.index({ awbCode: 1 });
orderSchema.index({ userId: 1 });

const orderModel =
    mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
