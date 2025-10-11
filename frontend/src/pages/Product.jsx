import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const fetchProductData = async () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setSelectedImage(product.image[0]);
      setCurrentImageIndex(0);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleAddToCart = () => {
    addToCart(productData._id, quantity);
  };

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => Math.min(prev + 1, 10));
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleImageNavigation = (direction) => {
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % productData.image.length
        : (currentImageIndex - 1 + productData.image.length) %
          productData.image.length;

    setCurrentImageIndex(newIndex);
    setSelectedImage(productData.image[newIndex]);
  };

  const handleThumbnailClick = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  if (!productData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white py-4">
      <div className="max-w-4xl mx-auto px-4">
        {/* Simple Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <span>Home</span> / <span>{productData.category}</span> /{" "}
          <span className="text-gray-900">{productData.name}</span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt={productData.name}
                className="w-full h-full object-cover"
              />

              {/* Simple Nav Arrows */}
              {productData.image.length > 1 && (
                <>
                  <button
                    onClick={() => handleImageNavigation("prev")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleImageNavigation("next")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Small Bestseller Badge */}
              {productData.bestseller && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-medium">
                  Bestseller
                </span>
              )}
            </div>

            {/* Small Thumbnails */}
            {productData.image.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {productData.image.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(image, index)}
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                      selectedImage === image
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${productData.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            {/* Brand & Title */}
            <div>
              {productData.brand && (
                <p className="text-red-600 text-sm font-medium mb-1">
                  {productData.brand}
                </p>
              )}
              <h1 className="text-2xl font-bold text-gray-900">
                {productData.name}
              </h1>
            </div>

            {/* Price */}
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {currency}
                {productData.price}
              </span>
              {productData.originalPrice &&
                productData.originalPrice > productData.price && (
                  <>
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      {currency}
                      {productData.originalPrice}
                    </span>
                    <span className="ml-2 text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
                      {Math.round(
                        ((productData.originalPrice - productData.price) /
                          productData.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {productData.description}
            </p>

            {/* Simple Features */}
            {productData.specifications &&
              productData.specifications.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Features
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {productData.specifications
                      .slice(0, 4)
                      .map((spec, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                          {spec}
                        </li>
                      ))}
                  </ul>
                </div>
              )}

            {/* Simple Compatibility */}
            {productData.compatibility &&
              productData.compatibility.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Compatible with
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {productData.compatibility
                      .slice(0, 4)
                      .map((device, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {device}
                        </span>
                      ))}
                  </div>
                </div>
              )}

            {/* Simple Product Details */}
            <div className="text-sm space-y-1 pt-2 border-t border-gray-100">
              {productData.color && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Color:</span>
                  <span>{productData.color}</span>
                </div>
              )}
              {productData.material && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Material:</span>
                  <span>{productData.material}</span>
                </div>
              )}
              {productData.warranty && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Warranty:</span>
                  <span>{productData.warranty}</span>
                </div>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-3 pt-4">
              {/* Simple Quantity */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">Qty:</span>
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-10 h-8 flex items-center justify-center text-sm font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                {quantity > 1 && (
                  <span className="text-sm text-gray-500">
                    Total: {currency}
                    {productData.price * quantity}
                  </span>
                )}
              </div>

              {/* Simple Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-red-600 text-white py-2.5 px-4 rounded font-medium hover:bg-red-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>

              {/* Simple Trust Badges */}
              <div className="flex justify-between text-xs text-gray-500 pt-2">
                <span>✓ Secure Payment</span>
                <span>✓ Fast Delivery</span>
                <span>✓ Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info - Minimal */}
        {(productData.specifications?.length > 4 ||
          (productData.compatibility &&
            productData.compatibility.length > 4)) && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              More Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {/* All Features */}
              {productData.specifications &&
                productData.specifications.length > 4 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      All Features
                    </h4>
                    <ul className="text-gray-600 space-y-1">
                      {productData.specifications
                        .slice(4)
                        .map((spec, index) => (
                          <li key={index}>• {spec}</li>
                        ))}
                    </ul>
                  </div>
                )}

              {/* All Compatibility */}
              {productData.compatibility &&
                productData.compatibility.length > 4 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      All Compatible Devices
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {productData.compatibility
                        .slice(4)
                        .map((device, index) => (
                          <span
                            key={index}
                            className="text-xs bg-white text-gray-700 px-2 py-1 rounded border"
                          >
                            {device}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>

      {/* Related Products - Minimal */}
      <div className="mt-12 bg-gray-50">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  );
};

export default Product;
