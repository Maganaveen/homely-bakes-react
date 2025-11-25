import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="text-white shadow-2xl relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #FF6B9D 0%, #4ECDC4 50%, #FFE66D 100%)',
      backgroundSize: '300% 300%',
      animation: 'gradientShift 6s ease infinite'
    }}>
      <style>
        {`
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          .nav-link:hover {
            animation: bounce 0.6s ease;
            transform: scale(1.1);
          }
          .cake-emoji {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
        `}
      </style>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-2 left-4 text-2xl cake-emoji">🎂</div>
        <div className="absolute top-2 right-4 text-2xl cake-emoji" style={{animationDelay: '1s'}}>🧁</div>
        <div className="absolute bottom-2 left-1/4 text-xl cake-emoji" style={{animationDelay: '2s'}}>🍪</div>
        <div className="absolute bottom-2 right-1/4 text-xl cake-emoji" style={{animationDelay: '0.5s'}}>🍰</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-3xl font-playful font-bold text-white drop-shadow-lg hover:scale-110 transition-transform duration-300 flex items-center gap-2">
            <span className="text-4xl">🎂</span>
            Yummy Cakes
            <span className="text-4xl">🧁</span>
          </Link>

          <div className="flex items-center space-x-8">
            {user && (
              <>
                <Link to="/" className="nav-link text-lg font-kid font-semibold px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border-2 border-white/30">
                  🏠 Home
                </Link>
                <Link to="/about" className="nav-link text-lg font-kid font-semibold px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border-2 border-white/30">
                  ℹ️ About
                </Link>
                <Link to="/menu" className="nav-link text-lg font-kid font-semibold px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border-2 border-white/30">
                  📋 Menu
                </Link>
                <Link to="/order" className="nav-link text-lg font-kid font-semibold px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border-2 border-white/30">
                  🛒 Order
                </Link>
                <Link to="/contact" className="nav-link text-lg font-kid font-semibold px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border-2 border-white/30">
                  📞 Contact
                </Link>
              </>
            )}

            {user ? (
              <div className="flex items-center space-4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-white/30">
                <span className="text-lg font-kid font-semibold mr-3">👋 Hi, {user.name}!</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-full bg-kid-dark text-white font-kid font-semibold hover:bg-kid-orange transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🚪 Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-full bg-kid-blue text-white font-kid font-semibold hover:bg-kid-purple transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-white/50"
                >
                  🔐 Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-full bg-white text-kid-primary font-kid font-semibold hover:bg-kid-cream transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-kid-primary"
                >
                  🎉 Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;