import express from 'express';
import {
    placeOrder,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    verifyRazorpay,
    trackOrder,
    updateTrackingInfo,
    updatePaymentStatus
} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);
orderRouter.post('/update-tracking', adminAuth, updateTrackingInfo);

// Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// User Feature
orderRouter.post('/userorders', authUser, userOrders);
orderRouter.post('/track', authUser, trackOrder);

// verify payment
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

orderRouter.post('/payment-status', adminAuth, updatePaymentStatus);

export default orderRouter;
