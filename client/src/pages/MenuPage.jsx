import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MenuPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  const categories = ['All', 'Cakes', 'Cupcakes', 'Cookies', 'Desserts', 'Hampers'];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/cakes');
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else {
          // Fallback data
          setItems([
            { name: "Chocolate Cake", price: "₹899", image: "/images/chocolate-cake.jpg", category: "Cakes", description: "Rich and decadent chocolate cake with layers of smooth chocolate ganache." },
            { name: "Red Velvet", price: "₹1299", image: "/images/velvet.jpg", category: "Cakes", description: "Classic red velvet cake with cream cheese frosting and a hint of cocoa." },
            { name: "Black Forest", price: "₹1199", image: "/images/black-forest-cake.jpg", category: "Cakes", description: "Traditional German cake with cherries, chocolate, and whipped cream." },
            { name: "Vanilla Sponge", price: "₹799", image: "/images/vanilla-sponge1.jpg", category: "Cakes", description: "Light and fluffy vanilla sponge cake with buttercream frosting." },
            { name: "Strawberry Cake", price: "₹999", image: "/images/strawberry-cake.jpg", category: "Cakes", description: "Fresh strawberry cake with strawberry cream and real fruit pieces." },
            { name: "Butterscotch Cake", price: "₹949", image: "/images/butterscotch-cake.jpg", category: "Cakes", description: "Sweet butterscotch flavored cake with caramel drizzle." },
            { name: "Pineapple Cake", price: "₹849", image: "/images/pineapple-cake.jpg", category: "Cakes", description: "Tropical pineapple cake with chunks of fresh pineapple." },
            { name: "Mango Cake", price: "₹1099", image: "/images/mango-cake.jpg", category: "Cakes", description: "Seasonal mango cake with fresh mango pulp and cream." },
            { name: "Carrot Cake", price: "₹1149", image: "/images/carrot-cake.jpg", category: "Cakes", description: "Moist carrot cake with walnuts and cream cheese frosting." },
            { name: "Lemon Cake", price: "₹899", image: "/images/lemon-cake.jpg", category: "Cakes", description: "Zesty lemon cake with lemon glaze and fresh citrus flavor." },
            { name: "Coffee Cake", price: "₹1049", image: "/images/coffee-cake.jpg", category: "Cakes", description: "Rich coffee flavored cake perfect for coffee lovers." },
            { name: "Fruit Cake", price: "₹1299", image: "/images/fruit-cake.jpg", category: "Cakes", description: "Traditional fruit cake loaded with dried fruits and nuts." },
            { name: "Chocolate Cupcakes", price: "₹299", image: "/images/chocolate-cupcakes.jpg", category: "Cupcakes", description: "Individual chocolate cupcakes with chocolate frosting." },
            { name: "Vanilla Cupcakes", price: "₹249", image: "/images/vanilla-cupcakes.jpg", category: "Cupcakes", description: "Classic vanilla cupcakes with vanilla buttercream." },
            { name: "Red Velvet Cupcakes", price: "₹349", image: "/images/red-velvet-cupcakes.jpg", category: "Cupcakes", description: "Mini red velvet cupcakes with cream cheese frosting." },
            { name: "Funfetti Cupcakes", price: "₹299", image: "/images/funfetti-cupcakes.jpg", category: "Cupcakes", description: "Colorful funfetti cupcakes perfect for celebrations." },
            { name: "Chocolate Chip Cookies", price: "₹199", image: "/images/chocolate-chip-cookies.jpg", category: "Cookies", description: "Classic chocolate chip cookies, crispy outside and chewy inside." },
            { name: "Oatmeal Cookies", price: "₹179", image: "/images/oatmeal-cookies.jpg", category: "Cookies", description: "Healthy oatmeal cookies with raisins and nuts." },
            { name: "Sugar Cookies", price: "₹159", image: "/images/sugar-cookies.jpg", category: "Cookies", description: "Simple and sweet sugar cookies, perfect with tea or coffee." },
            { name: "Ginger Cookies", price: "₹189", image: "/images/ginger-cookies.jpg", category: "Cookies", description: "Spiced ginger cookies with a warm, aromatic flavor." },
            { name: "Tiramisu", price: "₹449", image: "/images/tiramisu.jpg", category: "Desserts", description: "Italian coffee-flavored dessert with mascarpone and ladyfingers." },
            { name: "Cheesecake", price: "₹549", image: "/images/cheesecake.jpg", category: "Desserts", description: "Creamy New York style cheesecake with graham cracker crust." },
            { name: "Chocolate Mousse", price: "₹349", image: "/images/chocolate-mousse.jpg", category: "Desserts", description: "Light and airy chocolate mousse with whipped cream." },
            { name: "Panna Cotta", price: "₹299", image: "/images/panna-cotta.jpg", category: "Desserts", description: "Silky Italian dessert with berry compote." },
            { name: "Brownie", price: "₹249", image: "/images/brownie.jpg", category: "Desserts", description: "Fudgy chocolate brownies with nuts and chocolate chips." },
            { name: "Birthday Hamper", price: "₹1999", image: "/images/birthday-hamper.jpg", category: "Hampers", description: "Complete birthday celebration package with cake and treats." },
            { name: "Anniversary Hamper", price: "₹2499", image: "/images/anniversary-hamper.jpg", category: "Hampers", description: "Romantic anniversary hamper with special treats for two." },
            { name: "Festival Hamper", price: "₹1799", image: "/images/festival-hamper.jpg", category: "Hampers", description: "Festive collection of sweets and treats for celebrations." },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch items:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Navigation */}
      <nav style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e9ecef', 
        position: 'sticky', 
        top: 0, 
        zIndex: 50,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button 
              onClick={() => navigate('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#495057',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.7'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img src="./images/my-logo-1.png" alt="Logo" style={{ height: '32px', width: '32px' }} />
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#d4a574' }}>Homely Bakes</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section style={{
        padding: '2rem 0',
        background: 'linear-gradient(135deg, #d4a574 0%, #c19a6b 50%, #8b4513 100%)',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '10%',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '35%',
          right: '15%',
          width: '25px',
          height: '25px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center', flex: '1', minWidth: '300px' }}>
              <div style={{
                display: 'inline-block',
                marginBottom: '1.5rem',
                padding: '0.5rem 1.5rem',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '25px',
                fontSize: '0.875rem',
                fontWeight: '500',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                ✨ Artisan Collection
              </div>
              
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '700',
                marginBottom: '1.5rem',
                fontFamily: 'Georgia, serif',
                lineHeight: '1.1',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                background: 'linear-gradient(45deg, #fff, #f8f8f8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Complete Menu
              </h1>
              
              <p style={{
                fontSize: '1.375rem',
                opacity: 0.95,
                fontWeight: '300',
                maxWidth: '500px',
                margin: '0 auto 2rem',
                lineHeight: '1.6',
                letterSpacing: '0.02em'
              }}>
                Discover our handcrafted collection of premium cakes, cookies, and desserts
              </p>
            </div>
            
            <div style={{ position: 'relative' }}>
              <img 
                src="./images/annivesary-banner.jpg" 
                alt="Delicious Chocolate Cake" 
                style={{
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '6px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  animation: 'gentle-bounce 3s ease-in-out infinite'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                background: 'rgba(255,255,255,0.9)',
                borderRadius: '50%',
                padding: '0.75rem',
                fontSize: '1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}>
                🍰
              </div>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍰</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Fresh Daily</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👨‍🍳</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Artisan Made</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌟</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Premium Quality</div>
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          @keyframes gentle-bounce {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </section>

      {/* Category Filter */}
      <section style={{
        padding: '2rem 0',
        backgroundColor: 'white',
        borderBottom: '1px solid #e9ecef'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: selectedCategory === category ? '#d4a574' : '#f8f9fa',
                  color: selectedCategory === category ? 'white' : '#495057',
                  boxShadow: selectedCategory === category ? '0 4px 12px rgba(212, 165, 116, 0.3)' : 'none'
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.backgroundColor = '#e9ecef';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.backgroundColor = '#f8f9fa';
                  }
                }}
              >
                {category}
                {category !== 'All' && (
                  <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', opacity: 0.75 }}>
                    ({items.filter(item => item.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          {loading ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} style={{
                  backgroundColor: '#e9ecef',
                  borderRadius: '16px',
                  height: '400px',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}></div>
              ))}
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.875rem',
                  fontWeight: 'bold',
                  color: '#343a40',
                  fontFamily: 'serif'
                }}>
                  {selectedCategory === 'All' ? 'All Items' : selectedCategory}
                  <span style={{
                    marginLeft: '0.75rem',
                    fontSize: '1.125rem',
                    fontWeight: 'normal',
                    color: '#6c757d'
                  }}>
                    ({filteredItems.length} items)
                  </span>
                </h2>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem'
              }}>
                {filteredItems.map((item, index) => (
                  <div 
                    key={index} 
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: '1px solid #e9ecef'
                    }}
                    onClick={() => navigate(`/cake/${index + 1}`)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem'
                      }}>
                        <span style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#495057'
                        }}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#343a40',
                        marginBottom: '0.5rem',
                        transition: 'color 0.3s ease'
                      }}>
                        {item.name}
                      </h3>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#6c757d',
                        marginBottom: '1rem',
                        lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {item.description || "Delicious handcrafted treat made with premium ingredients."}
                      </p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <span style={{
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          color: '#d4a574'
                        }}>
                          {item.price}
                        </span>
                        <button 
                          style={{
                            backgroundColor: '#d4a574',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: index + 1,
                              name: item.name,
                              price: parseInt(item.price.replace('₹', '')),
                              image: item.image,
                              selectedOption: '1 Kg',
                              quantity: 1
                            });
                            alert('Added to cart!');
                          }}
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#c68e17';
                            e.target.style.transform = 'scale(1.05)';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#d4a574';
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredItems.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍰</div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#343a40',
                    marginBottom: '0.5rem'
                  }}>
                    No items found
                  </h3>
                  <p style={{ color: '#6c757d' }}>Try selecting a different category</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#343a40', color: 'white', padding: '3rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <img src="./images/my-logo-1.png" alt="Logo" style={{ height: '32px', width: '32px' }} />
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Homely Bakes</span>
              </div>
              <p style={{ color: '#adb5bd' }}>
                Handcrafted with passion, delivered with love.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button 
                  onClick={() => navigate('/')} 
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#adb5bd',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = 'white'}
                  onMouseOut={(e) => e.target.style.color = '#adb5bd'}
                >
                  Home
                </button>
                <button 
                  onClick={() => navigate('/menu')} 
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#adb5bd',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = 'white'}
                  onMouseOut={(e) => e.target.style.color = '#adb5bd'}
                >
                  Menu
                </button>
              </div>
            </div>
            
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#adb5bd' }}>
                <p>hello@homelybakes.com</p>
                <p>123 Baker Street, Sweet City</p>
              </div>
            </div>
          </div>
          
          <div style={{ 
            borderTop: '1px solid #495057', 
            marginTop: '2rem', 
            paddingTop: '2rem', 
            textAlign: 'center', 
            color: '#adb5bd' 
          }}>
            <p>&copy; 2024 Homely Bakes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MenuPage;