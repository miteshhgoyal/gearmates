import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Award,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";

const FeaturedProducts = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const [wishlist, setWishlist] = useState([]);

  // Get featured products (bestsellers or first 8 products)
  const featuredProducts =
    products.filter((product) => product.bestseller).slice(0, 8) ||
    products.slice(0, 8);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const getBadgeInfo = (product) => {
    const badges = [];

    if (product.bestseller) {
      badges.push({ icon: Award, label: "Bestseller", color: "bg-yellow-500" });
    }

    if (product.specifications?.includes("Fast Charging")) {
      badges.push({ icon: Zap, label: "Fast Charge", color: "bg-blue-500" });
    }

    if (product.warranty && product.warranty !== "No warranty") {
      badges.push({ icon: Shield, label: "Warranty", color: "bg-green-500" });
    }

    return badges.slice(0, 2); // Show max 2 badges
  };

  const ProductCard = ({ product }) => {
    const badges = getBadgeInfo(product);
    const discount = product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

    return (
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <Link to={`/product/${product._id}`}>
            <img
              src={product.image[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </Link>

          {/* Badges */}
          <div className="absolute left-3 top-3 space-y-2">
            {badges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <div
                  key={index}
                  className={`${badge.color} flex items-center rounded-full px-2 py-1 text-xs font-semibold text-white`}
                >
                  <IconComponent className="mr-1 h-3 w-3" />
                  {badge.label}
                </div>
              );
            })}
          </div>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
              -{discount}%
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex space-x-3">
              <Link
                to={`/product/${product._id}`}
                className="rounded-full bg-white p-3 shadow-lg transition-transform hover:scale-110"
              >
                <Eye className="h-5 w-5 text-gray-700" />
              </Link>
              <button
                onClick={() => toggleWishlist(product._id)}
                className="rounded-full bg-white p-3 shadow-lg transition-transform hover:scale-110"
              >
                <Heart
                  className={`h-5 w-5 ${
                    wishlist.includes(product._id)
                      ? "fill-current text-red-500"
                      : "text-gray-700"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Category & Brand */}
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-blue-600">
              {product.category}
            </span>
            {product.brand && (
              <span className="text-sm text-gray-500">{product.brand}</span>
            )}
          </div>

          {/* Product Name */}
          <Link to={`/product/${product._id}`}>
            <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors hover:text-blue-600 line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Features */}
          {product.specifications && (
            <div className="mb-4 flex flex-wrap gap-1">
              {product.specifications.slice(0, 2).map((spec, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900">
                  {currency}
                  {product.price}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {currency}
                      {product.originalPrice}
                    </span>
                  )}
              </div>
              {product.warranty && (
                <span className="text-xs text-green-600">
                  {product.warranty} warranty
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(product._id)}
              className="group/btn flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-medium text-white transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
            >
              <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Hand-picked premium accessories that combine cutting-edge technology
            with exceptional value for money
          </p>
        </div>

        {/* Products Grid */}
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No featured products available at the moment.
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            to="/collection"
            className="inline-flex items-center rounded-xl border-2 border-blue-600 px-8 py-4 font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
