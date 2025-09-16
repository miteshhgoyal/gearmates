import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="mb-4">
        <Title text1="CART" text2="SUMMARY" />
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-600">Shipping Fee</span>
          <span className="font-medium">
            {subtotal === 0
              ? `${currency}0.00`
              : `${currency}${delivery_fee.toFixed(2)}`}
          </span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between py-2">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-bold text-lg text-gray-900">
            {currency}
            {total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Free shipping indicator */}
      {subtotal > 0 && subtotal < 999 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            Add {currency}
            {(999 - subtotal).toFixed(2)} more for free shipping
          </p>
        </div>
      )}
    </div>
  );
};

export default CartTotal;
