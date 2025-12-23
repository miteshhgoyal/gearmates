// controllers/orderController.js
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import razorpay from 'razorpay';
import shiprocketService from '../service/shiprocketService.js';

const currency = 'inr';

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAYKEYID,
    key_secret: process.env.RAZORPAYKEYSECRET,
});

// ========== INTERNAL HELPER: FULL SHIPROCKET FLOW ==========

const processShiprocketOrder = async (order) => {
    try {
        // 1) Create order in Shiprocket
        const srOrder = await shiprocketService.createOrder({
            orderId: order.id.toString(),
            items: order.items,
            address: order.address,
            amount: order.amount,
            date: order.date,
            paymentMethod: order.paymentMethod,
            dimensions: order.dimensions,
        });

        order.shiprocketOrderId = srOrder.orderId;
        order.shiprocketShipmentId = srOrder.shipmentId;
        order.shiprocketStatus = 'created';
        await order.save();

        // 2) Check serviceability
        const totalWeight = order.items.reduce(
            (sum, item) => sum + ((item.weight || 0.5) * (item.quantity || 1)),
            0
        );

        const pickupPincode =
            process.env.SHIPROCKET_WAREHOUSE_PINCODE || '110001';

        const courierOptions = await shiprocketService.checkServiceability(
            pickupPincode,
            order.address.zipcode,
            totalWeight || 0.5,
            order.paymentMethod === 'COD',
            order.amount
        );

        if (!courierOptions.length) {
            throw new Error('No courier service available for this address');
        }

        const selectedCourier = courierOptions[0]; // simplest: first / cheapest

        // 3) Assign AWB
        const awbData = await shiprocketService.assignAWB(
            order.shiprocketShipmentId,
            selectedCourier.courier_company_id
        );

        order.awbCode = awbData.awbCode;
        order.courierId = awbData.courierId;
        order.courierName = awbData.courierName;
        order.shiprocketStatus = 'awb_assigned';
        await order.save();

        // Optionally set a generic tracking URL if needed
        order.trackingUrl =
            order.trackingUrl ||
            `https://shiprocket.co/tracking/${encodeURIComponent(order.awbCode)}`;

        // 4) Generate label
        const labelUrl = await shiprocketService.generateLabel(
            order.shiprocketShipmentId
        );
        order.labelUrl = labelUrl;
        order.shiprocketStatus = 'label_generated';
        await order.save();

        // 5) Schedule pickup (tomorrow)
        const pickupRes = await shiprocketService.requestPickup(
            order.shiprocketShipmentId
        );
        order.pickupScheduled = true;
        order.pickupDate = new Date(pickupRes.pickupDate);
        order.pickupStatus = pickupRes.pickupStatus;
        order.shiprocketStatus = 'pickup_scheduled';
        order.status = 'Shipped';
        await order.save();

        return {
            awbCode: order.awbCode,
            courierName: order.courierName,
            labelUrl: order.labelUrl,
            trackingUrl: order.trackingUrl,
        };
    } catch (err) {
        console.error('Shiprocket full-flow error:', err.message);
        order.shiprocketStatus = 'error';
        order.shiprocketError = err.message;
        await order.save();
        // Do not throw further in placeOrder; it would still keep base order
        throw err;
    }
};

// ========== ORDER PLACEMENT (COD) ==========

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const totalWeight = items.reduce(
            (sum, item) => sum + ((item.weight || 0.5) * (item.quantity || 1)),
            0
        );

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now(),
            dimensions: {
                length: 10,
                breadth: 10,
                height: 10,
                weight: totalWeight || 0.5,
            },
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // run Shiprocket integration in same request; you can move to background if needed
        try {
            await processShiprocketOrder(newOrder);
        } catch {
            // keep order; Shiprocket failure info stored in shiprocketError
        }

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({
            success: true,
            message: 'Order Placed',
            orderId: newOrder.id,
            awbCode: newOrder.awbCode || null,
        });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};

// ========== ORDER PLACEMENT (RAZORPAY) ==========

const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const totalWeight = items.reduce(
            (sum, item) => sum + ((item.weight || 0.5) * (item.quantity || 1)),
            0
        );

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now(),
            dimensions: {
                length: 10,
                breadth: 10,
                height: 10,
                weight: totalWeight || 0.5,
            },
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder.id.toString(),
        };

        const order = await razorpayInstance.orders.create(options);

        res.json({ success: true, order });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};

// ========== VERIFY RAZORPAY PAYMENT ==========

const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpayorderid } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpayorderid);

        if (orderInfo.status === 'paid') {
            const order = await orderModel.findByIdAndUpdate(
                orderInfo.receipt,
                { payment: true },
                { new: true }
            );

            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            try {
                await processShiprocketOrder(order);
            } catch {
                // error stored in shiprocket fields
            }

            res.json({ success: true, message: 'Payment Successful' });
        } else {
            res.json({ success: false, message: 'Payment Failed' });
        }
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};

// ========== LISTING ==========

const allOrders = async (_req, res) => {
    try {
        const orders = await orderModel.find();
        res.json({ success: true, orders });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};

// ========== STATUS UPDATES ==========

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId, payment } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { payment });
        res.json({ success: true, message: 'Payment status updated' });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};

// ========== TRACKING ==========

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
                message: 'Tracking not available yet. Order is being processed.',
            });
        }

        let tracking = null;

        if (order.shiprocketShipmentId) {
            tracking = await shiprocketService.trackShipment(order.shiprocketShipmentId);
        }

        if (!tracking && order.awbCode) {
            tracking = await shiprocketService.trackByAWB(order.awbCode);
        }

        res.json({
            success: true,
            tracking,
            awbCode: order.awbCode,
            courierName: order.courierName,
            trackingUrl: order.trackingUrl,
            shiprocketOrderId: order.shiprocketOrderId,
            shiprocketShipmentId: order.shiprocketShipmentId,
            trackingHistory: order.trackingHistory,
        });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};

// ========== MANUAL TRACKING INFO UPDATE (ADMIN UI) ==========

const updateTrackingInfo = async (req, res) => {
    try {
        const {
            orderId,
            awbCode,
            courierName,
            trackingUrl,
            shiprocketOrderId,
            shiprocketShipmentId,
        } = req.body;

        const updateData = {};
        if (awbCode) updateData.awbCode = awbCode;
        if (courierName) updateData.courierName = courierName;
        if (trackingUrl) updateData.trackingUrl = trackingUrl;
        if (shiprocketOrderId) updateData.shiprocketOrderId = shiprocketOrderId;
        if (shiprocketShipmentId) updateData.shiprocketShipmentId = shiprocketShipmentId;

        await orderModel.findByIdAndUpdate(orderId, updateData);

        res.json({ success: true, message: 'Tracking info updated successfully' });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
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
    updatePaymentStatus,
};
