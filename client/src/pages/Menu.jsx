import { useState } from 'react';
import { useCakes } from '../context/CakeContext';
import CakeCard from '../components/CakeCard';
import OrderForm from '../components/OrderForm';

const Menu = () => {
  const { cakes, loading } = useCakes();
  const [selectedCake, setSelectedCake] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const handleOrder = (cake) => {
    setSelectedCake(cake);
  };

  const closeOrderForm = () => {
    setSelectedCake(null);
  };

  const categories = ['all', 'chocolate', 'vanilla', 'fruit', 'special'];
  
  const filteredCakes = filterCategory === 'all' 
    ? cakes 
    : cakes.filter(cake => 
        cake.name.toLowerCase().includes(filterCategory) ||
        cake.description.toLowerCase().includes(filterCategory)
      );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            🎂 Our Delicious Menu
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Handcrafted with love, baked to perfection
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                filterCategory === category
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent"></div>
            <p className="text-xl text-gray-600 mt-4">Loading our delicious cakes...</p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="text-center mb-12">
              <p className="text-lg text-gray-600">
                Showing <span className="font-bold text-pink-600">{filteredCakes.length}</span> delicious cake{filteredCakes.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Cakes Grid */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredCakes.map((cake, index) => (
                <div 
                  key={cake._id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CakeCard 
                    cake={cake} 
                    onOrder={handleOrder}
                  />
                </div>
              ))}
            </div>

            {filteredCakes.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No cakes found</h3>
                <p className="text-gray-500">Try selecting a different category</p>
              </div>
            )}
          </>
        )}
      </div>
      
      {selectedCake && (
        <OrderForm 
          selectedCake={selectedCake} 
          onClose={closeOrderForm}
        />
      )}
    </div>
  );
};

export default Menu;