import { Link } from 'react-router-dom';
import { useCakes } from '../context/CakeContext';
import CakeCard from '../components/CakeCard';
import Footer from '../components/Footer';

const Home = () => {
  const { cakes, loading } = useCakes();
  const featuredCakes = cakes.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-light via-kid-cream to-kid-accent">
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-3deg); }
            75% { transform: rotate(3deg); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .hero-cake {
            animation: float 4s ease-in-out infinite;
          }
          .hero-title {
            animation: wiggle 2s ease-in-out infinite;
          }
          .featured-card {
            transition: all 0.3s ease;
          }
          .featured-card:hover {
            transform: scale(1.05) rotate(2deg);
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🎈</div>
          <div className="absolute top-20 right-20 text-5xl opacity-20 animate-bounce" style={{animationDelay: '1s'}}>🎂</div>
          <div className="absolute bottom-20 left-20 text-4xl opacity-20 animate-bounce" style={{animationDelay: '2s'}}>🧁</div>
          <div className="absolute bottom-10 right-10 text-5xl opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}>🍬</div>
          <div className="absolute top-1/2 left-1/4 text-3xl opacity-20 animate-bounce" style={{animationDelay: '1.5s'}}>🍪</div>
          <div className="absolute top-1/3 right-1/3 text-4xl opacity-20 animate-bounce" style={{animationDelay: '2.5s'}}>🎉</div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-12">
            <div className="hero-cake">
              <img
                src="/images/hero-cake.jpg"
                alt="Yummy homemade cake"
                className="mx-auto w-80 h-60 object-cover rounded-3xl shadow-2xl border-8 border-white"
              />
            </div>
          </div>

          <h1 className="hero-title text-7xl font-playful font-bold mb-6 bg-gradient-to-r from-kid-primary via-kid-purple to-kid-blue bg-clip-text text-transparent drop-shadow-lg">
            Yummy Cakes! 🎂
          </h1>

          <p className="text-3xl font-kid font-semibold mb-12 text-kid-dark max-w-2xl mx-auto leading-relaxed">
            Made with lots of love, sprinkles, and magical ingredients! ✨
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/menu"
              className="group px-12 py-4 rounded-full bg-gradient-to-r from-kid-primary to-kid-purple text-white text-2xl font-playful font-bold hover:from-kid-purple hover:to-kid-blue transition-all duration-300 transform hover:scale-110 shadow-2xl border-4 border-white"
            >
              <span className="group-hover:animate-bounce inline-block mr-2">🍰</span>
              View Our Yummy Menu!
              <span className="group-hover:animate-bounce inline-block ml-2">🧁</span>
            </Link>

            <Link
              to="/about"
              className="px-8 py-4 rounded-full bg-white text-kid-primary text-xl font-kid font-semibold hover:bg-kid-cream transition-all duration-300 transform hover:scale-105 shadow-xl border-4 border-kid-primary"
            >
              Learn Our Story 📖
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cakes */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-playful font-bold mb-4 bg-gradient-to-r from-kid-orange to-kid-dark bg-clip-text text-transparent">
              Our Favorite Cakes! ⭐
            </h2>
            <p className="text-xl font-kid text-kid-dark max-w-2xl mx-auto">
              Check out our most popular and delicious creations that kids and families love! 🎈
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-kid-primary border-t-transparent mx-auto mb-4"></div>
                <p className="text-2xl font-kid text-kid-primary">Loading yummy cakes... 🍰</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredCakes.map((cake, index) => (
                <div key={cake._id} className="featured-card" style={{animationDelay: `${index * 0.2}s`}}>
                  <CakeCard cake={cake} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link
              to="/menu"
              className="inline-block px-10 py-5 rounded-full bg-gradient-to-r from-kid-green to-kid-blue text-white text-2xl font-playful font-bold hover:from-kid-blue hover:to-kid-purple transition-all duration-300 transform hover:scale-110 shadow-2xl border-4 border-white"
            >
              <span className="inline-block mr-3">🍪</span>
              See All Our Cakes!
              <span className="inline-block ml-3">🎂</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Fun Call-to-Action Section */}
      <section className="py-16 bg-gradient-to-r from-kid-secondary to-kid-light">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-playful font-bold text-white mb-6 drop-shadow-lg">
              Ready to Order Your Dream Cake? 🎉
            </h3>
            <p className="text-xl font-kid text-white mb-8 drop-shadow-md">
              Custom cakes, birthday surprises, and sweet treats for every occasion!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-4xl mb-8">
              <span className="animate-bounce">🎂</span>
              <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🧁</span>
              <span className="animate-bounce" style={{animationDelay: '0.4s'}}>🍰</span>
              <span className="animate-bounce" style={{animationDelay: '0.6s'}}>🍪</span>
              <span className="animate-bounce" style={{animationDelay: '0.8s'}}>🎈</span>
            </div>
            <Link
              to="/order"
              className="inline-block px-12 py-6 rounded-full bg-white text-kid-primary text-3xl font-playful font-bold hover:bg-kid-cream transition-all duration-300 transform hover:scale-110 shadow-2xl border-4 border-kid-primary"
            >
              Order Now! 🚀
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;