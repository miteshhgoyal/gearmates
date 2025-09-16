import React from "react";
import Hero from "../components/Hero";
import TechCategories from "../components/TechCategories";
import FeaturedProducts from "../components/FeaturedProducts";
import StatsSection from "../components/StatsSection";
import OurPolicy from "../components/OurPolicy";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <TechCategories />
      <FeaturedProducts />
      <StatsSection />
      <OurPolicy />
    </div>
  );
};

export default Home;
