import React from "react";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Headphones,
  Battery,
  Shield,
  Cable,
  HardDrive,
} from "lucide-react";

const Categories = () => {
  const categories = [
    {
      name: "Mobile Accessories",
      icon: Smartphone,
      count: "200+",
      path: "/collection/mobile",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
    },
    {
      name: "Audio & Headphones",
      icon: Headphones,
      count: "150+",
      path: "/collection/audio",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      name: "Power & Charging",
      icon: Battery,
      count: "100+",
      path: "/collection/power",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Protection",
      icon: Shield,
      count: "80+",
      path: "/collection/protection",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      name: "Connectivity",
      icon: Cable,
      count: "60+",
      path: "/collection/connectivity",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
    },
    {
      name: "Storage",
      icon: HardDrive,
      count: "40+",
      path: "/collection/storage",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of premium tech accessories
            designed for every device and lifestyle.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={index}
                to={category.path}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`${category.bgColor} p-6 text-center`}>
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Category Name */}
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    {category.name}
                  </h3>

                  {/* Product Count */}
                  <p className="text-xs text-gray-600">
                    {category.count} products
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/collection"
            className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
