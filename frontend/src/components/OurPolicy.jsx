import React from "react";
import {
  Shield,
  RotateCcw,
  Headphones,
  Truck,
  Award,
  Clock,
} from "lucide-react";

const OurPolicy = () => {
  const policies = [
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description:
        "Premium quality tech accessories with manufacturer warranty",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "Hassle-free 7-day return policy on all products",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Quick delivery across India with real-time tracking",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "24/7 technical support from our product specialists",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Award,
      title: "Authentic Products",
      description: "100% genuine products from authorized dealers only",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Fast customer service response within 2 hours",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose GearMates?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing exceptional service and premium quality
            tech accessories for all your device needs.
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {policies.map((policy, index) => {
            const IconComponent = policy.icon;
            return (
              <div
                key={index}
                className="group text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-gray-200"
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${policy.bgColor} mb-6 group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className={`h-8 w-8 ${policy.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {policy.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {policy.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
