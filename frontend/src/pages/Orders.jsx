import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  CreditCard,
  Calendar,
  Eye,
  RotateCcw,
  MapPin,
  Phone,
  ArrowRight,
  Star,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  MessageCircle,
  HelpCircle,
  RefreshCw,
  X,
  ExternalLink,
} from "lucide-react";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Shiprocket tracking states
  const [trackingModal, setTrackingModal] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  // Filter options for mobile tabs
  const filterOptions = [
    { key: "all", label: "All", count: 0 },
    { key: "pending", label: "Pending", count: 0 },
    { key: "shipped", label: "Shipped", count: 0 },
    { key: "delivered", label: "Delivered", count: 0 },
  ];

  const loadOrderData = async () => {
    try {
      if (!token) {
        setLoading(false);
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        // Process orders for tech products (no sizes)
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            item["orderId"] = order._id;
            item["amount"] = order.amount;
            item["address"] = order.address;
            // Add tracking info
            item["awbCode"] = order.awbCode;
            item["courierName"] = order.courierName;
            item["trackingUrl"] = order.trackingUrl;
            item["shiprocketOrderId"] = order.shiprocketOrderId;
            item["shiprocketShipmentId"] = order.shiprocketShipmentId;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
        setFilteredOrders(allOrdersItem);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Track shipment
  const trackShipment = async (orderId) => {
    setTrackingLoading(true);
    try {
      const response = await axios.post(
        backendUrl + "/api/order/track",
        { orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setTrackingModal({
          orderId,
          tracking: response.data.tracking,
          awbCode: response.data.awbCode,
          courierName: response.data.courierName,
          trackingUrl: response.data.trackingUrl,
          shiprocketOrderId: response.data.shiprocketOrderId,
          shiprocketShipmentId: response.data.shiprocketShipmentId,
        });
      } else {
        alert(response.data.message || "Tracking info not available");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch tracking information");
    } finally {
      setTrackingLoading(false);
    }
  };

  // Filter orders based on active filter and search
  useEffect(() => {
    let filtered = [...orderData];

    // Apply status filter
    if (activeFilter !== "all") {
      switch (activeFilter) {
        case "pending":
          filtered = filtered.filter(
            (item) =>
              item.status === "Order Placed" || item.status === "Packing"
          );
          break;
        case "shipped":
          filtered = filtered.filter(
            (item) =>
              item.status === "Shipped" || item.status === "Out for delivery"
          );
          break;
        case "delivered":
          filtered = filtered.filter((item) => item.status === "Delivered");
          break;
      }
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.brand &&
            item.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredOrders(filtered);
  }, [orderData, activeFilter, searchTerm]);

  // Update filter counts
  useEffect(() => {
    filterOptions[0].count = orderData.length;
    filterOptions[1].count = orderData.filter(
      (item) => item.status === "Order Placed" || item.status === "Packing"
    ).length;
    filterOptions[2].count = orderData.filter(
      (item) => item.status === "Shipped" || item.status === "Out for delivery"
    ).length;
    filterOptions[3].count = orderData.filter(
      (item) => item.status === "Delivered"
    ).length;
  }, [orderData]);

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const toggleOrderExpansion = (orderId) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const getStatusConfig = (status) => {
    const configs = {
      "Order Placed": {
        color: "bg-red-500",
        icon: Clock,
        bgColor: "bg-red-50",
        textColor: "text-red-700",
        progress: 20,
      },
      Packing: {
        color: "bg-yellow-500",
        icon: Package,
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-700",
        progress: 40,
      },
      Shipped: {
        color: "bg-orange-500",
        icon: Truck,
        bgColor: "bg-orange-50",
        textColor: "text-orange-700",
        progress: 70,
      },
      "Out for delivery": {
        color: "bg-orange-500",
        icon: MapPin,
        bgColor: "bg-orange-50",
        textColor: "text-orange-700",
        progress: 90,
      },
      Delivered: {
        color: "bg-green-500",
        icon: CheckCircle,
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        progress: 100,
      },
    };
    return configs[status] || configs["Order Placed"];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getEstimatedDelivery = (status, orderDate) => {
    if (status === "Delivered") return "Delivered";

    const date = new Date(orderDate);
    const deliveryDate = new Date(date);
    deliveryDate.setDate(date.getDate() + 5); // 5 days from order

    return `by ${deliveryDate.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    })}`;
  };

  // Tracking Modal Component
  const TrackingModal = ({ data, onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Track Order #{data.orderId.slice(-8).toUpperCase()}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Tracking Information */}
            {data.awbCode && (
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-3">
                  Shipping Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">AWB Code:</span>
                    <span className="font-mono font-semibold">
                      {data.awbCode}
                    </span>
                  </div>
                  {data.courierName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Courier:</span>
                      <span className="font-semibold">{data.courierName}</span>
                    </div>
                  )}
                  {data.trackingUrl && (
                    <div className="mt-3">
                      <a
                        href={data.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Track on Courier Website</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tracking Timeline */}
            {data.tracking && data.tracking.tracking_data && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">
                  Shipment Timeline
                </h4>
                <div className="space-y-4">
                  {data.tracking.tracking_data.shipment_track.map(
                    (track, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-3 h-3 rounded-full mt-1 ${
                              index === 0 ? "bg-orange-600" : "bg-gray-300"
                            }`}
                          ></div>
                        </div>
                        <div
                          className={`flex-1 pb-4 ${
                            index !==
                            data.tracking.tracking_data.shipment_track.length -
                              1
                              ? "border-l-2 border-gray-200"
                              : ""
                          } pl-4 -ml-1.5`}
                        >
                          <p className="font-medium text-gray-900">
                            {track.status}
                          </p>
                          <p className="text-sm text-gray-600">{track.date}</p>
                          {track.location && (
                            <p className="text-sm text-gray-500 mt-1">
                              {track.location}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* No Tracking Available */}
            {!data.awbCode && !data.tracking && (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tracking Not Available Yet
                </h3>
                <p className="text-gray-600">
                  Your order is being processed. Tracking information will be
                  available soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (orderData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          {/* Mobile Header */}
          <div className="mb-8">
            <Title text1="MY" text2="ORDERS" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12 text-center">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 lg:w-16 lg:h-16 text-gray-300" />
            </div>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
              No orders yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your
              orders here!
            </p>

            <button
              onClick={() => (window.location.href = "/collection")}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">My Orders</h1>
              <p className="text-sm text-gray-600">
                {filteredOrders.length} orders
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={loadOrderData}
                className="p-2 bg-red-600 text-white rounded-lg"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Filter Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
            {filterOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setActiveFilter(option.key)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeFilter === option.key
                    ? "bg-white text-red-600 shadow-sm"
                    : "text-gray-600"
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block max-w-6xl mx-auto px-4 pt-8">
        <div className="mb-8">
          <Title text1="MY" text2="ORDERS" />
          <p className="text-gray-600 mt-2">
            Track and manage your orders ({filteredOrders.length} items)
          </p>
        </div>

        {/* Desktop Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {filterOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setActiveFilter(option.key)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeFilter === option.key
                      ? "bg-red-100 text-red-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {option.label} ({option.count})
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm w-64"
                />
              </div>
              <button
                onClick={loadOrderData}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 lg:px-0 lg:max-w-6xl lg:mx-auto pb-6 space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          filteredOrders.map((item, index) => {
            const isExpanded = expandedOrders.has(item.orderId + index);
            const statusConfig = getStatusConfig(item.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-lg lg:rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Mobile Order Card */}
                <div className="lg:hidden">
                  <div className="p-4">
                    {/* Order Header */}
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                          src={item.image[0]}
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = "/api/placeholder/64/64";
                          }}
                        />
                        {item.bestseller && (
                          <div className="absolute -mt-14 -ml-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                          {item.name}
                        </h3>

                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-900">
                              {currency}
                              {item.price}
                            </span>
                            <span className="ml-2">× {item.quantity}</span>
                          </div>

                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
                          >
                            <StatusIcon className="w-3 h-3 inline mr-1" />
                            {item.status}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>#{item.orderId?.slice(-8).toUpperCase()}</span>
                          <span>{formatDate(item.date)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {item.status !== "Delivered" && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Order Progress</span>
                          <span>{statusConfig.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${statusConfig.color}`}
                            style={{ width: `${statusConfig.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-2 mb-3">
                      <button
                        onClick={() => trackShipment(item.orderId)}
                        disabled={trackingLoading}
                        className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        {trackingLoading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Loading...</span>
                          </>
                        ) : (
                          <>
                            <RotateCcw className="w-4 h-4" />
                            <span>Track Order</span>
                          </>
                        )}
                      </button>

                      {/* Show tracking info if available */}
                      {item.awbCode && (
                        <div className="text-xs text-gray-600 bg-orange-50 p-2 rounded">
                          <p>
                            <span className="font-medium">AWB:</span>{" "}
                            {item.awbCode}
                          </p>
                          {item.courierName && (
                            <p>
                              <span className="font-medium">Courier:</span>{" "}
                              {item.courierName}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-gray-600">Delivery: </span>
                        <span className="font-medium text-gray-900">
                          {getEstimatedDelivery(item.status, item.date)}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          toggleOrderExpansion(item.orderId + index)
                        }
                        className="flex items-center space-x-1 text-red-600 text-sm font-medium"
                      >
                        <span>{isExpanded ? "Less" : "More"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                        {/* Order Details */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">Payment</p>
                            <div className="flex items-center space-x-2">
                              <span>
                                {item.paymentMethod === "COD" ? "💵" : "💳"}
                              </span>
                              <span className="font-medium">
                                {item.paymentMethod}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  item.payment
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {item.payment ? "Paid" : "Pending"}
                              </span>
                            </div>
                          </div>

                          <div>
                            <p className="text-gray-600 mb-1">Total</p>
                            <p className="font-semibold text-gray-900">
                              {currency}
                              {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Shipping Address */}
                        {item.address && (
                          <div>
                            <p className="text-gray-600 mb-2 text-sm">
                              Shipping Address
                            </p>
                            <div className="bg-gray-50 p-3 rounded-lg text-sm">
                              <p className="font-medium text-gray-900">
                                {item.address.firstName} {item.address.lastName}
                              </p>
                              <p className="text-gray-600">
                                {item.address.city}, {item.address.state}
                              </p>
                              <div className="flex items-center space-x-1 mt-1 text-gray-600">
                                <Phone className="w-3 h-3" />
                                <span>{item.address.phone}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop Order Card */}
                <div className="hidden lg:block p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Product Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 relative">
                          <img
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                            src={item.image[0]}
                            alt={item.name}
                            onError={(e) => {
                              e.target.src = "/api/placeholder/80/80";
                            }}
                          />
                          {item.bestseller && (
                            <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                              ★
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 truncate">
                            {item.name}
                          </h3>
                          {item.brand && (
                            <p className="text-sm text-red-600 mb-2">
                              {item.brand}
                            </p>
                          )}

                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-4">
                              <span className="font-medium text-gray-900">
                                {currency}
                                {item.price}
                              </span>
                              <span>Qty: {item.quantity}</span>
                            </div>
                            {item.warranty && <p>Warranty: {item.warranty}</p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Order ID</p>
                        <p className="text-sm font-mono text-gray-900">
                          #{item.orderId?.slice(-8).toUpperCase()}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(item.date)}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>
                          {item.paymentMethod === "COD" ? "💵" : "💳"}
                        </span>
                        <span>{item.paymentMethod}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.payment
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.payment ? "Paid" : "Pending"}
                        </span>
                      </div>

                      {item.address && (
                        <div className="text-sm text-gray-600">
                          <p className="font-medium">
                            {item.address.firstName} {item.address.lastName}
                          </p>
                          <p>
                            {item.address.city}, {item.address.state}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Phone className="w-3 h-3" />
                            <span>{item.address.phone}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status & Actions */}
                    <div className="flex flex-col justify-between">
                      {/* Status */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">
                          Order Status
                        </p>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${statusConfig.color}`}
                          >
                            <StatusIcon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.status}
                            </p>
                            {item.status === "Delivered" ? (
                              <p className="text-xs text-green-600">
                                Order completed
                              </p>
                            ) : (
                              <p className="text-xs text-gray-500">
                                Est. delivery:{" "}
                                {getEstimatedDelivery(item.status, item.date)}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Show tracking info if available */}
                        {item.awbCode && (
                          <div className="mt-3 text-xs text-gray-600 bg-orange-50 p-3 rounded">
                            <p className="mb-1">
                              <span className="font-medium">AWB:</span>{" "}
                              {item.awbCode}
                            </p>
                            {item.courierName && (
                              <p>
                                <span className="font-medium">Courier:</span>{" "}
                                {item.courierName}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <button
                          onClick={() => trackShipment(item.orderId)}
                          disabled={trackingLoading}
                          className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          {trackingLoading ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Loading...</span>
                            </>
                          ) : (
                            <>
                              <RotateCcw className="w-4 h-4" />
                              <span>Track Order</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary Footer */}
                  <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Total:{" "}
                      <span className="font-semibold text-gray-900">
                        {currency}
                        {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Expected delivery:{" "}
                      {getEstimatedDelivery(item.status, item.date)}
                    </div>
                  </div>

                  {/* Progress Bar for non-delivered orders */}
                  {item.status !== "Delivered" && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>Order Progress</span>
                        <span>{statusConfig.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${statusConfig.color}`}
                          style={{ width: `${statusConfig.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Help Section */}
      <div className="px-4 lg:px-0 lg:max-w-6xl lg:mx-auto pb-6">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 lg:p-8 border border-red-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-red-600" />
            Need Help?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-3 bg-white bg-opacity-50 p-4 rounded-lg">
              <Phone className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium text-gray-900">Call Support</p>
                <p className="text-gray-600">+91-XXXXX-XXXXX</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white bg-opacity-50 p-4 rounded-lg">
              <MessageCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Live Chat</p>
                <p className="text-gray-600">Available 24/7</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white bg-opacity-50 p-4 rounded-lg">
              <Truck className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium text-gray-900">Free Shipping</p>
                <p className="text-gray-600">On orders ₹999+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Modal */}
      {trackingModal && (
        <TrackingModal
          data={trackingModal}
          onClose={() => setTrackingModal(null)}
        />
      )}
    </div>
  );
};

export default Orders;
