import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Package,
  ShoppingCart,
} from "lucide-react";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId],
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const handleQuantityChange = (itemId, action) => {
    const currentQuantity = cartItems[itemId] || 0;
    if (action === "increase") {
      updateQuantity(itemId, currentQuantity + 1);
    } else if (action === "decrease" && currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  const handleRemoveItem = (itemId) => {
    updateQuantity(itemId, 0);
  };

  const getTotalItems = () => {
    return cartData.reduce((total, item) => total + item.quantity, 0);
  };

  if (cartData.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Title text1="YOUR" text2="CART" />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-16 h-16 text-gray-300" />
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Your cart is empty
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any tech accessories yet. Start
            exploring our collection!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/collection")}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Package className="w-5 h-5" />
              <span>Start Shopping</span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Title text1="SHOPPING" text2="CART" />
        <p className="text-gray-600 mt-2">
          Review your items and proceed to checkout when ready
        </p>
      </div>

      {/* Side-by-Side Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
            {/* Cart Items Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Cart Items
                </h2>
              </div>
              <span className="text-sm text-gray-500">
                {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4 lg:space-y-6">
              {cartData.map((item, index) => {
                const productData = products.find(
                  (product) => product._id === item._id
                );

                if (!productData) return null;

                return (
                  <div key={item._id}>
                    {/* Mobile Layout */}
                    <div className="block lg:hidden">
                      <div className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                        {/* Product Image */}
                        <div className="flex-shrink-0 relative">
                          <img
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                            src={productData.image[0]}
                            alt={productData.name}
                            onError={(e) => {
                              e.target.src = "/api/placeholder/80/80";
                            }}
                          />
                          {productData.bestseller && (
                            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                              ★
                            </span>
                          )}
                        </div>

                        {/* Product Info and Controls */}
                        <div className="flex-1 min-w-0">
                          {/* Product Details */}
                          <div className="mb-3">
                            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                              {productData.name}
                            </h3>
                            {productData.brand && (
                              <p className="text-xs text-red-600 mb-1">
                                {productData.brand}
                              </p>
                            )}

                            {/* Additional Info */}
                            <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                              {productData.color && (
                                <span className="bg-gray-100 px-2 py-1 rounded">
                                  {productData.color}
                                </span>
                              )}
                              {productData.warranty && (
                                <span className="bg-gray-100 px-2 py-1 rounded">
                                  {productData.warranty}
                                </span>
                              )}
                            </div>

                            {/* Price */}
                            <div className="text-lg font-bold text-gray-900">
                              {currency}
                              {productData.price}
                              <span className="text-sm font-normal text-gray-500 ml-1">
                                each
                              </span>
                            </div>
                          </div>

                          {/* Bottom Row: Quantity + Total + Remove */}
                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                              <button
                                onClick={() =>
                                  handleQuantityChange(item._id, "decrease")
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-l-lg"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-10 h-8 flex items-center justify-center text-sm font-medium bg-white border-l border-r border-gray-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(item._id, "increase")
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-r-lg"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Item Total */}
                            <div className="text-right flex-1 px-4">
                              <p className="text-lg font-bold text-gray-900">
                                {currency}
                                {(productData.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.quantity} × {currency}
                                {productData.price}
                              </p>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveItem(item._id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:flex items-center gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 relative">
                        <img
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                          src={productData.image[0]}
                          alt={productData.name}
                          onError={(e) => {
                            e.target.src = "/api/placeholder/80/80";
                          }}
                        />
                        {productData.bestseller && (
                          <span className="absolute -mt-16 -ml-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                            ★
                          </span>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                          {productData.name}
                        </h3>
                        {productData.brand && (
                          <p className="text-sm text-red-600 mb-1">
                            {productData.brand}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-2">
                          {productData.color && (
                            <span>Color: {productData.color}</span>
                          )}
                          {productData.warranty && (
                            <span>• Warranty: {productData.warranty}</span>
                          )}
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {currency}
                          {productData.price}
                          <span className="text-sm font-normal text-gray-500 ml-1">
                            each
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex flex-col items-end space-y-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, "decrease")
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-l-lg"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-12 h-8 flex items-center justify-center text-sm font-medium bg-white border-l border-r border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, "increase")
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-r-lg"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            {currency}
                            {(productData.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} × {currency}
                            {productData.price}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Divider between items (Desktop only) */}
                    {index < cartData.length - 1 && (
                      <hr className="border-gray-200 mt-4 lg:mt-6 hidden lg:block" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Continue Shopping Link */}
            <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
              <button
                onClick={() => navigate("/collection")}
                className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center space-x-2"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-4">
            <div className="sticky top-8">
              <CartTotal />

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => navigate("/place-order")}
                  className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate("/collection")}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
