import axios from 'axios';

const SHIPROCKET_URL = process.env.SHIPROCKET_URL || 'https://apiv2.shiprocket.in/v1/external';

class ShiprocketService {
    constructor() {
        this.token = null;
        this.tokenExpiry = null;
    }

    async authenticate() {
        try {
            const response = await axios.post(`${SHIPROCKET_URL}/auth/login`, {
                email: process.env.SHIPROCKET_EMAIL,
                password: process.env.SHIPROCKET_PASSWORD
            });

            if (response.data.token) {
                this.token = response.data.token;
                this.tokenExpiry = Date.now() + (9 * 24 * 60 * 60 * 1000);
                return this.token;
            }
        } catch (error) {
            console.error('Shiprocket authentication failed:', error.response?.data || error.message);
            throw error;
        }
    }

    async getToken() {
        if (!this.token || Date.now() >= this.tokenExpiry) {
            await this.authenticate();
        }
        return this.token;
    }

    async createOrder(orderData) {
        try {
            const token = await this.getToken();

            const shiprocketOrder = {
                order_id: orderData.orderId,
                order_date: new Date(orderData.date).toISOString().split('T')[0],
                pickup_location: "Primary",
                billing_customer_name: orderData.address.firstName,
                billing_last_name: orderData.address.lastName,
                billing_address: orderData.address.street,
                billing_city: orderData.address.city,
                billing_pincode: orderData.address.zipcode,
                billing_state: orderData.address.state,
                billing_country: orderData.address.country || "India",
                billing_email: orderData.address.email,
                billing_phone: orderData.address.phone,
                shipping_is_billing: true,
                order_items: orderData.items.map(item => ({
                    name: item.name,
                    sku: item._id || item.name,
                    units: item.quantity,
                    selling_price: item.price
                })),
                payment_method: orderData.paymentMethod === 'COD' ? 'COD' : 'Prepaid',
                sub_total: orderData.amount,
                length: 10,
                breadth: 10,
                height: 10,
                weight: 0.5
            };

            const response = await axios.post(
                `${SHIPROCKET_URL}/orders/create/adhoc`,
                shiprocketOrder,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('Shiprocket order creation failed:', error.response?.data || error.message);
            throw error;
        }
    }

    async trackShipment(shiprocketOrderId) {
        try {
            const token = await this.getToken();

            const response = await axios.get(
                `${SHIPROCKET_URL}/courier/track/shipment/${shiprocketOrderId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('Shiprocket tracking failed:', error.response?.data || error.message);
            throw error;
        }
    }

    async trackByAWB(awbCode) {
        try {
            const token = await this.getToken();

            const response = await axios.get(
                `${SHIPROCKET_URL}/courier/track/awb/${awbCode}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('Shiprocket AWB tracking failed:', error.response?.data || error.message);
            throw error;
        }
    }
}

export default new ShiprocketService();
