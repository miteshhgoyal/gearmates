import React from "react";
import {
  Users,
  Package,
  Star,
  Globe,
  Shield,
  Truck,
  Award,
  Clock,
} from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      label: "Happy Customers",
      value: "50K+",
      icon: Users,
      color: "from-red-500 to-orange-500",
    },
    {
      label: "Products Sold",
      value: "200K+",
      icon: Package,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "5-Star Reviews",
      value: "45K+",
      icon: Star,
      color: "from-yellow-400 to-orange-500",
    },
    {
      label: "Years Experience",
      value: "5+",
      icon: Award,
      color: "from-orange-500 to-orange-500",
    },
  ];

  const trustFeatures = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "Bank-level security for all transactions",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free shipping on orders above ₹999",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "1-year warranty on all products",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 py-16 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transform">
          <div className="grid grid-cols-8 gap-4">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className="h-2 w-2 animate-pulse rounded-full bg-white"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Trusted by Thousands
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Join our growing community of satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="group text-center">
                  <div
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${stat.color} mb-4 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="mb-2 text-3xl font-bold md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Features */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {trustFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="group text-center">
                <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <IconComponent className="mx-auto mb-4 h-10 w-10 text-red-400 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="mb-2 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
