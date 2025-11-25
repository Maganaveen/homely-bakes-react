import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';

const CakeDetailsPage = () => {
  const { cakeId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [cake, setCake] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const cakeData = [
    { id: 1, name: "Chocolate Cake", price: 899, image: "/images/chocolate-cake.jpg", category: "Cakes", description: "Rich and decadent chocolate cake with layers of smooth chocolate ganache." },
    { id: 2, name: "Red Velvet", price: 1299, image: "/images/red-velvet-cake.jpg", category: "Cakes", description: "Classic red velvet cake with cream cheese frosting and a hint of cocoa." },
    { id: 3, name: "Black Forest", price: 1199, image: "/images/black-forest-cake.jpg", category: "Cakes", description: "Traditional German cake with cherries, chocolate, and whipped cream." },
    { id: 4, name: "Vanilla Sponge", price: 799, image: "/images/vanilla-sponge1.jpg", category: "Cakes", description: "Light and fluffy vanilla sponge cake with buttercream frosting." },
    { id: 5, name: "Strawberry Cake", price: 999, image: "/images/strawberry-cake.jpg", category: "Cakes", description: "Fresh strawberry cake with strawberry cream and real fruit pieces." },
    { id: 6, name: "Butterscotch Cake", price: 949, image: "/images/butterscotch-cake.jpg", category: "Cakes", description: "Sweet butterscotch flavored cake with caramel drizzle." },
    { id: 7, name: "Pineapple Cake", price: 849, image: "/images/pineapple-cake.jpg", category: "Cakes", description: "Tropical pineapple cake with chunks of fresh pineapple." },
    { id: 8, name: "Mango Cake", price: 1099, image: "/images/mango-cake.jpg", category: "Cakes", description: "Seasonal mango cake with fresh mango pulp and cream." },
    { id: 9, name: "Carrot Cake", price: 1149, image: "/images/carrot-cake.jpg", category: "Cakes", description: "Moist carrot cake with walnuts and cream cheese frosting." },
    { id: 10, name: "Lemon Cake", price: 899, image: "/images/lemon-cake.jpg", category: "Cakes", description: "Zesty lemon cake with lemon glaze and fresh citrus flavor." },
    { id: 11, name: "Coffee Cake", price: 1049, image: "/images/coffee-cake.jpg", category: "Cakes", description: "Rich coffee flavored cake perfect for coffee lovers." },
    { id: 12, name: "Fruit Cake", price: 1299, image: "/images/fruit-cake.jpg", category: "Cakes", description: "Traditional fruit cake loaded with dried fruits and nuts." },
    { id: 13, name: "Chocolate Cupcakes", price: 299, image: "/images/chocolate-cupcakes.jpg", category: "Cupcakes", description: "Individual chocolate cupcakes with chocolate frosting." },
    { id: 14, name: "Vanilla Cupcakes", price: 249, image: "/images/vanilla-cupcakes.jpg", category: "Cupcakes", description: "Classic vanilla cupcakes with vanilla buttercream." },
    { id: 15, name: "Red Velvet Cupcakes", price: 349, image: "/images/red-velvet-cupcakes.jpg", category: "Cupcakes", description: "Mini red velvet cupcakes with cream cheese frosting." },
    { id: 16, name: "Funfetti Cupcakes", price: 299, image: "/images/funfetti-cupcakes.jpg", category: "Cupcakes", description: "Colorful funfetti cupcakes perfect for celebrations." },
    { id: 17, name: "Chocolate Chip Cookies", price: 199, image: "/images/chocolate-chip-cookies.jpg", category: "Cookies", description: "Classic chocolate chip cookies, crispy outside and chewy inside." },
    { id: 18, name: "Oatmeal Cookies", price: 179, image: "/images/oatmeal-cookies.jpg", category: "Cookies", description: "Healthy oatmeal cookies with raisins and nuts." },
    { id: 19, name: "Sugar Cookies", price: 159, image: "/images/sugar-cookies.jpg", category: "Cookies", description: "Simple and sweet sugar cookies, perfect with tea or coffee." },
    { id: 20, name: "Ginger Cookies", price: 189, image: "/images/ginger-cookies.jpg", category: "Cookies", description: "Spiced ginger cookies with a warm, aromatic flavor." },
    { id: 21, name: "Tiramisu", price: 449, image: "/images/tiramisu.jpg", category: "Desserts", description: "Italian coffee-flavored dessert with mascarpone and ladyfingers." },
    { id: 22, name: "Cheesecake", price: 549, image: "/images/cheesecake.jpg", category: "Desserts", description: "Creamy New York style cheesecake with graham cracker crust." },
    { id: 23, name: "Chocolate Mousse", price: 349, image: "/images/chocolate-mousse.jpg", category: "Desserts", description: "Light and airy chocolate mousse with whipped cream." },
    { id: 24, name: "Panna Cotta", price: 299, image: "/images/panna-cotta.jpg", category: "Desserts", description: "Silky Italian dessert with berry compote." },
    { id: 25, name: "Brownie", price: 249, image: "/images/brownie.jpg", category: "Desserts", description: "Fudgy chocolate brownies with nuts and chocolate chips." },
    { id: 26, name: "Birthday Hamper", price: 1999, image: "/images/birthday-hamper.jpg", category: "Hampers", description: "Complete birthday celebration package with cake and treats." },
    { id: 27, name: "Anniversary Hamper", price: 2499, image: "/images/anniversary-hamper.jpg", category: "Hampers", description: "Romantic anniversary hamper with special treats for two." },
    { id: 28, name: "Festival Hamper", price: 1799, image: "/images/festival-hamper.jpg", category: "Hampers", description: "Festive collection of sweets and treats for celebrations." },
  ];

  useEffect(() => {
    const foundCake = cakeData.find(c => c.id === parseInt(cakeId)) || cakeData[0];
    setCake(foundCake);
    setSelectedOption(getOptions(foundCake)[0]?.label || '');
  }, [cakeId]);

  const getOptions = (cake) => {
    if (cake.category === 'Cupcakes') {
      return [
        { label: '6 Pieces', price: cake.price },
        { label: '12 Pieces', price: cake.price * 1.8 },
        { label: '24 Pieces', price: cake.price * 3.2 }
      ];
    } else if (cake.category === 'Cookies') {
      return [
        { label: '250g', price: cake.price },
        { label: '500g', price: cake.price * 1.8 },
        { label: '1kg', price: cake.price * 3.2 }
      ];
    } else if (cake.category === 'Hampers') {
      return [
        { label: 'Standard', price: cake.price },
        { label: 'Premium', price: cake.price * 1.5 },
        { label: 'Deluxe', price: cake.price * 2 }
      ];
    } else {
      return [
        { label: '0.5 Kg', price: cake.price },
        { label: '1 Kg', price: cake.price * 1.8 },
        { label: '1.5 Kg', price: cake.price * 2.5 },
        { label: '2 Kg', price: cake.price * 3.2 }
      ];
    }
  };

  if (!cake) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  const options = getOptions(cake);
  const selectedPrice = options.find(opt => opt.label === selectedOption)?.price || cake.price;
  const totalPrice = selectedPrice * quantity;

  const offers = [
    "Get 10% off on orders above ₹1000",
    "Free delivery on orders above ₹500",
    "Buy 2 get 1 free on selected items"
  ];

  const details = {
    flavour: cake.name.includes('Chocolate') ? 'Chocolate' : cake.name.includes('Vanilla') ? 'Vanilla' : 'Mixed',
    shape: 'Round',
    type: 'Fresh Cream',
    sponge: 'Vanilla',
    cream: 'Whipped Cream',
    filling: 'Chocolate Ganache',
    toppings: 'Chocolate Chips',
    quantity: selectedOption || '1 Kg'
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem 0',
        borderBottom: '1px solid #e9ecef',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#495057',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Back
          </button>
          <div style={{
            fontSize: '0.875rem',
            color: '#6c757d'
          }}>
            Home / Menu / {cake.category} / {cake.name}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem'
      }}>
        {/* Image Section */}
        <div>
          <div style={{
            position: 'relative',
            marginBottom: '1rem'
          }}>
            <img 
              src={cake.image} 
              alt={cake.name}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}
            />
            <button 
              onClick={() => setIsLiked(!isLiked)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                fontSize: '1.5rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              {isLiked ? '❤️' : '🤍'}
            </button>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem'
          }}>
            {[cake.image, cake.image, cake.image, cake.image].map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${cake.name} ${index + 1}`}
                style={{
                  width: '100%',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'border-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.borderColor = '#d4a574'}
                onMouseOut={(e) => e.target.style.borderColor = 'transparent'}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#343a40'
          }}>
            {cake.name}
          </h1>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <span style={{ color: '#ffc107' }}>⭐⭐⭐⭐⭐</span>
            <span style={{ color: '#6c757d' }}>(4.8/5 - 124 reviews)</span>
          </div>
          
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#d4a574',
            marginBottom: '1.5rem'
          }}>
            ₹{totalPrice}
          </div>

          {/* Options Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#343a40'
            }}>
              {cake.category === 'Cupcakes' ? 'Select Box Size' : 
               cake.category === 'Cookies' ? 'Select Packet Size' :
               cake.category === 'Hampers' ? 'Select Quantity' : 'Select Weight'}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem'
            }}>
              {options.map(option => (
                <div
                  key={option.label}
                  onClick={() => setSelectedOption(option.label)}
                  style={{
                    padding: '1rem',
                    border: `2px solid ${selectedOption === option.label ? '#d4a574' : '#e9ecef'}`,
                    borderRadius: '12px',
                    backgroundColor: selectedOption === option.label ? '#d4a574' : 'white',
                    color: selectedOption === option.label ? 'white' : '#343a40',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{option.label}</div>
                  <div>₹{option.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#343a40'
            }}>
              Quantity
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '40px',
                  height: '40px',
                  border: '2px solid #e9ecef',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                -
              </button>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                minWidth: '40px',
                textAlign: 'center'
              }}>
                {quantity}
              </div>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: '40px',
                  height: '40px',
                  border: '2px solid #e9ecef',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Message on Cake */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#343a40'
            }}>
              Message on Cake (Optional)
            </h3>
            <textarea
              placeholder="Enter your custom message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e9ecef',
                borderRadius: '12px',
                backgroundColor: 'white',
                minHeight: '100px',
                fontSize: '1rem',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Available Offers */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#343a40'
            }}>
              Available Offers
            </h3>
            {offers.map((offer, index) => (
              <div key={index} style={{
                backgroundColor: '#e8f5e8',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '0.5rem',
                border: '1px solid #c3e6c3',
                fontSize: '0.9rem',
                color: '#2d5a2d'
              }}>
                🎉 {offer}
              </div>
            ))}
          </div>

          {/* Product Details */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#343a40'
            }}>
              Product Details
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem'
            }}>
              {Object.entries(details).map(([key, value]) => (
                <div key={key} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  border: '1px solid #e9ecef'
                }}>
                  <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1')}:
                  </span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '1rem'
          }}>
            <button 
              onClick={() => {
                addToCart({
                  id: cake.id,
                  name: cake.name,
                  price: totalPrice,
                  image: cake.image,
                  selectedOption,
                  quantity,
                  message
                });
                alert('Added to cart!');
              }}
              style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, #6c757d, #495057)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Add to Cart
            </button>
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, #d4a574, #c68e17)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Buy Now - ₹{totalPrice}
            </button>
          </div>
        </div>
      </div>
      
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        orderDetails={{
          cakeName: cake.name,
          selectedOption,
          quantity,
          totalPrice,
          message
        }}
      />
    </div>
  );
};

export default CakeDetailsPage;