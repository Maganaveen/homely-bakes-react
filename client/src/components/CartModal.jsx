import { useCart } from '../context/CartContext';

const CartModal = ({ isOpen, onClose, userId }) => {
  const { cartItems, removeFromCart } = useCart();

  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '30px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#333' }}>Shopping Cart</h2>
          <button onClick={onClose} style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666'
          }}>×</button>
        </div>
        
        {cartItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px 0' }}>Your cart is empty</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.cakeId} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px 0',
                borderBottom: '1px solid #eee'
              }}>
                <img src={item.image} alt={item.name} style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginRight: '15px'
                }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{item.name}</h4>
                  <p style={{ margin: 0, color: '#666' }}>Qty: {item.quantity} × {item.price}</p>
                </div>
                <button onClick={() => removeFromCart(userId, item.cakeId)} style={{
                  background: '#ff4757',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}>Remove</button>
              </div>
            ))}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <h3 style={{ color: '#333' }}>Total: ${total.toFixed(2)}</h3>
              <button style={{
                background: 'linear-gradient(135deg, #D4A574, #8B4513)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 30px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '10px'
              }}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;