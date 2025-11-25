import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const addToCart = async (cake, userId) => {
    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        userId,
        cakeId: cake.id || cake._id,
        name: cake.name,
        price: cake.price,
        image: cake.image
      });
      
      setCartCount(prev => prev + 1);
      setPopupMessage(`${cake.name} added to cart`);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      
      fetchCart(userId);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const fetchCart = async (userId) => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCartItems(response.data.items || []);
      setCartCount(response.data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const removeFromCart = async (userId, cakeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${cakeId}`);
      fetchCart(userId);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const value = {
    cartItems,
    cartCount,
    showPopup,
    popupMessage,
    addToCart,
    fetchCart,
    removeFromCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};