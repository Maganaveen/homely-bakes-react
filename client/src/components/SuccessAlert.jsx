import { useEffect } from 'react';

const SuccessAlert = ({ isOpen, onClose, orderId }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
      animation: 'fadeIn 0.3s ease-out'
    },
    modal: {
      backgroundColor: '#2d2d2d',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      maxWidth: '320px',
      width: '85%',
      textAlign: 'center',
      position: 'relative',
      animation: 'slideUp 0.4s ease-out'
    },
    successIcon: {
      width: '60px',
      height: '60px',
      backgroundColor: '#10b981',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem',
      animation: 'bounce 0.6s ease-out'
    },
    checkmark: {
      fontSize: '2.5rem',
      color: 'white'
    },
    title: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: '#10b981',
      marginBottom: '0.75rem'
    },
    message: {
      fontSize: '0.95rem',
      color: '#e2e8f0',
      lineHeight: '1.5',
      marginBottom: '1rem'
    },
    orderId: {
      backgroundColor: '#1a1a1a',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
      border: '1px solid #4a4a4a'
    },
    orderIdLabel: {
      fontSize: '0.9rem',
      color: '#9ca3af',
      marginBottom: '0.25rem'
    },
    orderIdValue: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#ec4899',
      fontFamily: 'monospace'
    },
    closeBtn: {
      padding: '0.75rem 2rem',
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s ease'
    },
    progressBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '4px',
      backgroundColor: '#10b981',
      borderRadius: '0 0 1rem 1rem',
      animation: 'progress 5s linear forwards'
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(30px) scale(0.9);
            }
            to { 
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
          
          @keyframes progress {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>
      
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div style={styles.successIcon}>
            <span style={styles.checkmark}>✓</span>
          </div>
          
          <h2 style={styles.title}>Order Placed Successfully!</h2>
          
          <p style={styles.message}>
            Thank you for your order! We have received your request and will contact you soon to confirm the details.
          </p>
          
          {orderId && (
            <div style={styles.orderId}>
              <div style={styles.orderIdLabel}>Order ID</div>
              <div style={styles.orderIdValue}>{orderId}</div>
            </div>
          )}
          
          <p style={{...styles.message, fontSize: '1rem', marginBottom: '2rem'}}>
            📞 You will receive a confirmation call shortly<br/>
            📧 Check your email for order details
          </p>
          
          <button 
            style={styles.closeBtn}
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Continue Shopping
          </button>
          
          <div style={styles.progressBar}></div>
        </div>
      </div>
    </>
  );
};

export default SuccessAlert;