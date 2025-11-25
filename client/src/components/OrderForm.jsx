import { useState } from 'react';
import { useCakes } from '../context/CakeContext';

const OrderForm = ({ selectedCake, onClose }) => {
  const { placeOrder } = useCakes();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    quantity: 1,
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const orderData = {
        ...formData,
        cakeId: selectedCake._id,
        totalPrice: selectedCake.price * formData.quantity
      };
      
      await placeOrder(orderData);
      alert('Order placed successfully!');
      onClose();
    } catch (error) {
      alert('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Order {selectedCake.name}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="customerName"
            placeholder="Your Name"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
            className="w-full p-2 border rounded"
          />
          
          <textarea
            name="message"
            placeholder="Special message (optional)"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded h-20"
          />
          
          <div className="text-lg font-semibold">
            Total: ${(selectedCake.price * formData.quantity).toFixed(2)}
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-pink-600 text-white py-2 rounded hover:bg-pink-700 disabled:opacity-50"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;