import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { Shield, Truck, Headphones, Award, Users, Globe } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Every product undergoes rigorous testing to meet our high-quality standards before reaching you.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Quick and reliable shipping with real-time tracking for all your tech accessory needs.",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description:
        "Our knowledgeable team provides technical support and product guidance whenever you need it.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "1000+", label: "Products Available" },
    { number: "24/7", label: "Customer Support" },
    { number: "99.9%", label: "Satisfaction Rate" },
  ];

  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      description:
        "We source only the finest tech accessories from trusted manufacturers worldwide.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "Your satisfaction drives everything we do, from product selection to after-sales service.",
    },
    {
      icon: Globe,
      title: "Innovation Focus",
      description:
        "We stay ahead of tech trends to bring you the latest and most innovative accessories.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 to-red-50 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title
            text1="ABOUT"
            text2="GEARMATES"
            subtitle="Your trusted partner for premium tech accessories"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <img
              className="w-full rounded-2xl shadow-2xl"
              src={assets.about_image}
              alt="GearMates Tech Accessories Store"
            />
            <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-2xl shadow-lg">
              <p className="text-2xl font-bold">5+ Years</p>
              <p className="text-sm">Serving Tech Enthusiasts</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Revolutionizing Tech Accessories Since 2019
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              GearMates was founded with a simple yet powerful vision: to make
              premium tech accessories accessible to everyone. What started as a
              small venture has grown into a trusted destination for mobile
              accessories, audio gear, and innovative tech tools.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We carefully curate our product selection, partnering with leading
              manufacturers and emerging innovators to bring you accessories
              that enhance your digital lifestyle. From protective cases to
              cutting-edge chargers, every item in our collection is chosen for
              quality, functionality, and style.
            </p>
            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-600">
              <h4 className="font-bold text-gray-900 text-lg mb-2">
                Our Mission
              </h4>
              <p className="text-gray-700">
                To empower tech enthusiasts with innovative accessories that
                enhance productivity, protect investments, and elevate the
                overall technology experience.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <Title
            text1="WHY CHOOSE"
            text2="GEARMATES"
            subtitle="What sets us apart in the tech accessories market"
          />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 p-6 rounded-2xl border border-gray-100 hover:border-red-200 bg-white"
                >
                  <div className="bg-red-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                    <IconComponent className="h-7 w-7 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <Title
            text1="OUR"
            text2="VALUES"
            subtitle="The principles that guide everything we do"
          />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="bg-gradient-to-br from-red-100 to-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-red-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Upgrade Your Tech Experience?
          </h3>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            Discover our curated collection of premium tech accessories designed
            to enhance your digital lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-red-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
