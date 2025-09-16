import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory, currentProductId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      // Filter by category first
      productsCopy = productsCopy.filter((item) => category === item.category);

      // Remove current product
      productsCopy = productsCopy.filter(
        (item) => item._id !== currentProductId
      );

      // Get up to 5 related products
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory, currentProductId]);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Related Products
          </h2>
          <p className="text-gray-600">More products from {category}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {related.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              brand={item.brand}
              category={item.category}
              bestseller={item.bestseller}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
