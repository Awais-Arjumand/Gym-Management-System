// components/Supplements/ProductCard.tsx
"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "./CartContext";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  src?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-[#2B3036] p-4 sm:p-5 md:p-6 rounded-lg cursor-pointer hover:bg-[#3A4046] flex flex-col"
    >
      {product.src ? (
        <div className="relative w-full h-56 sm:h-64 mb-3 sm:mb-4">
          <Image
            src={product.src}
            alt={product.name}
            width={400}
            height={256}
            className="object-cover rounded-lg w-full h-full"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="bg-gray-700 h-40 text-white sm:h-48 mb-3 sm:mb-4 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">No Image</span>
        </div>
      )}
      <h3 className="text-lg sm:text-xl text-white font-semibold">{product.name}</h3>
      <p className="text-gray-400 text-sm sm:text-base mt-1 sm:mt-2 flex-grow">
        {product.description}
      </p>
      <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-base sm:text-lg text-white font-bold">{product.price}</span>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto bg-white hover:bg-black hover:!text-white cursor-pointer border border-transparent hover:border-white !text-black py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 text-sm sm:text-base"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;