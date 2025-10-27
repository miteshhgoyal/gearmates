import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay';
import shiprocketService from '../service/shiprocketService.js';

const currency = 'inr';

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Helper function
const createShiprocketOrder = async (order) => {
    try {
        const shiprocketResponse = await shiprocketService.createOrder({
            orderId: order._id.toString(),
            items: order.items,
            address: order.address,
            amount: order.amount,
            date: order.date,
            paymentMethod: order.paymentMethod
        });

        if (shiprocketResponse.order_id) {
            order.shiprocketOrderId = shiprocketResponse.order_id;
            order.shiprocketShipmentId = shiprocketResponse.shipment_id;
            await order.save();
        }

        return shiprocketResponse;
    } catch (error) {
        console.error('Shiprocket integration failed:', error);
        return null;
    }
};

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await createShiprocketOrder(newOrder);

        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        };

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error });
            }
            res.json({ success: true, order });
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            const order = await orderModel.findByIdAndUpdate(
                orderInfo.receipt,
                { payment: true },
                { new: true }
            );

            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            await createShiprocketOrder(order);

            res.json({ success: true, message: "Payment Successful" });
        } else {
            res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const trackOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.json({ success: false, message: 'Order not found' });
        }

        if (!order.shiprocketOrderId && !order.awbCode) {
            return res.json({
                success: false,
                message: 'Tracking not available yet. Order is being processed.'
            });
        }

        let trackingData = null;

        if (order.shiprocketOrderId) {
            try {
                trackingData = await shiprocketService.trackShipment(order.shiprocketOrderId);
            } catch (error) {
                console.error('Tracking by order ID failed:', error);
            }
        }

        if (!trackingData && order.awbCode) {
            try {
                trackingData = await shiprocketService.trackByAWB(order.awbCode);
            } catch (error) {
                console.error('Tracking by AWB failed:', error);
            }
        }

        res.json({
            success: true,
            tracking: trackingData,
            awbCode: order.awbCode,
            courierName: order.courierName,
            trackingUrl: order.trackingUrl,
            shiprocketOrderId: order.shiprocketOrderId,
            shiprocketShipmentId: order.shiprocketShipmentId
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateTrackingInfo = async (req, res) => {
    try {
        const { orderId, awbCode, courierName, trackingUrl, shiprocketOrderId, shiprocketShipmentId } = req.body;

        const updateData = {};
        if (awbCode) updateData.awbCode = awbCode;
        if (courierName) updateData.courierName = courierName;
        if (trackingUrl) updateData.trackingUrl = trackingUrl;
        if (shiprocketOrderId) updateData.shiprocketOrderId = shiprocketOrderId;
        if (shiprocketShipmentId) updateData.shiprocketShipmentId = shiprocketShipmentId;

        await orderModel.findByIdAndUpdate(orderId, updateData);
        res.json({ success: true, message: 'Tracking info updated successfully' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId, payment } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { payment });
        res.json({ success: true, message: 'Payment status updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    verifyRazorpay,
    placeOrder,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    trackOrder,
    updateTrackingInfo,
    updatePaymentStatus 
};
