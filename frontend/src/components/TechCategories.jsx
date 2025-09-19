import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Star, Eye, ShoppingBag } from "lucide-react";
import { assets } from "../assets/assets";

const categories = [
  {
    id: 1,
    name: "Mobile Accessories",
    description:
      "Cases, stands, and essential mobile add-ons for every smartphone",
    count: "200+",
    trending: true,
    path: "/collection/mobile",
    queryPath: "/collection?category=mobile&bestsellers=true",
    image: assets.accessories,
    alt: "Mobile phone accessories including cases and chargers",
  },
  {
    id: 2,
    name: "Audio & Headphones",
    description: "Premium wireless earbuds and headphones for audiophiles",
    count: "150+",
    trending: true,
    path: "/collection/audio",
    queryPath: "/collection?category=audio&sort=newest",
    image: assets.audio,
    alt: "Premium wireless headphones on modern surface",
  },
  {
    id: 3,
    name: "Power & Charging",
    description: "Power banks, wireless chargers, and fast charging solutions",
    count: "100+",
    trending: false,
    path: "/collection/power",
    queryPath: "/collection?category=power&minPrice=500&maxPrice=5000",
    image: assets.charger,
    alt: "Wireless charging pad with smartphone",
  },
  {
    id: 4,
    name: "Protection & Safety",
    description: "Screen protectors, cases, and protective gear for devices",
    count: "80+",
    trending: true,
    path: "/collection/protection",
    queryPath: "/collection?category=protection&bestsellers=true",
    image: assets.security,
    alt: "Smartphone with protective case and screen protector",
  },
  {
    id: 5,
    name: "Cables & Connectivity",
    description: "USB-C cables, adapters, and connectivity solutions",
    count: "60+",
    trending: false,
    path: "/collection/connectivity",
    queryPath: "/collection?category=connectivity&sort=low-high",
    image: assets.cables,
    alt: "Various charging cables and USB connectors",
  },
  {
    id: 6,
    name: "Storage Solutions",
    description: "External drives, memory cards, and cloud storage devices",
    count: "40+",
    trending: true,
    path: "/collection/storage",
    queryPath: "/collection?category=storage&bestsellers=true",
    image: assets.powerbank,
    alt: "External SSD and storage devices on desk",
  },
];

const CategoryCard = ({ category }) => {
  return (
    <div className="group relative">
      <Link to={category.queryPath} className="block">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-2xl hover:shadow-red-500/10">
          {/* Image Container with Enhanced Overlay */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={category.image}
              alt={category.alt}
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                // Fallback for broken images
                e.target.src = `https://via.placeholder.com/800x600/6366f1/ffffff?text=${encodeURIComponent(
                  category.name
                )}`;
              }}
            />

            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

            {/* Trending Badge - Enhanced */}
            {category.trending && (
              <div className="absolute left-4 top-4 z-10 flex items-center rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                <TrendingUp className="mr-1 h-3 w-3" />
                TRENDING
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="absolute right-4 top-4 z-10 flex space-x-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <button className="rounded-full bg-white/20 p-2 backdrop-blur-md transition-all hover:bg-white/30 hover:scale-110">
                <Eye className="h-4 w-4 text-white" />
              </button>
              <button className="rounded-full bg-white/20 p-2 backdrop-blur-md transition-all hover:bg-white/30 hover:scale-110">
                <ShoppingBag className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Bottom overlay with category info */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span className="text-sm font-medium">
                    4.{category.id + 6}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Content Section */}
          <div className="p-6">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-red-600 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {category.description}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <div className="rounded-full bg-red-50 p-2 transition-all duration-300 group-hover:bg-red-100 group-hover:scale-110">
                  <ArrowRight className="h-5 w-5 text-red-600 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Subtle bottom accent */}
          <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </Link>
    </div>
  );
};

const TechCategories = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 mb-4">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Premium Tech Store
          </div>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Shop by{" "}
            <span className="bg-gradient-to-r from-red-600 via-orange-600 to-orange-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 leading-relaxed">
            Discover our comprehensive range of premium tech accessories,
            carefully curated for every device and lifestyle need. From mobile
            essentials to audio gear.
          </p>
        </div>

        {/* Enhanced Grid Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-20 text-center">
          <div className="rounded-3xl bg-gradient-to-r from-red-600 via-orange-600 to-orange-600 p-8 shadow-2xl">
            <h3 className="mb-4 text-2xl font-bold text-white">
              Can't find what you're looking for?
            </h3>
            <p className="mb-6 text-red-100">
              Explore our complete collection with advanced filters and search
              options
            </p>
            <Link
              to="/collection"
              className="inline-flex items-center rounded-2xl bg-white px-8 py-4 font-bold text-gray-900 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default TechCategories;
