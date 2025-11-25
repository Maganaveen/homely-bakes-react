import { useState } from 'react';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

const CheckoutModal = ({ isOpen, onClose, orderDetails }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          ...orderDetails
        })
      });

      if (response.ok) {
        const result = await response.json();
        // console.log('Order successful:', result);
        setOrderId(result.orderId);
        setShowSuccess(true);
        // Reset form but don't close modal yet
        setFormData({ name: '', email: '', phone: '', address: '' });
      } else {
        setErrorMessage('Failed to place order. Please try again.');
        setShowError(true);
      }
    } catch (error) {
      console.error('Order error:', error);
      setErrorMessage('Error placing order. Please check your connection and try again.');
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
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
      maxWidth: '500px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    header: {
      padding: '1.5rem',
      borderBottom: '1px solid #4a4a4a',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white'
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '1.5rem',
      cursor: 'pointer'
    },
    content: {
      padding: '1.5rem'
    },
    orderSummary: {
      backgroundColor: '#1a1a1a',
      padding: '1rem',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
      color: 'white'
    },
    summaryTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#ec4899'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      color: 'white',
      marginBottom: '0.5rem',
      fontWeight: '500'
    },
    input: {
      padding: '0.75rem',
      border: '2px solid #4a4a4a',
      borderRadius: '0.5rem',
      backgroundColor: '#1a1a1a',
      color: 'white',
      fontSize: '1rem'
    },
    textarea: {
      padding: '0.75rem',
      border: '2px solid #4a4a4a',
      borderRadius: '0.5rem',
      backgroundColor: '#1a1a1a',
      color: 'white',
      fontSize: '1rem',
      minHeight: '80px',
      resize: 'vertical'
    },
    submitBtn: {
      padding: '1rem',
      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '1rem'
    },
    disabledBtn: {
      opacity: 0.6,
      cursor: 'not-allowed'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Complete Your Order</h2>
          <button style={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        
        <div style={styles.content}>
          <div style={styles.orderSummary}>
            <h3 style={styles.summaryTitle}>Order Summary</h3>
            <p><strong>Cake:</strong> {orderDetails?.cakeName}</p>
            <p><strong>Option:</strong> {orderDetails?.selectedOption}</p>
            <p><strong>Quantity:</strong> {orderDetails?.quantity}</p>
            <p><strong>Total:</strong> ₹{orderDetails?.totalPrice}</p>
            {orderDetails?.message && <p><strong>Message:</strong> {orderDetails.message}</p>}
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name *</label>
              <input
                type="text"
                style={styles.input}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email *</label>
              <input
                type="email"
                style={styles.input}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number *</label>
              <input
                type="tel"
                style={styles.input}
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Delivery Address *</label>
              <textarea
                style={styles.textarea}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Enter your complete delivery address"
                required
              />
            </div>

            <button 
              type="submit" 
              style={{
                ...styles.submitBtn,
                ...(isSubmitting ? styles.disabledBtn : {})
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Placing Order...' : `Place Order - ₹${orderDetails?.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
      
      <SuccessAlert 
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onClose(); // Close checkout modal when success alert is closed
        }}
        orderId={orderId}
      />
      
      <ErrorAlert 
        isOpen={showError}
        onClose={() => setShowError(false)}
        message={errorMessage}
      />
    </div>
  );
};

export default CheckoutModal;