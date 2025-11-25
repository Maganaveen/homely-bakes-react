import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CakeContext = createContext();

export const useCakes = () => {
  const context = useContext(CakeContext);
  if (!context) {
    throw new Error('useCakes must be used within a CakeProvider');
  }
  return context;
};

export const CakeProvider = ({ children }) => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCakes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cakes');
      setCakes(response.data);
    } catch (error) {
      console.error('Error fetching cakes:', error);
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async (orderData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchCakes();
  }, []);

  const value = {
    cakes,
    loading,
    fetchCakes,
    placeOrder
  };

  return (
    <CakeContext.Provider value={value}>
      {children}
    </CakeContext.Provider>
  );
};