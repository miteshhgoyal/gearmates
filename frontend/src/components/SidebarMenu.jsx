import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Home,
  Package,
  Mail,
  User,
  Settings,
  HelpCircle,
  ShoppingBag,
  Info,
  Phone,
  LogOut,
  Heart,
  Clock,
  MapPin,
  Smartphone,
  Headphones,
  Battery,
} from "lucide-react";

const iconMap = {
  Home,
  Package,
  Mail,
  User,
  Settings,
  HelpCircle,
  ShoppingBag,
  Info,
  Phone,
  LogOut,
  Heart,
  Clock,
  MapPin,
  Smartphone,
  Headphones,
  Battery,
};

// Professional sidebar configuration for tech accessories store
const sidebarConfig = {
  main: {
    title: "GearMates",
    items: [
      { label: "Home", path: "/", icon: "Home" },
      { label: "Products", path: "/collection", icon: "Package" },
      //   { label: "Categories", submenu: "categories", icon: "ShoppingBag" },
      { label: "About", path: "/about", icon: "Info" },
      { label: "Contact", path: "/contact", icon: "Phone" },
    ],
  },
  categories: {
    title: "Product Categories",
    items: [
      {
        label: "Mobile Accessories",
        path: "/collection/mobile",
        icon: "Smartphone",
      },
      {
        label: "Audio & Headphones",
        path: "/collection/audio",
        icon: "Headphones",
      },
      { label: "Power & Charging", path: "/collection/power", icon: "Battery" },
      { label: "Tech Tools", path: "/collection/tools", icon: "Settings" },
      { label: "All Products", path: "/collection", icon: "Package" },
    ],
  },
};

const MenuItem = ({ item, onClick, isTransitioning }) => {
  const IconComponent = iconMap[item.icon];

  if (item.path) {
    return (
      <NavLink
        to={item.path}
        onClick={onClick}
        className={({ isActive }) =>
          `group flex items-center space-x-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
            isActive
              ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          }`
        }
      >
        {IconComponent && (
          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
            <IconComponent className="h-5 w-5" />
          </div>
        )}
        <span>{item.label}</span>
      </NavLink>
    );
  }

  return (
    <button
      onClick={() => !isTransitioning && onClick(item.submenu)}
      disabled={isTransitioning}
      className="group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900"
    >
      <div className="flex items-center space-x-3">
        {IconComponent && (
          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
            <IconComponent className="h-5 w-5" />
          </div>
        )}
        <span>{item.label}</span>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
};

const SidebarMenu = ({ isOpen, onClose, token, onLogout }) => {
  const [currentMenu, setCurrentMenu] = useState("main");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset menu state when closing
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setCurrentMenu("main");
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleBack = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMenu("main");
      setIsTransitioning(false);
    }, 150);
  };

  const handleSubmenu = (submenu) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMenu(submenu);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 h-screen z-50 lg:hidden transition-all duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />

        {/* Sidebar Panel */}
        <div
          className={`absolute left-0 top-0 h-full w-80 max-w-sm transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full flex-col bg-white shadow-2xl">
            {/* Header */}
            <div className="border-b border-gray-100 px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {currentMenu !== "main" && (
                    <button
                      onClick={handleBack}
                      disabled={isTransitioning}
                      className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                  )}
                  <h2 className="text-lg font-semibold text-gray-900">
                    {sidebarConfig[currentMenu]?.title || "Menu"}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <nav className="space-y-1">
                {sidebarConfig[currentMenu]?.items?.map((item, index) => (
                  <MenuItem
                    key={`${currentMenu}-${index}`}
                    item={item}
                    onClick={
                      item.submenu ? () => handleSubmenu(item.submenu) : onClose
                    }
                    isTransitioning={isTransitioning}
                  />
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-4 py-4">
              {token ? (
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="flex w-full items-center space-x-3 rounded-md px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={onClose}
                  className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
