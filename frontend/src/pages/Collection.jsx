import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import {
  Filter,
  X,
  Search,
  Grid3X3,
  List,
  SlidersHorizontal,
  Star,
  ChevronDown,
  Menu,
} from "lucide-react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const { category: urlCategory } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // State management
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortType, setSortType] = useState("relevant");
  const [viewMode, setViewMode] = useState("grid");
  const [showBestsellers, setShowBestsellers] = useState(false);

  // URL to category mapping
  const urlCategoryMapping = {
    mobile: "Mobile Accessories",
    audio: "Audio",
    power: "Power",
    protection: "Protection",
    connectivity: "Connectivity",
    storage: "Storage",
  };

  // Filter configurations for tech accessories
  const categoryOptions = [
    { value: "Mobile Accessories", label: "Mobile Accessories", icon: "📱" },
    { value: "Audio", label: "Audio & Headphones", icon: "🎧" },
    { value: "Power", label: "Power & Charging", icon: "🔋" },
    { value: "Protection", label: "Protection & Safety", icon: "🛡️" },
    { value: "Connectivity", label: "Connectivity & Cables", icon: "🔌" },
    { value: "Storage", label: "Storage Solutions", icon: "💾" },
  ];

  const subCategoryOptions = {
    "Mobile Accessories": [
      "Phone Cases",
      "Screen Protectors",
      "Phone Holders",
      "Pop Sockets",
      "Camera Lens Protectors",
    ],
    Audio: [
      "Wireless Earbuds",
      "Wired Earphones",
      "Bluetooth Speakers",
      "Gaming Headsets",
    ],
    Power: [
      "Power Banks",
      "Wireless Chargers",
      "Fast Chargers",
      "Car Chargers",
      "Charging Cables",
    ],
    Protection: [
      "Tempered Glass",
      "Privacy Screens",
      "Waterproof Cases",
      "Shock Proof Cases",
    ],
    Connectivity: [
      "USB Cables",
      "HDMI Adapters",
      "OTG Adapters",
      "Bluetooth Adapters",
    ],
    Storage: ["Memory Cards", "Card Readers", "USB Drives", "External Storage"],
  };

  // Get unique brands from products
  const brandOptions = [
    ...new Set(products.map((p) => p.brand).filter(Boolean)),
  ];

  // Auto-apply filters based on URL parameters
  useEffect(() => {
    setCategory([]);
    setSubCategory([]);
    setBrands([]);
    setPriceRange([0, 10000]);
    setShowBestsellers(false);

    if (urlCategory && urlCategoryMapping[urlCategory]) {
      setCategory([urlCategoryMapping[urlCategory]]);
    }

    if (searchParams.get("category")) {
      const categoryParam = searchParams.get("category");
      if (urlCategoryMapping[categoryParam]) {
        setCategory([urlCategoryMapping[categoryParam]]);
      } else if (categoryOptions.find((cat) => cat.value === categoryParam)) {
        setCategory([categoryParam]);
      }
    }

    if (searchParams.get("subcategory")) {
      const subCategoryParam = searchParams.get("subcategory");
      setSubCategory([subCategoryParam]);
    }

    if (searchParams.get("brand")) {
      const brandParam = searchParams.get("brand");
      setBrands([brandParam]);
    }

    if (searchParams.get("bestsellers") === "true") {
      setShowBestsellers(true);
    }

    if (searchParams.get("minPrice") || searchParams.get("maxPrice")) {
      const minPrice = parseInt(searchParams.get("minPrice")) || 0;
      const maxPrice = parseInt(searchParams.get("maxPrice")) || 10000;
      setPriceRange([minPrice, maxPrice]);
    }

    if (searchParams.get("sort")) {
      setSortType(searchParams.get("sort"));
    }
  }, [urlCategory, searchParams, location.pathname]);

  // Filter functions
  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (value) => {
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleBrand = (value) => {
    setBrands((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.brand?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (brands.length > 0) {
      productsCopy = productsCopy.filter((item) => brands.includes(item.brand));
    }

    productsCopy = productsCopy.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    if (showBestsellers) {
      productsCopy = productsCopy.filter((item) => item.bestseller);
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      case "name-asc":
        setFilterProducts(fpCopy.sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "name-desc":
        setFilterProducts(fpCopy.sort((a, b) => b.name.localeCompare(a.name)));
        break;
      case "newest":
        setFilterProducts(fpCopy.sort((a, b) => b.date - a.date));
        break;
      default:
        applyFilter();
        break;
    }
  };

  const clearAllFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setBrands([]);
    setPriceRange([0, 10000]);
    setShowBestsellers(false);
    window.history.replaceState({}, "", "/collection");
  };

  useEffect(() => {
    applyFilter();
  }, [
    category,
    subCategory,
    brands,
    priceRange,
    showBestsellers,
    search,
    showSearch,
    products,
  ]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  const activeFiltersCount =
    category.length +
    subCategory.length +
    brands.length +
    (showBestsellers ? 1 : 0);

  const getCurrentCategoryName = () => {
    if (urlCategory && urlCategoryMapping[urlCategory]) {
      return urlCategoryMapping[urlCategory];
    }
    if (category.length === 1) {
      return category[0];
    }
    return "All Products";
  };

  // Prevent body scroll when filter modal is open
  useEffect(() => {
    if (showFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-4 py-4">
          {/* Page Title */}
          <div className="mb-4">
            <div className="text-center">
              <Title
                text1={getCurrentCategoryName().split(" ")[0]}
                text2={
                  getCurrentCategoryName().split(" ").slice(1).join(" ") ||
                  "COLLECTION"
                }
              />
            </div>
          </div>

          {/* Mobile Controls Row */}
          <div className="flex items-center justify-between">
            {/* Results Count */}
            <div className="text-sm text-gray-600 font-medium">
              {filterProducts.length} items
              {activeFiltersCount > 0 && (
                <span className="block text-xs text-red-600">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""}{" "}
                  active
                </span>
              )}
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className="appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                >
                  <option value="relevant">Relevant</option>
                  <option value="newest">Newest</option>
                  <option value="low-high">Price ↑</option>
                  <option value="high-low">Price ↓</option>
                  <option value="name-asc">A-Z</option>
                  <option value="name-desc">Z-A</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilter(true)}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm active:scale-95 transition-transform"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-white text-red-600 text-xs px-2 py-1 rounded-full font-bold min-w-[20px] text-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active Filters Horizontal Scroll */}
          {activeFiltersCount > 0 && (
            <div className="mt-4">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  Filters:
                </span>

                {category.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs whitespace-nowrap shrink-0"
                  >
                    {cat.length > 15 ? cat.substring(0, 15) + "..." : cat}
                    <button
                      onClick={() => toggleCategory(cat)}
                      className="ml-2"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {subCategory.map((sub) => (
                  <span
                    key={sub}
                    className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs whitespace-nowrap shrink-0"
                  >
                    {sub}
                    <button
                      onClick={() => toggleSubCategory(sub)}
                      className="ml-2"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {brands.map((brand) => (
                  <span
                    key={brand}
                    className="inline-flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs whitespace-nowrap shrink-0"
                  >
                    {brand}
                    <button onClick={() => toggleBrand(brand)} className="ml-2">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {showBestsellers && (
                  <span className="inline-flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs whitespace-nowrap shrink-0">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Bestsellers
                    <button
                      onClick={() => setShowBestsellers(false)}
                      className="ml-2"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={clearAllFilters}
                  className="text-xs text-red-600 font-medium whitespace-nowrap px-3 py-1 shrink-0"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Desktop Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <p className="text-gray-600">
                {filterProducts.length} products found
                {activeFiltersCount > 0 && (
                  <span className="ml-2 text-red-600 font-medium">
                    ({activeFiltersCount} filter
                    {activeFiltersCount > 1 ? "s" : ""} applied)
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  title="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white hover:border-gray-400 transition-colors"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="newest">Newest First</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Desktop Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center space-x-2 mt-6 flex-wrap">
              <span className="text-sm text-gray-600 font-medium">
                Active filters:
              </span>

              {category.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                >
                  {cat}
                  <button
                    onClick={() => toggleCategory(cat)}
                    className="ml-2 hover:bg-red-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {subCategory.map((sub) => (
                <span
                  key={sub}
                  className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {sub}
                  <button
                    onClick={() => toggleSubCategory(sub)}
                    className="ml-2 hover:bg-green-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {brands.map((brand) => (
                <span
                  key={brand}
                  className="inline-flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                >
                  {brand}
                  <button
                    onClick={() => toggleBrand(brand)}
                    className="ml-2 hover:bg-orange-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {showBestsellers && (
                <span className="inline-flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Bestsellers
                  <button
                    onClick={() => setShowBestsellers(false)}
                    className="ml-2 hover:bg-yellow-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-800 font-medium ml-4 px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilter && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowFilter(false)}
          />

          {/* Modal */}
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 shrink-0">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
              </h3>
              <button
                onClick={() => setShowFilter(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto flex-1 scrollbar-hide">
              {/* Bestsellers Toggle */}
              <div className="p-4 border-b border-gray-200">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showBestsellers}
                    onChange={(e) => setShowBestsellers(e.target.checked)}
                    className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                  />
                  <span className="flex items-center text-base font-medium text-gray-900">
                    <Star className="w-5 h-5 mr-2 text-yellow-400 fill-current" />
                    Show Bestsellers Only
                  </span>
                </label>
              </div>

              {/* Categories */}
              <div className="p-4 border-b border-gray-200">
                <h4 className="text-base font-semibold text-gray-900 mb-4">
                  Categories
                </h4>
                <div className="space-y-1">
                  {categoryOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-3 cursor-pointer py-1"
                    >
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={category.includes(option.value)}
                        onChange={() => toggleCategory(option.value)}
                        className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className="flex items-center text-base text-gray-700">
                        <span className="text-lg mr-3">{option.icon}</span>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sub Categories */}
              {category.length > 0 && (
                <div className="p-4 border-b border-gray-200">
                  <h4 className="text-base font-semibold text-gray-900 mb-4">
                    Product Types
                  </h4>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {category
                      .flatMap((cat) => subCategoryOptions[cat] || [])
                      .filter(
                        (value, index, self) => self.indexOf(value) === index
                      )
                      .map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-3 cursor-pointer py-1"
                        >
                          <input
                            type="checkbox"
                            value={option}
                            checked={subCategory.includes(option)}
                            onChange={() => toggleSubCategory(option)}
                            className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                          />
                          <span className="text-base text-gray-700">
                            {option}
                          </span>
                        </label>
                      ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="p-4 border-b border-gray-200">
                <h4 className="text-base font-semibold text-gray-900 mb-4">
                  Price Range
                </h4>
                <div className="space-y-4">
                  {/* Price Inputs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Min Price
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value) || 0,
                            priceRange[1],
                          ])
                        }
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Max Price
                      </label>
                      <input
                        type="number"
                        placeholder="10000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value) || 10000,
                          ])
                        }
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  {/* Quick Price Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      [0, 500],
                      [500, 1000],
                      [1000, 2000],
                      [2000, 5000],
                      [5000, 10000],
                      [0, 10000],
                    ].map(([min, max]) => (
                      <button
                        key={`${min}-${max}`}
                        onClick={() => setPriceRange([min, max])}
                        className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                          priceRange[0] === min && priceRange[1] === max
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-red-300"
                        }`}
                      >
                        ₹{min === 0 && max === 10000 ? "All" : `${min}-${max}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Brands */}
              {/* {brandOptions.length > 0 && (
                <div className="p-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-4">
                    Brands
                  </h4>
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {brandOptions.slice(0, 10).map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center space-x-3 cursor-pointer py-1"
                      >
                        <input
                          type="checkbox"
                          value={brand}
                          checked={brands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                        />
                        <span className="text-base text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )} */}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 shrink-0">
              <div className="flex space-x-3">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilter(false)}
                  className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm"
                >
                  Show {filterProducts.length} Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:w-80">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-32">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <SlidersHorizontal className="w-5 h-5 mr-2 text-red-600" />
                  Filters
                </h3>
              </div>

              <div className="overflow-y-auto">
                {/* Bestsellers Toggle */}
                <div className="p-6 border-b border-gray-200">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={showBestsellers}
                      onChange={(e) => setShowBestsellers(e.target.checked)}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="flex items-center text-sm font-medium text-gray-900 group-hover:text-gray-700">
                      <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                      Bestsellers Only
                    </span>
                  </label>
                </div>

                {/* Categories */}
                <div className="p-6 border-b border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">
                    Categories
                  </h4>
                  <div className="space-y-0">
                    {categoryOptions.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-3 cursor-pointer group hover:bg-gray-50 rounded-lg p-2 py-1"
                      >
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={category.includes(option.value)}
                          onChange={() => toggleCategory(option.value)}
                          className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                        />
                        <span className="flex items-center text-sm text-gray-700 group-hover:text-gray-900">
                          <span className="mr-2">{option.icon}</span>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sub Categories */}
                {category.length > 0 && (
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">
                      Product Types
                    </h4>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {category
                        .flatMap((cat) => subCategoryOptions[cat] || [])
                        .filter(
                          (value, index, self) => self.indexOf(value) === index
                        )
                        .map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 py-1"
                          >
                            <input
                              type="checkbox"
                              value={option}
                              checked={subCategory.includes(option)}
                              onChange={() => toggleSubCategory(option)}
                              className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                            />
                            <span className="text-sm text-gray-700">
                              {option}
                            </span>
                          </label>
                        ))}
                    </div>
                  </div>
                )}

                {/* Brands */}
                {brandOptions.length > 0 && (
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">
                      Brands
                    </h4>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {brandOptions.slice(0, 10).map((brand) => (
                        <label
                          key={brand}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2"
                        >
                          <input
                            type="checkbox"
                            value={brand}
                            checked={brands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                          />
                          <span className="text-sm text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div className="p-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">
                    Price Range
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value) || 0,
                            priceRange[1],
                          ])
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-20"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value) || 10000,
                          ])
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-20"
                      />
                    </div>

                    {/* Quick Price Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        [0, 500],
                        [500, 1000],
                        [1000, 2000],
                        [2000, 5000],
                        [5000, 10000],
                        [0, 10000],
                      ].map(([min, max]) => (
                        <button
                          key={`${min}-${max}`}
                          onClick={() => setPriceRange([min, max])}
                          className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                            priceRange[0] === min && priceRange[1] === max
                              ? "bg-red-600 text-white border-red-600"
                              : "bg-white text-gray-700 border-gray-300 hover:border-red-300 hover:bg-red-50"
                          }`}
                        >
                          {min === 0 && max === 10000
                            ? "All Prices"
                            : `₹${min}-₹${max}`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filterProducts.length > 0 ? (
              <div
                className={`grid gap-4 lg:gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {filterProducts.map((item, index) => (
                  <ProductItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    brand={item.brand}
                    category={item.category}
                    bestseller={item.bestseller}
                    originalPrice={item.originalPrice}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  No products found
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any products matching your current filters.
                  Try adjusting your search criteria.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Collection;
