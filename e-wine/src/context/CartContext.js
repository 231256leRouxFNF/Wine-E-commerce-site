import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { user } = useContext(AuthContext);

  // Recalculate total quantity
  const recalculateCartCount = (items) => {
    const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(total);
  };

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setCartCount(0);
    }
  }, [user]);

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
          recalculateCartCount(items);
        } catch (err) {
          console.error("Failed to fetch cart", err);
        }
      } else {
        const stored = localStorage.getItem("cart");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setCartItems(parsed);
            recalculateCartCount(parsed);
          } catch (err) {
            console.error("Failed to parse cart from localStorage", err);
            setCartItems([]);
            setCartCount(0);
          }
        } else {
          setCartItems([]);
          setCartCount(0);
        }
      }
    };
    load();
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    recalculateCartCount(cartItems);
  }, [cartItems, user]);

  const addToCart = async (product, quantity = 1) => {
    if (user) {
      try {
        const res = await axios.post(`/api/cart/${user._id}/add`, {
          productId: product._id,
          quantity,
        });
        const items = (res.data.items || []).map((it) => ({
          ...it.productId,
          quantity: it.quantity,
        }));
        setCartItems(items);
        recalculateCartCount(items);
        return;
      } catch (err) {
        console.error("Failed to update cart", err);
      }
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
      } else {
        updated = [...prev, { ...product, quantity }];
      }
      recalculateCartCount(updated);
      return updated;
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
        recalculateCartCount(items);
        return;
      } catch (err) {
        console.error("Failed to remove from cart", err);
      }
    }
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    recalculateCartCount(updated);
  };

  const clearCart = () => {
    if (!user) {
      localStorage.removeItem("cart");
    }
    setCartItems([]);
    setCartCount(0);
  };

  const updateCartCount = (newCount) => {
    setCartCount(newCount);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
