import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Smartphone,
  Headphones,
  Battery,
  Shield,
  Lock,
  Clock,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const categories = [
    {
      name: "Mobile Accessories",
      path: "/collection?category=mobile-accessories",
      icon: Smartphone,
    },
    {
      name: "Audio & Headphones",
      path: "/collection?category=audio-headphones",
      icon: Headphones,
    },
    {
      name: "Power & Charging",
      path: "/collection?category=power-charging",
      icon: Battery,
    },
  ];

  const customerService = [
    { name: "Track Your Order", path: "/orders" },
    { name: "Shipping Info", path: "/shipping" },
  ];

  const legal = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Warranty Guidelines", path: "/warranty" },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-auto border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        {/* Max 3 columns: Brand + Quick/Categories + Help/Legal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Column 1: Brand / Contact / Trust */}
          <div className="space-y-6">
            <div>
              <Link to="/" className="inline-block">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                  GearMates
                </h3>
              </Link>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-md">
                Your trusted partner for premium tech accessories. Discover
                curated mobile gear, audio essentials, and innovative tech tools
                built for everyday performance.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">
                Get in touch
              </h4>

              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300 space-y-0.5">
                  <a
                    href="tel:+919205163669"
                    className="hover:text-red-400 transition-colors block"
                  >
                    +91 92051 63669
                  </a>
                  <a
                    href="tel:+917053809341"
                    className="hover:text-red-400 transition-colors block"
                  >
                    +91 70538 09341
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-400 flex-shrink-0" />
                <a
                  href="mailto:gearmates.info@gmail.com"
                  className="text-sm text-gray-300 hover:text-red-400 transition-colors"
                >
                  gearmates.info@gmail.com
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">
                  C-91, Shalimar Garden, Sahibabad,
                  <br />
                  Ghaziabad, Uttar Pradesh, India
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-2">
              <p className="text-sm font-medium text-gray-300 mb-3">
                Why shop with us
              </p>
              <div className="flex flex-wrap gap-2.5">
                <div className="bg-gray-800/70 px-3 py-2 rounded-lg text-xs text-gray-300 flex items-center space-x-2">
                  <Lock className="h-3 w-3 text-green-400" />
                  <span>Secure Payments</span>
                </div>
                <div className="bg-gray-800/70 px-3 py-2 rounded-lg text-xs text-gray-300 flex items-center space-x-2">
                  <Clock className="h-3 w-3 text-blue-400" />
                  <span>24/7 Support</span>
                </div>
                <div className="bg-gray-800/70 px-3 py-2 rounded-lg text-xs text-gray-300 flex items-center space-x-2">
                  <Shield className="h-3 w-3 text-red-400" />
                  <span>1 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links + Categories (stacked in single column) */}
          <div className="space-y-8">
            <div>
              <h4 className="font-semibold text-gray-100 mb-4 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-red-400 transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-100 mb-4 text-sm uppercase tracking-wider">
                Categories
              </h4>
              <ul className="space-y-2.5">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      to={category.path}
                      className="text-sm text-gray-400 hover:text-red-400 transition-colors flex items-center space-x-2 group"
                    >
                      <category.icon className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition-colors" />
                      <span>{category.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Help & Support + Legal (stacked in single column) */}
          <div className="space-y-8">
            <div>
              <h4 className="font-semibold text-gray-100 mb-4 text-sm uppercase tracking-wider">
                Help &amp; Support
              </h4>
              <ul className="space-y-2.5">
                {customerService.map((service) => (
                  <li key={service.name}>
                    <Link
                      to={service.path}
                      className="text-sm text-gray-400 hover:text-red-400 transition-colors inline-block"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-100 mb-4 text-sm uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-sm text-gray-400 hover:text-red-400 transition-colors inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
            <p className="text-xs md:text-sm text-gray-400">
              © {new Date().getFullYear()} GearMates. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Crafted with care for your everyday tech essentials.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
