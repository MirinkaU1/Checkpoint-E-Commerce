import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemsCount, setCartItemsCount] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((total, item) => total + item.quantity, 0);
  });

  const updateCartItemsCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartItemsCount(count);
  };

  return (
    <CartContext.Provider value={{ cartItemsCount, updateCartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};
