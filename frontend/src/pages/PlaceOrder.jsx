import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  Shield,
  CheckCircle,
  Loader2,
  Plus,
  Edit2,
  Trash2,
  Home,
  Building,
  MapPinIcon,
  ArrowLeft,
  MoreVertical,
  Star,
} from "lucide-react";

const AddressModal = ({
  isOpen,
  onClose,
  onSave,
  editingAddress = null,
  userProfile = {},
}) => {
  const [addressData, setAddressData] = useState({
    firstName:
      userProfile.profile?.firstName || userProfile.name?.split(" ")[0] || "",
    lastName:
      userProfile.profile?.lastName || userProfile.name?.split(" ")[1] || "",
    email: userProfile.email || "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "India",
    phone: userProfile.phone || userProfile.profile?.phone || "",
    label: "Home",
    isDefault: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingAddress) {
      setAddressData(editingAddress);
    } else {
      setAddressData({
        firstName:
          userProfile.profile?.firstName ||
          userProfile.name?.split(" ")[0] ||
          "",
        lastName:
          userProfile.profile?.lastName ||
          userProfile.name?.split(" ")[1] ||
          "",
        email: userProfile.email || "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "India",
        phone: userProfile.phone || userProfile.profile?.phone || "",
        label: "Home",
        isDefault: false,
      });
    }
  }, [editingAddress, userProfile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!addressData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!addressData.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!addressData.email.trim()) newErrors.email = "Email is required";
    if (!addressData.street.trim())
      newErrors.street = "Street address is required";
    if (!addressData.city.trim()) newErrors.city = "City is required";
    if (!addressData.state.trim()) newErrors.state = "State is required";
    if (!addressData.zipcode.trim()) newErrors.zipcode = "Pincode is required";
    if (!addressData.phone.trim()) newErrors.phone = "Phone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSave(addressData);
      onClose();
    } catch (error) {
      toast.error("Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 shrink-0">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal Content - Scrollable */}
          <div className="overflow-y-auto flex-1 p-4 lg:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={addressData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={addressData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={addressData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <textarea
                  name="street"
                  value={addressData.street}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none ${
                    errors.street ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter complete address"
                />
                {errors.street && (
                  <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={addressData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={addressData.state}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  name="zipcode"
                  value={addressData.zipcode}
                  onChange={handleChange}
                  maxLength={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.zipcode ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="6-digit pincode"
                />
                {errors.zipcode && (
                  <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={addressData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="10-digit mobile number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Label
                </label>
                <div className="flex space-x-4">
                  {["Home", "Work", "Other"].map((label) => (
                    <label
                      key={label}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="label"
                        value={label}
                        checked={addressData.label === label}
                        onChange={handleChange}
                        className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={addressData.isDefault}
                    onChange={handleChange}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Set as default address
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex space-x-4 p-4 lg:p-6 border-t border-gray-200 bg-gray-50 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {editingAddress ? "Update Address" : "Save Address"}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  // Fetch user profile and addresses
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      setProfileLoading(true);
      try {
        const response = await axios.post(
          backendUrl + "/api/user/profile",
          {},
          { headers: { token } }
        );

        if (response.data.success) {
          setUserProfile(response.data.user);
          setAddresses(response.data.user.addresses || []);

          // Set default address
          const defaultAddress = response.data.user.addresses?.find(
            (addr) => addr.isDefault
          );
          if (defaultAddress) {
            setSelectedAddress(defaultAddress);
          } else if (response.data.user.addresses?.length > 0) {
            setSelectedAddress(response.data.user.addresses[0]);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch user data");
      } finally {
        setProfileLoading(false);
      }
    };

    fetchUserData();
  }, [token, backendUrl]);

  const handleSaveAddress = async (addressData) => {
    try {
      const endpoint = editingAddress
        ? "/api/user/address/update"
        : "/api/user/address/add";

      const payload = editingAddress
        ? { addressId: editingAddress._id, address: addressData }
        : { address: addressData };

      const response = await axios.post(backendUrl + endpoint, payload, {
        headers: { token },
      });

      if (response.data.success) {
        setAddresses(response.data.addresses);
        toast.success(editingAddress ? "Address updated!" : "Address added!");

        // If this is the first address or set as default, select it
        if (response.data.addresses.length === 1 || addressData.isDefault) {
          const newDefault = response.data.addresses.find(
            (addr) => addr.isDefault
          );
          setSelectedAddress(newDefault);
        }

        setEditingAddress(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save address");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    try {
      const response = await axios.post(
        backendUrl + "/api/user/address/delete",
        { addressId },
        { headers: { token } }
      );

      if (response.data.success) {
        setAddresses(response.data.addresses);
        toast.success("Address deleted!");

        // If deleted address was selected, select new default
        if (selectedAddress?._id === addressId) {
          const newDefault = response.data.addresses.find(
            (addr) => addr.isDefault
          );
          setSelectedAddress(newDefault || response.data.addresses[0] || null);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/address/default",
        { addressId },
        { headers: { token } }
      );

      if (response.data.success) {
        setAddresses(response.data.addresses);
        const newDefault = response.data.addresses.find(
          (addr) => addr._id === addressId
        );
        setSelectedAddress(newDefault);
        toast.success("Default address updated!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update default address");
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "GearMates",
      description: "Tech Accessories Order",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            setCartItems({});
            toast.success("Payment successful! Order placed.");
            navigate("/orders");
          }
        } catch (error) {
          console.log(error);
          toast.error("Payment verification failed");
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    setLoading(true);

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = products.find((product) => product._id === itemId);
          if (itemInfo) {
            orderItems.push({
              ...itemInfo,
              quantity: cartItems[itemId],
            });
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        setLoading(false);
        return;
      }

      let orderData = {
        address: selectedAddress,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            toast.success("Order placed successfully!");
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Checkout</h1>
              <p className="text-sm text-gray-600">Complete your order</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block max-w-6xl mx-auto px-4 pt-8">
        <div className="mb-8">
          <Title text1="CHECKOUT" text2="DETAILS" />
          <p className="text-gray-600 mt-2">
            Complete your order by selecting a delivery address
          </p>
        </div>
      </div>

      <form onSubmit={onSubmitHandler} className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Address Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg lg:rounded-xl border border-gray-200 overflow-hidden">
              {/* Address Header */}
              <div className="p-4 lg:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Delivery Address
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAddress(null);
                      setShowAddressModal(true);
                    }}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-800 font-medium text-sm lg:text-base"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add New</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>
              </div>

              {/* Address Content */}
              <div className="p-4 lg:p-6">
                {addresses.length === 0 ? (
                  <div className="text-center py-8 lg:py-12">
                    <MapPinIcon className="w-16 h-16 lg:w-20 lg:h-20 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No addresses found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Add your first delivery address to continue
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAddress(null);
                        setShowAddressModal(true);
                      }}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Add Address
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 lg:space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address._id}
                        className={`border-2 rounded-lg transition-all cursor-pointer ${
                          selectedAddress?._id === address._id
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedAddress(address)}
                      >
                        {/* Mobile Address Layout */}
                        <div className="lg:hidden p-4">
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 mt-1 flex-shrink-0 ${
                                selectedAddress?._id === address._id
                                  ? "border-red-500 bg-red-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedAddress?._id === address._id && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              {/* Header Row */}
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold text-gray-900 text-sm">
                                    {address.firstName} {address.lastName}
                                  </h3>

                                  {/* Label Badge */}
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      address.label === "Home"
                                        ? "bg-green-100 text-green-800"
                                        : address.label === "Work"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {address.label}
                                  </span>

                                  {/* Default Badge */}
                                  {address.isDefault && (
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  )}
                                </div>

                                {/* Action Menu */}
                                <div className="flex items-center space-x-1">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingAddress(address);
                                      setShowAddressModal(true);
                                    }}
                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Edit address"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteAddress(address._id);
                                    }}
                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Delete address"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Address Details */}
                              <div className="text-sm text-gray-600 space-y-1">
                                <p className="line-clamp-2">{address.street}</p>
                                <p>
                                  {address.city}, {address.state} -{" "}
                                  {address.zipcode}
                                </p>
                                <div className="flex items-center space-x-1">
                                  <Phone className="w-3 h-3" />
                                  <span>{address.phone}</span>
                                </div>
                              </div>

                              {/* Set Default Action (if not default) */}
                              {!address.isDefault && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSetDefault(address._id);
                                  }}
                                  className="mt-2 text-xs text-red-600 hover:text-red-800 font-medium"
                                >
                                  Set as default
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Desktop Address Layout */}
                        <div className="hidden lg:block p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div
                                className={`w-4 h-4 rounded-full border-2 mt-1 ${
                                  selectedAddress?._id === address._id
                                    ? "border-red-500 bg-red-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedAddress?._id === address._id && (
                                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="font-medium text-gray-900">
                                    {address.firstName} {address.lastName}
                                  </h3>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      address.label === "Home"
                                        ? "bg-green-100 text-green-800"
                                        : address.label === "Work"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {address.label}
                                  </span>
                                  {address.isDefault && (
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                      Default
                                    </span>
                                  )}
                                </div>

                                <p className="text-gray-600 text-sm mb-1">
                                  {address.street}
                                </p>
                                <p className="text-gray-600 text-sm">
                                  {address.city}, {address.state} -{" "}
                                  {address.zipcode}
                                </p>
                                <p className="text-gray-600 text-sm">
                                  Phone: {address.phone}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-1">
                              {!address.isDefault && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSetDefault(address._id);
                                  }}
                                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                                  title="Set as default"
                                >
                                  <Home className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingAddress(address);
                                  setShowAddressModal(true);
                                }}
                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                title="Edit address"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteAddress(address._id);
                                }}
                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                title="Delete address"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg lg:rounded-xl border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center space-x-2 mb-6">
                <CreditCard className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => setMethod("razorpay")}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    method === "razorpay"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        method === "razorpay"
                          ? "border-red-500 bg-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      {method === "razorpay" && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Online Payment
                        </p>
                        <p className="text-sm text-gray-500">
                          Pay securely with Razorpay
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setMethod("cod")}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    method === "cod"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        method === "cod"
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {method === "cod" && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                        <Truck className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Cash on Delivery
                        </p>
                        <p className="text-sm text-gray-500">
                          Pay when you receive your order
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 lg:p-6 rounded-lg lg:rounded-xl border border-gray-200 lg:sticky lg:top-4">
              <CartTotal />

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Your information is secure and encrypted</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !selectedAddress}
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 lg:py-4 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Place Order</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </form>

      {/* Address Modal */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => {
          setShowAddressModal(false);
          setEditingAddress(null);
        }}
        onSave={handleSaveAddress}
        editingAddress={editingAddress}
        userProfile={userProfile}
      />
    </div>
  );
};

export default PlaceOrder;
