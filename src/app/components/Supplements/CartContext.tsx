// context/CartContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: string;
  src?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: {
    id: number;
    name: string;
    price: string;
    src?: string;
  }) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [pendingToast, setPendingToast] = useState<{
    message: string;
    isUpdate: boolean;
  } | null>(null);

  useEffect(() => {
    if (pendingToast) {
      if (pendingToast.isUpdate) {
        toast.success(pendingToast.message);
      } else {
        toast.success(pendingToast.message);
      }
      setPendingToast(null);
    }
  }, [pendingToast]);

  const addToCart = (product: {
    id: number;
    name: string;
    price: string;
    src?: string;
  }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        setPendingToast({
          message: `${product.name} quantity updated in cart!`,
          isUpdate: true,
        });
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      setPendingToast({
        message: `${product.name} added to cart!`,
        isUpdate: false,
      });
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => {
      const removedItem = prevItems.find((item) => item.id === id);
      if (removedItem) {
        setPendingToast({
          message: `${removedItem.name} removed from cart!`,
          isUpdate: false,
        });
      }
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
