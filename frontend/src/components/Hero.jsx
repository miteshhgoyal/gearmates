import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Zap,
  Shield,
  Truck,
} from "lucide-react";
import { assets } from "../assets/assets";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      id: 1,
      title: "Premium Tech Accessories",
      subtitle:
        "Upgrade your devices with cutting-edge accessories designed for modern lifestyles",
      image: assets.hero1,
      cta: "Shop Now",
      gradient: "from-blue-900 via-blue-800 to-indigo-900",
      features: ["Fast Charging", "Premium Quality", "1 Year Warranty"],
    },
    {
      id: 2,
      title: "Wireless Audio Revolution",
      subtitle:
        "Experience crystal-clear sound with our premium wireless earbuds and speakers",
      image: assets.hero2,
      cta: "Explore Audio",
      gradient: "from-purple-900 via-purple-800 to-pink-900",
      features: ["Noise Cancellation", "30Hr Battery", "Premium Drivers"],
    },
    {
      id: 3,
      title: "Ultimate Device Protection",
      subtitle:
        "Military-grade cases and screen protectors for maximum device safety",
      image: assets.hero3,
      cta: "Shop Protection",
      gradient: "from-gray-900 via-gray-800 to-black",
      features: ["Drop Protection", "Scratch Resistant", "Wireless Compatible"],
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
    setIsAutoPlaying(false);
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <div className="relative">
      {/* Main Hero Section */}
      <div className="relative min-h-[80vh] overflow-hidden py-12">
        {/* Background with Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${currentHero.gradient} transition-all duration-1000`}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex min-h-[80vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Left Content */}
              <div className="space-y-8 text-white">
                {/* Badge */}
                <div className="inline-flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium">
                    Premium Tech Accessories
                  </span>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                  <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
                    {currentHero.title}
                  </h1>
                  <p className="max-w-lg text-lg text-gray-200 md:text-xl">
                    {currentHero.subtitle}
                  </p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-3">
                  {currentHero.features.map((feature, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/collection"
                    className="group flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                  >
                    {currentHero.cta}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to="/about"
                    className="flex items-center justify-center rounded-xl border-2 border-white/50 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                  >
                    Learn More
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center space-x-6 pt-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Truck className="h-4 w-4 text-blue-400" />
                    <span>Free Shipping</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Product Showcase */}
              <div className="relative hidden lg:block">
                <div className="relative">
                  {/* Background Decoration */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm transform rotate-3" />

                  {/* Product Image */}
                  <img
                    src={currentHero.image}
                    alt={currentHero.title}
                    className="relative z-10 mx-auto w-full max-w-md rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-105"
                  />

                  {/* Floating Stats */}
                  <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-lg">
                    <div className="text-2xl font-bold text-gray-900">50K+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>

                  <div className="absolute -top-4 -right-4 rounded-xl bg-white p-4 shadow-lg">
                    <div className="text-2xl font-bold text-blue-600">4.8★</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "scale-125 bg-white"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
