import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500" 
              alt="Baker at work"
              className="rounded-lg shadow-lg"
            />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, Homemade Cakes started as a small family business with a passion 
              for creating delicious, handcrafted cakes. We believe that every celebration 
              deserves a special cake made with the finest ingredients and lots of love.
            </p>
            <p className="text-gray-600 mb-4">
              Our team of skilled bakers works tirelessly to ensure that each cake is not only 
              beautiful but also incredibly delicious. We use only the freshest ingredients 
              and traditional baking methods to create cakes that will make your special 
              moments even more memorable.
            </p>
            <p className="text-gray-600">
              From birthdays to weddings, anniversaries to corporate events, we're here to 
              make your celebrations sweeter with our homemade cakes.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl mb-4">🥧</div>
              <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">We use only the finest, freshest ingredients in all our cakes.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">👨‍🍳</div>
              <h3 className="text-xl font-semibold mb-2">Expert Bakers</h3>
              <p className="text-gray-600">Our skilled bakers have years of experience in creating perfect cakes.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🎂</div>
              <h3 className="text-xl font-semibold mb-2">Custom Orders</h3>
              <p className="text-gray-600">We can customize cakes according to your specific requirements.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;