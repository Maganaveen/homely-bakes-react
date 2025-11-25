import { useState } from 'react';

const CakeModal = ({ cake, isOpen, onClose }) => {
  const [selectedWeight, setSelectedWeight] = useState('1kg');
  const [isLiked, setIsLiked] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen || !cake) return null;

  const weightOptions = [
    { weight: '0.5kg', price: Math.round(cake.price.replace('₹', '') * 0.7) },
    { weight: '1kg', price: cake.price.replace('₹', '') },
    { weight: '2kg', price: Math.round(cake.price.replace('₹', '') * 1.8) },
    { weight: '3kg', price: Math.round(cake.price.replace('₹', '') * 2.5) }
  ];

  const offers = [
    "Get upto ₹100 Cashback on paying via Mobikwik wallet, minimum order value ₹699 *T&C",
    "Use Coupon Code: WIN50 to get ₹50 off",
    "Get up to ₹100 cashback on payments via MobiKwik UPI at Winni, minimum order value ₹699 *T&C",
    "Use Coupon Code: TRYWINNI to get 20% off"
  ];

  const productDetails = {
    "Chocolate Cake": {
      flavour: "Chocolate Truffle",
      shape: "Round",
      type: "Cream Cake",
      sponge: "Chocolate",
      cream: "Chocolate",
      filling: "Dark Chocolate Cream",
      toppings: "Chocolate Garnish & Cocoa Powder",
      quantity: "1 Cake"
    },
    "Red Velvet": {
      flavour: "Red Velvet",
      shape: "Round",
      type: "Cream Cake",
      sponge: "Red Velvet",
      cream: "Cream Cheese",
      filling: "Cream Cheese Frosting",
      toppings: "Red Velvet Crumbs",
      quantity: "1 Cake"
    },
    "Black Forest": {
      flavour: "Black Forest",
      shape: "Round",
      type: "Cream Cake",
      sponge: "Chocolate",
      cream: "Whipped Cream",
      filling: "Cherry & Chocolate Cream",
      toppings: "Red Cherry & Chocolate Shavings",
      quantity: "1 Cake"
    }
  };

  const details = productDetails[cake.name] || {
    flavour: cake.name,
    shape: "Round",
    type: "Cream Cake",
    sponge: "Vanilla",
    cream: "Buttercream",
    filling: "Vanilla Cream",
    toppings: "Decorative Frosting",
    quantity: "1 Cake"
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    },
    modal: {
      backgroundColor: '#2d2d2d',
      borderRadius: '1rem',
      maxWidth: '900px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      position: 'relative'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem',
      borderBottom: '1px solid #4a4a4a'
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '2rem',
      cursor: 'pointer'
    },
    content: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
      padding: '1.5rem'
    },
    imageSection: {
      position: 'relative'
    },
    image: {
      width: '100%',
      height: '300px',
      objectFit: 'cover',
      borderRadius: '0.5rem'
    },
    likeBtn: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'rgba(0,0,0,0.5)',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '1.5rem'
    },
    detailsSection: {
      color: 'white'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: 'white'
    },
    price: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#ec4899',
      marginBottom: '1rem'
    },
    weightOptions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.5rem',
      marginBottom: '1.5rem'
    },
    weightBtn: {
      padding: '0.75rem',
      border: '2px solid #4a4a4a',
      borderRadius: '0.5rem',
      backgroundColor: '#1a1a1a',
      color: 'white',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    },
    selectedWeight: {
      borderColor: '#ec4899',
      backgroundColor: '#ec4899'
    },
    messageInput: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #4a4a4a',
      borderRadius: '0.5rem',
      backgroundColor: '#1a1a1a',
      color: 'white',
      marginBottom: '1.5rem',
      resize: 'vertical',
      minHeight: '80px'
    },
    offersSection: {
      marginBottom: '1.5rem'
    },
    sectionTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#ec4899'
    },
    offer: {
      backgroundColor: '#1a1a1a',
      padding: '0.5rem',
      borderRadius: '0.25rem',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      border: '1px solid #4a4a4a'
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem',
      marginBottom: '1.5rem'
    },
    detailItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.5rem',
      backgroundColor: '#1a1a1a',
      borderRadius: '0.25rem',
      fontSize: '0.9rem'
    },
    orderBtn: {
      width: '100%',
      padding: '1rem',
      background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>{cake.name}</h2>
          <button style={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        
        <div style={styles.content}>
          <div style={styles.imageSection}>
            <img src={cake.image} alt={cake.name} style={styles.image} />
            <button 
              style={styles.likeBtn}
              onClick={() => setIsLiked(!isLiked)}
            >
              {isLiked ? '❤️' : '🤍'}
            </button>
          </div>
          
          <div style={styles.detailsSection}>
            <div style={styles.price}>₹{weightOptions.find(w => w.weight === selectedWeight)?.price}</div>
            
            <div style={styles.weightOptions}>
              {weightOptions.map(option => (
                <button
                  key={option.weight}
                  style={{
                    ...styles.weightBtn,
                    ...(selectedWeight === option.weight ? styles.selectedWeight : {})
                  }}
                  onClick={() => setSelectedWeight(option.weight)}
                >
                  {option.weight}<br />₹{option.price}
                </button>
              ))}
            </div>
            
            <textarea
              style={styles.messageInput}
              placeholder="Message on cake (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            
            <div style={styles.offersSection}>
              <h3 style={styles.sectionTitle}>Available Offers</h3>
              {offers.map((offer, index) => (
                <div key={index} style={styles.offer}>{offer}</div>
              ))}
            </div>
            
            <div>
              <h3 style={styles.sectionTitle}>Product Details</h3>
              <div style={styles.detailsGrid}>
                <div style={styles.detailItem}>
                  <span>Cake Flavour:</span>
                  <span>{details.flavour}</span>
                </div>
                <div style={styles.detailItem}>
                  <span>Shape:</span>
                  <span>{details.shape}</span>
                </div>
                <div style={styles.detailItem}>
                  <span>Type of Cake:</span>
                  <span>{details.type}</span>
                </div>
                <div style={styles.detailItem}>
                  <span>Type of Sponge:</span>
                  <span>{details.sponge}</span>
                </div>
                <div style={styles.detailItem}>
                  <span>Type of Cream:</span>
                  <span>{details.cream}</span>
                </div>
                <div style={styles.detailItem}>
                  <span>Filling in Layers:</span>
                  <span>{details.filling}</span>
                </div>
                <div style={styles.detailItem}>
                  <span>Toppings:</span>
                  <span>{details.toppings}</span>
                </div>
                <div style={styles.detailItem}>
                  <span>Net Quantity:</span>
                  <span>{details.quantity}</span>
                </div>
              </div>
            </div>
            
            <button style={styles.orderBtn}>
              Add to Cart - {selectedWeight} ₹{weightOptions.find(w => w.weight === selectedWeight)?.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeModal;