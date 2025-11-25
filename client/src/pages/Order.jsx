import { useState } from 'react';
import { useCakes } from '../context/CakeContext';
import Footer from '../components/Footer';

const Order = () => {
  const { cakes, placeOrder } = useCakes();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    cakeId: '',
    quantity: 1,
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const selectedCake = cakes.find(cake => cake._id === formData.cakeId);
      const orderData = {
        ...formData,
        totalPrice: selectedCake.price * formData.quantity
      };
      
      await placeOrder(orderData);
      alert('Order placed successfully!');
      setFormData({
        customerName: '',
        email: '',
        phone: '',
        cakeId: '',
        quantity: 1,
        message: ''
      });
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

  const selectedCake = cakes.find(cake => cake._id === formData.cakeId);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Place Your Order</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Select Cake</label>
            <select
              name="cakeId"
              value={formData.cakeId}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Choose a cake...</option>
              {cakes.map(cake => (
                <option key={cake._id} value={cake._id}>
                  {cake.name} - ${cake.price}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Special Message (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg h-24"
              placeholder="Any special instructions or message..."
            />
          </div>
          
          {selectedCake && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold">Order Summary</h3>
              <p>{selectedCake.name} x {formData.quantity}</p>
              <p className="text-xl font-bold">
                Total: ${(selectedCake.price * formData.quantity).toFixed(2)}
              </p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Order;