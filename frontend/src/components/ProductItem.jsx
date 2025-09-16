import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { Heart, Star, ShoppingCart, Award } from "lucide-react";

const ProductItem = ({
  id,
  image,
  name,
  price,
  brand,
  category,
  bestseller,
  originalPrice,
  viewMode = "grid",
}) => {
  const { currency, addToCart } = useContext(ShopContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    try {
      await addToCart(id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // List view for desktop
  if (viewMode === "list") {
    return (
      <Link
        to={`/product/${id}`}
        onClick={() => scrollTo(0, 0)}
        className="group flex bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 p-4 space-x-4"
      >
        {/* Image */}
        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <img
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={image[0]}
            alt={name}
            loading="lazy"
          />
          {bestseller && (
            <span className="absolute -top-1 -right-1 bg-yellow-500 text-white px-1 py-0.5 rounded-full text-xs font-bold">
              ★
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
                <span>{category}</span>
                {brand && (
                  <>
                    <span>•</span>
                    <span>{brand}</span>
                  </>
                )}
              </div>

              <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {name}
              </h3>

              <div className="flex items-center space-x-2 mb-2">
                <span className="font-bold text-gray-900">
                  {currency}
                  {price}
                </span>
                {originalPrice && originalPrice > price && (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      {currency}
                      {originalPrice}
                    </span>
                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-medium">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">(4.2)</span>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                onClick={handleWishlist}
                className={`p-2 rounded-full transition-colors ${
                  isWishlisted
                    ? "bg-red-50 text-red-500"
                    : "bg-gray-50 text-gray-400 hover:text-gray-600"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
                />
              </button>

              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ShoppingCart className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid view - optimized for mobile
  return (
    <Link
      to={`/product/${id}`}
      onClick={() => scrollTo(0, 0)}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={image[0]}
          alt={name}
          loading="lazy"
        />

        {/* Mobile-optimized badges */}
        <div className="absolute top-2 left-2 space-y-1">
          {bestseller && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <Award className="w-3 h-3 mr-1" />
              Best
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{discount}%
            </span>
          )}
        </div>

        {/* Mobile wishlist - always visible */}
        <div className="absolute top-2 right-2">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-white/90 text-gray-700"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>
        </div>

        {/* Mobile add to cart - show on hover/touch */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 text-sm"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Info - Mobile optimized */}
      <div className="p-3 space-y-2">
        {/* Category & Brand - Mobile layout */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-blue-600 font-medium truncate">{category}</span>
          {brand && (
            <span className="text-gray-500 truncate ml-2">{brand}</span>
          )}
        </div>

        {/* Product Name - Mobile optimized */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight group-hover:text-blue-600 transition-colors min-h-[2.5rem]">
          {name}
        </h3>

        {/* Rating - Mobile compact */}
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">(4.2)</span>
        </div>

        {/* Price - Mobile optimized */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-900 text-base">
              {currency}
              {price}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-medium">
                -{discount}%
              </span>
            )}
          </div>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-500 line-through block">
              {currency}
              {originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
