import React from "react";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Headphones,
  Battery,
  Shield,
  Cable,
  HardDrive,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Mobile Accessories",
    description: "Cases, stands, and essential mobile add-ons",
    icon: Smartphone,
    count: "200+",
    trending: true,
    path: "/collection/mobile", // This will auto-apply mobile accessories filter
    queryPath: "/collection?category=mobile&bestsellers=true", // Alternative with query params
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Audio & Headphones",
    description: "Premium sound for audiophiles",
    icon: Headphones,
    count: "150+",
    trending: true,
    path: "/collection/audio",
    queryPath: "/collection?category=audio&sort=newest",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Power & Charging",
    description: "Keep your devices powered up",
    icon: Battery,
    count: "100+",
    trending: false,
    path: "/collection/power",
    queryPath: "/collection?category=power&minPrice=500&maxPrice=5000",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    name: "Protection & Safety",
    description: "Screen guards and protective gear",
    icon: Shield,
    count: "80+",
    trending: true,
    path: "/collection/protection",
    queryPath: "/collection?category=protection&bestsellers=true",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    name: "Cables & Connectivity",
    description: "Connect everything seamlessly",
    icon: Cable,
    count: "60+",
    trending: false,
    path: "/collection/connectivity",
    queryPath: "/collection?category=connectivity&sort=low-high",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 6,
    name: "Storage Solutions",
    description: "Expand and secure your data",
    icon: HardDrive,
    count: "40+",
    trending: true,
    path: "/collection/storage",
    queryPath: "/collection?category=storage&bestsellers=true",
    color: "from-teal-500 to-green-500",
  },
];

const CategoryCard = ({ category }) => {
  const IconComponent = category.icon;

  return (
    <Link to={category.queryPath} className="group block">
      {/* Rest of the component remains the same */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
        {category.trending && (
          <div className="absolute left-4 top-4 z-10 flex items-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 text-xs font-semibold text-white">
            <TrendingUp className="mr-1 h-3 w-3" />
            Trending
          </div>
        )}

        <div className="relative h-48 overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-white/20 p-6 backdrop-blur-sm transition-transform group-hover:scale-110">
              <IconComponent className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
              {category.name}
            </h3>
            <ArrowRight className="h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-blue-600" />
          </div>

          <p className="mb-4 text-sm text-gray-600 line-clamp-2">
            {category.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              {category.count} products
            </span>
            <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
              Explore →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const TechCategories = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Shop by{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Discover our comprehensive range of premium tech accessories,
            carefully curated for every device and lifestyle need
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/collection"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700"
          >
            View All Categories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TechCategories;
