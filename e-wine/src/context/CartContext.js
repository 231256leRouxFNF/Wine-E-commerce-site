import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);

  // Clear cart immediately when logging out
  useEffect(() => {
    if (!user) {
      setCartItems([]);
    }
  }, [user]);

  // Load cart items on mount or when user changes
  useEffect(() => {
    const load = async () => {
      if (user) {
        try {
          const res = await axios.get(`/api/cart/${user._id}`);
          const items = (res.data.items || []).map((it) => ({
            ...it.productId,
            quantity: it.quantity,
          }));
          setCartItems(items);
        } catch (err) {
          console.error("Failed to fetch cart", err);
        }
      } else {
        const stored = localStorage.getItem("cart");
        if (stored) {
          try {
            setCartItems(JSON.parse(stored));
          } catch (err) {
            console.error("Failed to parse cart from localStorage", err);
            setCartItems([]);
          }
        } else {
          setCartItems([]);
        }
      }
    };
    load();
  }, [user]);

  // Persist cart only for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product) => {
    if (user) {
      try {
        const res = await axios.post(`/api/cart/${user._id}/add`, {
          productId: product._id,
        });
        const items = (res.data.items || []).map((it) => ({
          ...it.productId,
          quantity: it.quantity,
        }));
        setCartItems(items);
        return;
      } catch (err) {
        console.error("Failed to update cart", err);
      }
    }

    // Fallback to local update for guests or on error
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = async (id) => {
    if (user) {
      try {
        const res = await axios.delete(`/api/cart/${user._id}/${id}`);
        const items = (res.data.items || []).map((it) => ({
          ...it.productId,
          quantity: it.quantity,
        }));
        setCartItems(items);
        return;
      } catch (err) {
        console.error("Failed to remove from cart", err);
      }
    }
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
