import { useCart } from '../context/CartContext';

const CartPopup = () => {
  const { showPopup, popupMessage } = useCart();

  if (!showPopup) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, #D4A574, #8B4513)',
      color: 'white',
      padding: '15px 25px',
      borderRadius: '10px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      zIndex: 1000,
      animation: 'slideIn 0.3s ease-out',
      fontSize: '16px',
      fontWeight: '600'
    }}>
      ✅ {popupMessage}
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CartPopup;