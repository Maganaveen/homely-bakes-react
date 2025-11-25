import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-2xl mr-4">📍</span>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">123 Baker Street, Sweet City, SC 12345</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-2xl mr-4">📞</span>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-2xl mr-4">📧</span>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">info@homemadecakes.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-2xl mr-4">🕒</span>
                <div>
                  <h3 className="font-semibold">Hours</h3>
                  <p className="text-gray-600">Mon-Sat: 8AM-8PM<br />Sunday: 10AM-6PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg"
                required
              />
              
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border rounded-lg"
                required
              />
              
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 border rounded-lg"
                required
              />
              
              <textarea
                placeholder="Your Message"
                className="w-full p-3 border rounded-lg h-32"
                required
              />
              
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-center mb-8">Find Us</h2>
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Map would be integrated here</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;