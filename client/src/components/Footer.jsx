const Footer = () => {
  const styles = {
    footer: {
      background: "linear-gradient(135deg, #1a1a1a, #0f0f0f)",
      padding: "3rem 2rem 2rem",
      marginTop: "4rem",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "2rem",
    },
    section: {
      color: "#e2e8f0",
    },
    title: {
      fontSize: "1.3rem",
      fontWeight: "700",
      marginBottom: "1rem",
      background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "0.75rem",
      fontSize: "0.95rem",
      color: "#cbd5e1",
    },
    socialLinks: {
      display: "flex",
      gap: "1rem",
      marginTop: "1rem",
    },
    socialLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
      borderRadius: "50%",
      color: "white",
      textDecoration: "none",
      fontSize: "1.2rem",
      transition: "all 0.3s ease",
    },
    bottom: {
      textAlign: "center",
      marginTop: "2rem",
      paddingTop: "2rem",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      color: "#94a3b8",
      fontSize: "0.9rem",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.title}>Contact Us</h3>
          <div style={styles.contactItem}>
            <span>📞</span>
            <span>(+91)-8838142150</span>
          </div>
          <div style={styles.contactItem}>
            <span>✉️</span>
            <span>homemadecakes@gmail.com</span>
          </div>
          <div style={styles.contactItem}>
            <span>📍</span>
            <span>57/f Mariamamn kovil street Vanniyarpalayam Cuddalore-607001.</span>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.title}>Business Hours</h3>
          <div style={styles.contactItem}>
            <span>🕒</span>
            <span>Mon - Fri: 8:00 AM - 8:00 PM</span>
          </div>
          <div style={styles.contactItem}>
            <span>🕒</span>
            <span>Sat - Sun: 9:00 AM - 6:00 PM</span>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.title}>Follow Us</h3>
          <div style={styles.socialLinks}>
            <a 
              href="https://instagram.com" 
              style={styles.socialLink}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(236, 72, 153, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              📷
            </a>
            <a 
              href="https://youtube.com" 
              style={styles.socialLink}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(236, 72, 153, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              📺
            </a>
            <a 
              href="https://facebook.com" 
              style={styles.socialLink}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(236, 72, 153, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              📘  
            </a>
            <a 
              href="https://twitter.com" 
              style={styles.socialLink}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(236, 72, 153, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              🐦
            </a>
          </div>
        </div>
      </div>
      
      <div style={styles.bottom}>
        <p>&copy; 2024 Homemade Cakes. All rights reserved. Made with ❤️ for cake lovers.</p>
      </div>
    </footer>
  );
};

export default Footer;