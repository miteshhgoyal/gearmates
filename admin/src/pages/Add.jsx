import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { Upload, X, Save, Loader2, Check, AlertCircle } from "lucide-react";

const Add = ({ token }) => {
  const [images, setImages] = useState([false, false, false, false]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Mobile Accessories",
    subCategory: "Phone Cases",
    brand: "",
    color: "",
    material: "",
    warranty: "6 months",
    bestseller: false,
  });
  const [compatibility, setCompatibility] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [errors, setErrors] = useState({});

  const categories = {
    "Mobile Accessories": [
      "Phone Cases",
      "Screen Protectors",
      "Phone Holders",
      "Pop Sockets",
      "Camera Lens Protectors",
    ],
    Audio: [
      "Wireless Earbuds",
      "Wired Earphones",
      "Bluetooth Speakers",
      "Gaming Headsets",
    ],
    Power: [
      "Power Banks",
      "Wireless Chargers",
      "Fast Chargers",
      "Car Chargers",
      "Charging Cables",
    ],
    Protection: [
      "Tempered Glass",
      "Privacy Screens",
      "Waterproof Cases",
      "Shock Proof Cases",
    ],
    Connectivity: [
      "USB Cables",
      "HDMI Adapters",
      "OTG Adapters",
      "Bluetooth Adapters",
    ],
    Storage: ["Memory Cards", "Card Readers", "USB Drives", "External Storage"],
  };

  const compatibilityOptions = [
    "iPhone 15",
    "iPhone 14",
    "Samsung Galaxy S24",
    "OnePlus 12",
    "Google Pixel 8",
    "Xiaomi 14",
    "Universal",
    "Android",
    "iOS",
  ];

  const specificationOptions = {
    "Mobile Accessories": [
      "Wireless",
      "Magnetic",
      "Adjustable",
      "Foldable",
      "Waterproof",
    ],
    Audio: [
      "Noise Cancelling",
      "Bluetooth 5.3",
      "Fast Charging",
      "Voice Assistant",
    ],
    Power: [
      "Fast Charging",
      "Wireless",
      "Multiple Ports",
      "LED Display",
      "Quick Charge 3.0",
    ],
    Protection: [
      "9H Hardness",
      "Anti-Blue Light",
      "Fingerprint Resistant",
      "Case Friendly",
    ],
    Connectivity: ["USB-C", "Lightning", "USB 3.0", "High Speed"],
    Storage: ["High Speed", "Waterproof", "Shockproof", "Encrypted"],
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!images.some((img) => img))
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    if (field === "category") {
      setFormData((prev) => ({ ...prev, subCategory: categories[value][0] }));
    }
  };

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = false;
    setImages(newImages);
  };

  const toggleSelection = (item, list, setList) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      submitData.append("compatibility", JSON.stringify(compatibility));
      submitData.append("specifications", JSON.stringify(specifications));

      images.forEach((image, index) => {
        if (image) submitData.append(`image${index + 1}`, image);
      });

      const response = await axios.post(
        backendUrl + "/api/product/add",
        submitData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success("Product added successfully!");
        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "Mobile Accessories",
          subCategory: "Phone Cases",
          brand: "",
          color: "",
          material: "",
          warranty: "6 months",
          bestseller: false,
        });
        setImages([false, false, false, false]);
        setCompatibility([]);
        setSpecifications([]);
        setErrors({});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">
              Add New Product
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Fill in the product details to add it to your inventory
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="p-6 space-y-8">
            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Product Images <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-red-500 transition-colors">
                      {image ? (
                        <div className="relative h-full">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Product ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                          <Upload className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-500 mt-2">
                            Upload Image
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageChange(index, e.target.files[0])
                            }
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images}</p>
              )}
            </div>

            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.brand ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter brand name"
                  />
                  {errors.brand && (
                    <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter detailed product description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Category & Pricing */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Category & Pricing
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {Object.keys(categories).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Sub Category
                  </label>
                  <select
                    value={formData.subCategory}
                    onChange={(e) =>
                      handleInputChange("subCategory", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {categories[formData.category]?.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="299"
                    min="1"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Warranty
                  </label>
                  <select
                    value={formData.warranty}
                    onChange={(e) =>
                      handleInputChange("warranty", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="No warranty">No Warranty</option>
                    <option value="6 months">6 Months</option>
                    <option value="1 year">1 Year</option>
                    <option value="2 years">2 Years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Product Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Color
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., Black, Blue, Transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Material
                  </label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) =>
                      handleInputChange("material", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., Silicone, TPU, Tempered Glass"
                  />
                </div>
              </div>
            </div>

            {/* Compatibility & Specifications */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Compatibility & Features
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Device Compatibility
                </label>
                <div className="flex flex-wrap gap-2">
                  {compatibilityOptions.map((device) => (
                    <button
                      key={device}
                      type="button"
                      onClick={() =>
                        toggleSelection(device, compatibility, setCompatibility)
                      }
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        compatibility.includes(device)
                          ? "bg-red-500 text-white border-red-500"
                          : "bg-gray-50 text-gray-700 border-gray-300 hover:border-red-300"
                      }`}
                    >
                      {device}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Product Features
                </label>
                <div className="flex flex-wrap gap-2">
                  {specificationOptions[formData.category]?.map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() =>
                        toggleSelection(spec, specifications, setSpecifications)
                      }
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        specifications.includes(spec)
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-gray-50 text-gray-700 border-gray-300 hover:border-green-300"
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bestseller Toggle */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="bestseller"
                checked={formData.bestseller}
                onChange={(e) =>
                  handleInputChange("bestseller", e.target.checked)
                }
                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
              />
              <label
                htmlFor="bestseller"
                className="text-sm font-medium text-gray-900"
              >
                Mark as Bestseller Product
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Adding Product...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Add Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
