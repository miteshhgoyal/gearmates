// routes/orderRoutes.js (example)
import express from 'express';
import {
    verifyRazorpay,
    placeOrder,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    trackOrder,
    updateTrackingInfo,
    updatePaymentStatus,
} from '../controllers/orderController.js';
import userAuth from '../middleware/auth.js';

const router = express.Router();

// user
router.post('/place', userAuth, placeOrder);
router.post('/razorpay', userAuth, placeOrderRazorpay);
router.post('/verify-razorpay', userAuth, verifyRazorpay);
router.post('/userorders', userAuth, userOrders);
router.post('/track', userAuth, trackOrder);

// admin
router.post('/list', userAuth, allOrders);           // you already call api/order/list in admin
router.post('/status', userAuth, updateStatus);
router.post('/payment-status', userAuth, updatePaymentStatus);
router.post('/update-tracking', userAuth, updateTrackingInfo);

export default router;
