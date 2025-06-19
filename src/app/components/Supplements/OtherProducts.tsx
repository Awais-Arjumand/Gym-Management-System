
"use client"
import React from "react";
import ProductCard from "./ProductCard";
import { allProducts } from "@/app/utils/data";

interface OtherProductsProps {
  category: string;
  searchQuery: string;
}

const OtherProducts = ({ category, searchQuery }: OtherProductsProps) => {


  const products = allProducts[category as keyof typeof allProducts] || [];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">{category} Products</h2>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-8 text-sm sm:text-base">
          No products found matching your search
        </div>
      )}
    </div>
  );
};

export default OtherProducts;