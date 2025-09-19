import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Zap,
  Shield,
  Truck,
  Play,
  Star,
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
      gradient: "from-red-900 via-red-800 to-orange-900",
      features: ["Fast Charging", "Premium Quality", "1 Year Warranty"],
    },
    {
      id: 2,
      title: "Wireless Audio Revolution",
      subtitle:
        "Experience crystal-clear sound with our premium wireless earbuds and speakers",
      image: assets.hero2,
      cta: "Explore Audio",
      gradient: "from-orange-900 via-orange-800 to-orange-900",
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
    }, 6000);

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
    <div className="relative overflow-hidden">
      {/* Main Hero Section */}
      <div className="relative min-h-screen sm:min-h-[85vh] lg:min-h-[90vh]">
        {/* Mobile Background with Image + Gradient Overlay */}
        <div
          className="absolute inset-0 lg:hidden bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%), url(${currentHero.image})`,
          }}
        >
          <div
            className={`absolute opacity-50 inset-0 bg-gradient-to-br ${currentHero.gradient}`}
          />
        </div>

        {/* Desktop Background with Gradient Only */}
        <div
          className={`absolute inset-0 hidden lg:block bg-gradient-to-br ${currentHero.gradient} transition-all duration-1000 ease-out`}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Floating elements for visual enhancement */}
          <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-white/5 blur-xl animate-pulse" />
          <div className="absolute bottom-32 right-16 h-48 w-48 rounded-full bg-white/5 blur-2xl animate-pulse delay-1000" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex min-h-screen items-center sm:min-h-[85vh] lg:min-h-[90vh]">
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
              {/* Left Content - Simplified Typography */}
              <div className="order-1 space-y-6 text-white lg:space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-md border border-white/20 shadow-lg">
                  <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />
                  <span className="text-sm font-medium tracking-wide">
                    Premium Tech Store
                  </span>
                </div>

                {/* Main Content - Reduced Font Weights */}
                <div className="space-y-4 lg:space-y-6">
                  <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                    <span className="block">{currentHero.title}</span>
                  </h1>
                  <p className="max-w-lg text-base leading-relaxed text-gray-200 sm:text-lg md:text-xl opacity-90">
                    {currentHero.subtitle}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
                  {currentHero.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md transition-all duration-300 hover:bg-white/20"
                    >
                      <div className="h-2 w-2 rounded-full bg-green-400" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons - Reduced Font Weights */}
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <Link
                    to="/collection"
                    className="group flex items-center justify-center rounded-2xl bg-white px-6 py-3 font-semibold text-gray-900 shadow-2xl transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-3xl sm:px-8 sm:py-4"
                  >
                    {currentHero.cta}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-4 pt-2 sm:gap-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="h-5 w-5 text-green-400" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Truck className="h-5 w-5 text-red-400" />
                    <span className="font-medium">Free Shipping</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Product Showcase (Desktop Only) */}
              <div className="order-2 relative hidden lg:block">
                <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-lg">
                  {/* Background Decorations */}
                  <div className="absolute inset-0 scale-105 rounded-3xl bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm transform rotate-3 transition-transform duration-500 hover:rotate-6" />
                  <div className="absolute inset-0 scale-110 rounded-3xl bg-gradient-to-l from-white/10 to-white/5 backdrop-blur-sm transform -rotate-2 transition-transform duration-700 hover:-rotate-4" />

                  {/* Product Image */}
                  <div className="relative z-10 overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm">
                    <img
                      src={currentHero.image}
                      alt={currentHero.title}
                      className="w-full h-auto object-cover transition-all duration-1000 hover:scale-105"
                      loading="eager"
                    />
                  </div>

                  {/* Product Badge */}
                  <div className="absolute top-4 left-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                    BESTSELLER
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:scale-110 sm:left-4 sm:p-3"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-white sm:h-6 sm:w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:scale-110 sm:right-4 sm:p-3"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-white sm:h-6 sm:w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2 sm:bottom-6 sm:space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`h-3 w-3 rounded-full transition-all duration-300 sm:h-4 sm:w-4 ${
                currentSlide === index
                  ? "scale-125 bg-white shadow-lg"
                  : "bg-white/50 hover:bg-white/70 hover:scale-110"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20">
          <div
            className="h-full bg-white transition-all duration-1000 ease-linear"
            style={{
              width: isAutoPlaying ? "100%" : "0%",
              transitionDuration: isAutoPlaying ? "6000ms" : "300ms",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
