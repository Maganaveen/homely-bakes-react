import { useEffect } from 'react';

const ErrorAlert = ({ isOpen, onClose, message }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
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
      borderRadius: '1rem',
      padding: '2rem',
      maxWidth: '400px',
      width: '90%',
      textAlign: 'center',
      position: 'relative',
      animation: 'slideUp 0.4s ease-out'
    },
    errorIcon: {
      width: '80px',
      height: '80px',
      backgroundColor: '#ef4444',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem',
      animation: 'shake 0.6s ease-out'
    },
    xmark: {
      fontSize: '2.5rem',
      color: 'white'
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#ef4444',
      marginBottom: '1rem'
    },
    message: {
      fontSize: '1.1rem',
      color: '#e2e8f0',
      lineHeight: '1.6',
      marginBottom: '2rem'
    },
    closeBtn: {
      padding: '0.75rem 2rem',
      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
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
      backgroundColor: '#ef4444',
      borderRadius: '0 0 1rem 1rem',
      animation: 'progress 4s linear forwards'
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
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          
          @keyframes progress {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>
      
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div style={styles.errorIcon}>
            <span style={styles.xmark}>✕</span>
          </div>
          
          <h2 style={styles.title}>Order Failed</h2>
          
          <p style={styles.message}>
            {message || 'Failed to place order. Please try again.'}
          </p>
          
          <button 
            style={styles.closeBtn}
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Try Again
          </button>
          
          <div style={styles.progressBar}></div>
        </div>
      </div>
    </>
  );
};

export default ErrorAlert;