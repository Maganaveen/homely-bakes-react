import { useState } from 'react';

const CakeCard = ({ cake, onOrder }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        {!imageLoaded && (
          <div className="w-full h-56 bg-gradient-to-br from-pink-100 to-purple-100 animate-pulse flex items-center justify-center">
            <div className="text-4xl">🎂</div>
          </div>
        )}
        <img 
          src={cake.image} 
          alt={cake.name}
          className={`w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
            ₹{cake.price}
          </div>
        </div>
        
        {/* Quick Order Button (appears on hover) */}
        {onOrder && (
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button 
              onClick={() => onOrder(cake)}
              className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <span>🛍️</span>
              Quick Order
            </button>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
            {cake.name}
          </h3>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-sm">⭐</span>
            ))}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
          {cake.description}
        </p>
        
        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            🌱 Fresh
          </span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            🏠 Homemade
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
            ✨ Premium
          </span>
        </div>
        
        {/* Bottom Section */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              ₹{cake.price}
            </span>
            <span className="text-xs text-gray-500">Starting from</span>
          </div>
          
          {onOrder && (
            <button 
              onClick={() => onOrder(cake)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>🛍️</span>
              Order
            </button>
          )}
        </div>
      </div>
      
      {/* Bottom Glow Effect */}
      <div className={`h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-all duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </div>
  );
};

export default CakeCard;