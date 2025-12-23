// services/shiprocketService.js
import axios from 'axios';

const SHIPROCKET_URL =
    process.env.SHIPROCKETURL || 'https://apiv2.shiprocket.in/v1/external';

class ShiprocketService {
    constructor() {
        this.token = null;
        this.tokenExpiry = null;
    }

    // ========== AUTH ==========

    async authenticate() {
        try {
            const res = await axios.post(`${SHIPROCKET_URL}/auth/login`, {
                email: process.env.SHIPROCKETEMAIL,
                password: process.env.SHIPROCKETPASSWORD,
            });

            if (!res.data?.token) {
                throw new Error('No token received from Shiprocket');
            }

            this.token = res.data.token;
            // 24h token → refresh at ~23h
            this.tokenExpiry = Date.now() + 23 * 60 * 60 * 1000;
            return this.token;
        } catch (err) {
            console.error('Shiprocket authentication failed:', err.response?.data || err.message);
            throw err;
        }
    }

    async getToken() {
        if (!this.token || Date.now() >= this.tokenExpiry) {
            await this.authenticate();
        }
        return this.token;
    }

    // ========== ORDER CREATION ==========

    async createOrder(orderData) {
        try {
            const token = await this.getToken();

            const totalWeight = orderData.items.reduce(
                (sum, item) => sum + ((item.weight || 0.5) * (item.quantity || 1)),
                0
            );

            const shiprocketOrder = {
                order_id: orderData.orderId,
                order_date: new Date(orderData.date).toISOString().split('T')[0],
                pickup_location: 'Primary',

                billing_customer_name: orderData.address.firstName,
                billing_last_name: orderData.address.lastName,
                billing_address: orderData.address.street,
                billing_city: orderData.address.city,
                billing_pincode: orderData.address.zipcode,
                billing_state: orderData.address.state,
                billing_country: orderData.address.country || 'India',
                billing_email: orderData.address.email,
                billing_phone: orderData.address.phone,

                shipping_is_billing: true,

                order_items: orderData.items.map((item) => ({
                    name: item.name,
                    sku: item.sku || item.id || item._id || item.name,
                    units: item.quantity,
                    selling_price: item.price,
                    discount: 0,
                    tax: 0,
                })),

                payment_method: orderData.paymentMethod === 'COD' ? 'COD' : 'Prepaid',

                sub_total: orderData.amount,
                length: orderData.dimensions?.length || 10,
                breadth: orderData.dimensions?.breadth || 10,
                height: orderData.dimensions?.height || 10,
                weight: totalWeight || 0.5,
            };

            const res = await axios.post(
                `${SHIPROCKET_URL}/orders/create/adhoc`,
                shiprocketOrder,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data?.status_code === 1 || res.data?.success) {
                const data = res.data.data;
                return {
                    orderId: data?.order_id,
                    shipmentId: data?.shipments?.[0]?.shipment_id,
                };
            }

            throw new Error(res.data?.message || 'Failed to create order in Shiprocket');
        } catch (err) {
            console.error('Shiprocket order creation failed:', err.response?.data || err.message);
            throw err;
        }
    }

    // ========== SERVICEABILITY ==========

    async checkServiceability(pickupPostcode, deliveryPostcode, weight, cod, orderValue) {
        try {
            const token = await this.getToken();

            const res = await axios.get(`${SHIPROCKET_URL}/courier/serviceability/`, {
                params: {
                    pickup_postcode: pickupPostcode,
                    delivery_postcode: deliveryPostcode,
                    weight,
                    cod: cod ? 1 : 0,
                    declared_value: orderValue,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data?.status === 200 || res.data?.success) {
                return res.data.data?.available_courier_companies || [];
            }

            throw new Error(res.data?.message || 'Serviceability check failed');
        } catch (err) {
            console.error('Shiprocket serviceability failed:', err.response?.data || err.message);
            throw err;
        }
    }

    // ========== AWB ASSIGNMENT ==========

    async assignAWB(shipmentId, courierId) {
        try {
            const token = await this.getToken();

            const payload = { shipment_id: shipmentId };
            if (courierId) payload.courier_id = courierId;

            const res = await axios.post(
                `${SHIPROCKET_URL}/courier/assign/awb`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data?.status === 200 || res.data?.status_code === 1 || res.data?.success) {
                const data = res.data?.response?.data || res.data?.data;
                return {
                    awbCode: data?.awb_code,
                    courierName: data?.courier_name,
                    courierId: data?.courier_company_id,
                };
            }

            throw new Error(res.data?.message || 'AWB assignment failed');
        } catch (err) {
            console.error('Shiprocket AWB assignment failed:', err.response?.data || err.message);
            throw err;
        }
    }

    // ========== LABEL GENERATION ==========

    async generateLabel(shipmentIds) {
        try {
            const token = await this.getToken();
            const ids = Array.isArray(shipmentIds) ? shipmentIds : [shipmentIds];

            const res = await axios.post(
                `${SHIPROCKET_URL}/courier/generate/label`,
                { shipment_id: ids },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data?.status === 200 || res.data?.status_code === 1 || res.data?.success) {
                return res.data?.data?.label_url || res.data?.label_url;
            }

            throw new Error(res.data?.message || 'Label generation failed');
        } catch (err) {
            console.error('Shiprocket label generation failed:', err.response?.data || err.message);
            throw err;
        }
    }

    // ========== PICKUP ==========

    async requestPickup(shipmentIds, pickupDate) {
        try {
            const token = await this.getToken();
            const ids = Array.isArray(shipmentIds) ? shipmentIds : [shipmentIds];

            if (!pickupDate) {
                const d = new Date();
                d.setDate(d.getDate() + 1);
                pickupDate = d.toISOString().split('T')[0];
            }

            const res = await axios.post(
                `${SHIPROCKET_URL}/courier/generate/pickup`,
                {
                    shipment_id: ids,
                    pickup_date: pickupDate,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data?.status === 200 || res.data?.status_code === 1 || res.data?.success) {
                return {
                    pickupStatus: res.data?.data?.pickup_status || 'scheduled',
                    pickupDate,
                };
            }

            throw new Error(res.data?.message || 'Pickup scheduling failed');
        } catch (err) {
            console.error('Shiprocket pickup scheduling failed:', err.response?.data || err.message);
            throw err;
        }
    }

    // ========== TRACKING ==========

    async trackShipment(shiprocketOrderId) {
        try {
            const token = await this.getToken();

            const res = await axios.get(
                `${SHIPROCKET_URL}/courier/track/shipment/${shiprocketOrderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data?.status === 200 || res.data?.success) {
                return res.data?.tracking_data || res.data?.data;
            }

            throw new Error('Tracking data not available');
        } catch (err) {
            console.error('Shiprocket tracking by shipment failed:', err.response?.data || err.message);
            return null;
        }
    }

    async trackByAWB(awbCode) {
        try {
            const token = await this.getToken();

            const res = await axios.get(
                `${SHIPROCKET_URL}/courier/track/awb/${awbCode}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data?.status === 200 || res.data?.success) {
                return res.data?.tracking_data || res.data?.data;
            }

            throw new Error('Tracking data not available');
        } catch (err) {
            console.error('Shiprocket tracking by AWB failed:', err.response?.data || err.message);
            return null;
        }
    }
}

export default new ShiprocketService();
