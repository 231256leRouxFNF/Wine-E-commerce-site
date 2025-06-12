import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const load = async () => {
      if (user) {
        try {
          const res = await axios.get(`/api/favourites/${user._id}`);
          setFavourites(res.data.products || []);
        } catch (err) {
          console.error('Failed to fetch favourites', err);
        }
      } else {
        const stored = localStorage.getItem('favourites');
        if (stored) {
          try {
            setFavourites(JSON.parse(stored));
          } catch (e) {
            setFavourites([]);
          }
        } else {
          setFavourites([]);
        }
      }
    };
    load();
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  }, [favourites, user]);

  const addFavourite = async (product) => {
    if (user) {
      try {
        const res = await axios.post(`/api/favourites/${user._id}/add`, {
          productId: product._id,
        });
        setFavourites(res.data.products || []);
        return;
      } catch (err) {
        console.error('Failed to update favourites', err);
      }
    }
    setFavourites((prev) => {
      if (prev.find((p) => p._id === product._id)) return prev;
      return [...prev, product];
    });
  };

  const removeFavourite = async (id) => {
    if (user) {
      try {
        const res = await axios.delete(`/api/favourites/${user._id}/${id}`);
        setFavourites(res.data.products || []);
        return;
      } catch (err) {
        console.error('Failed to remove favourite', err);
      }
    }
    setFavourites((prev) => prev.filter((p) => p._id !== id));
  };

  const toggleFavourite = async (product) => {
    const exists = favourites.some((p) => p._id === product._id);
    if (exists) {
      await removeFavourite(product._id);
    } else {
      await addFavourite(product);
    }
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, toggleFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
