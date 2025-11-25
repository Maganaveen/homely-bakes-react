import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartPopup from '../components/CartPopup';
import CartModal from '../components/CartModal';

const SinglePage = () => {
  const navigate = useNavigate();
  const { user, login, register, logout } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartCount, addToCart, fetchCart } = useCart();
  const [showCartModal, setShowCartModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "", gender: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");
  const [showUserDropdown, setShowUserDropdown] = useState(false);

const searchCategories = [
  { name: "Birthday Cake", emoji: "🎂" },
  { name: "Anniversary Cake", emoji: "💕" },
  { name: "Hamper", emoji: "🎁" },
  { name: "Cookies", emoji: "🍪" },
  { name: "Cupcakes", emoji: "🧁" }
];




  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4); // 4 specialty cakes
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user?._id) {
      fetchCart(user._id);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserDropdown(false);
    };
    if (showUserDropdown) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserDropdown]);

  const showNotification = (message, type = "success") => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await fetch('/api/cakes');
        if (response.ok) {
          const data = await response.json();
          setCakes(data);
        } else {
          setCakes([
            { name: "Chocolate Cake", price: "₹899", image: "/images/chocolate-cake.jpg", category: "Cakes" },
            { name: "Red Velvet", price: "₹1299", image: "/images/red-velvet-cake.jpg", category: "Cakes" },
            { name: "Black Forest", price: "₹1199", image: "/images/black-forest-cake.jpg", category: "Cakes" },
            { name: "Vanilla Sponge", price: "₹799", image: "/images/vanilla-sponge1.jpg", category: "Cakes" },
            { name: "Strawberry Cake", price: "₹999", image: "/images/strawberry-cake.jpg", category: "Cakes" },
            { name: "Butterscotch Cake", price: "₹949", image: "/images/butterscotch-cake.jpg", category: "Cakes" },
            { name: "Pineapple Cake", price: "₹849", image: "/images/pineapple-cake.jpg", category: "Cakes" },
            { name: "Mango Cake", price: "₹1099", image: "/images/mango-cake.jpg", category: "Cakes" },
            { name: "Carrot Cake", price: "₹1149", image: "/images/carrot-cake.jpg", category: "Cakes" },
            { name: "Lemon Cake", price: "₹899", image: "/images/lemon-cake.jpg", category: "Cakes" },
            { name: "Coffee Cake", price: "₹1049", image: "/images/coffee-cake.jpg", category: "Cakes" },
            { name: "Fruit Cake", price: "₹1299", image: "/images/fruit-cake.jpg", category: "Cakes" },
            { name: "Chocolate Cupcakes", price: "₹299", image: "/images/chocolate-cupcakes.jpg", category: "Cupcakes" },
            { name: "Vanilla Cupcakes", price: "₹249", image: "/images/vanilla-cupcakes.jpg", category: "Cupcakes" },
            { name: "Red Velvet Cupcakes", price: "₹349", image: "/images/red-velvet-cupcakes.jpg", category: "Cupcakes" },
            { name: "Funfetti Cupcakes", price: "₹299", image: "/images/funfetti-cupcakes.jpg", category: "Cupcakes" },
            { name: "Chocolate Chip Cookies", price: "₹199", image: "/images/chocolate-chip-cookies.jpg", category: "Cookies" },
            { name: "Oatmeal Cookies", price: "₹179", image: "/images/oatmeal-cookies.jpg", category: "Cookies" },
            { name: "Sugar Cookies", price: "₹159", image: "/images/sugar-cookies.jpg", category: "Cookies" },
            { name: "Ginger Cookies", price: "₹189", image: "/images/ginger-cookies.jpg", category: "Cookies" },
            { name: "Tiramisu", price: "₹449", image: "/images/tiramisu.jpg", category: "Desserts" },
            { name: "Cheesecake", price: "₹549", image: "/images/cheesecake.jpg", category: "Desserts" },
            { name: "Chocolate Mousse", price: "₹349", image: "/images/chocolate-mousse.jpg", category: "Desserts" },
            { name: "Panna Cotta", price: "₹299", image: "/images/panna-cotta.jpg", category: "Desserts" },
            { name: "Brownie", price: "₹249", image: "/images/brownie.jpg", category: "Desserts" },
            { name: "Birthday Hamper", price: "₹1999", image: "/images/birthday-hamper.jpg", category: "Hampers" },
            { name: "Anniversary Hamper", price: "₹2499", image: "/images/anniversary-hamper.jpg", category: "Hampers" },
            { name: "Festival Hamper", price: "₹1799", image: "/images/festival-hamper.jpg", category: "Hampers" },
          ]);
        }
      } catch {
        setCakes([
            { name: "Chocolate Cake", price: "₹899", image: "/images/chocolate-cake.jpg", category: "Cakes" },
            { name: "Red Velvet", price: "₹1299", image: "/images/red-velvet-cake.jpg", category: "Cakes" },
            { name: "Black Forest", price: "₹1199", image: "/images/black-forest-cake.jpg", category: "Cakes" },
            { name: "Vanilla Sponge", price: "₹799", image: "/images/vanilla-sponge1.jpg", category: "Cakes" },
            { name: "Strawberry Cake", price: "₹999", image: "/images/strawberry-cake.jpg", category: "Cakes" },
            { name: "Butterscotch Cake", price: "₹949", image: "/images/butterscotch-cake.jpg", category: "Cakes" },
            { name: "Pineapple Cake", price: "₹849", image: "/images/pineapple-cake.jpg", category: "Cakes" },
            { name: "Mango Cake", price: "₹1099", image: "/images/mango-cake.jpg", category: "Cakes" },
            { name: "Carrot Cake", price: "₹1149", image: "/images/carrot-cake.jpg", category: "Cakes" },
            { name: "Lemon Cake", price: "₹899", image: "/images/lemon-cake.jpg", category: "Cakes" },
            { name: "Coffee Cake", price: "₹1049", image: "/images/coffee-cake.jpg", category: "Cakes" },
            { name: "Fruit Cake", price: "₹1299", image: "/images/fruit-cake.jpg", category: "Cakes" },
            { name: "Chocolate Cupcakes", price: "₹299", image: "/images/chocolate-cupcakes.jpg", category: "Cupcakes" },
            { name: "Vanilla Cupcakes", price: "₹249", image: "/images/vanilla-cupcakes.jpg", category: "Cupcakes" },
            { name: "Red Velvet Cupcakes", price: "₹349", image: "/images/red-velvet-cupcakes.jpg", category: "Cupcakes" },
            { name: "Funfetti Cupcakes", price: "₹299", image: "/images/funfetti-cupcakes.jpg", category: "Cupcakes" },
            { name: "Chocolate Chip Cookies", price: "₹199", image: "/images/chocolate-chip-cookies.jpg", category: "Cookies" },
            { name: "Oatmeal Cookies", price: "₹179", image: "/images/oatmeal-cookies.jpg", category: "Cookies" },
            { name: "Sugar Cookies", price: "₹159", image: "/images/sugar-cookies.jpg", category: "Cookies" },
            { name: "Ginger Cookies", price: "₹189", image: "/images/ginger-cookies.jpg", category: "Cookies" },
            { name: "Tiramisu", price: "₹449", image: "/images/tiramisu.jpg", category: "Desserts" },
            { name: "Cheesecake", price: "₹549", image: "/images/cheesecake.jpg", category: "Desserts" },
            { name: "Chocolate Mousse", price: "₹349", image: "/images/chocolate-mousse.jpg", category: "Desserts" },
            { name: "Panna Cotta", price: "₹299", image: "/images/panna-cotta.jpg", category: "Desserts" },
            { name: "Brownie", price: "₹249", image: "/images/brownie.jpg", category: "Desserts" },
            { name: "Birthday Hamper", price: "₹1999", image: "/images/birthday-hamper.jpg", category: "Hampers" },
            { name: "Anniversary Hamper", price: "₹2499", image: "/images/anniversary-hamper.jpg", category: "Hampers" },
            { name: "Festival Hamper", price: "₹1799", image: "/images/festival-hamper.jpg", category: "Hampers" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCakes();
  }, []);

  const styles = {
    // Hero Corner Elements
    heroCorner: {
      position: "absolute",
      top: "2rem",
      right: "2rem",
      display: "flex",
      gap: "1rem",
      alignItems: "center",
    },
    cornerBtn: {
      background: "rgba(255,255,255,0.9)",
      border: "3px solid #D4A574",
      color: "#8B4513",
      padding: "0.8rem 1.5rem",
      borderRadius: "30px",
      fontSize: "1rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
      fontFamily: "'Inter', sans-serif",
      boxShadow: "0 4px 15px rgba(212, 165, 116, 0.3)",
    },
    searchBox: {
      padding: "0.8rem 1.5rem",
      borderRadius: "30px",
      border: "3px solid #D4A574",
      background: "rgba(255,255,255,0.9)",
      color: "#8B4513",
      fontSize: "1rem",
      fontWeight: "600",
      width: "200px",
      backdropFilter: "blur(10px)",
      position: "relative",
      fontFamily: "'Inter', sans-serif",
      boxShadow: "0 4px 15px rgba(212, 165, 116, 0.3)",
    },
    searchDropdown: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      marginTop: "0.5rem",
      boxShadow: "0 10px 30px rgba(212, 165, 116, 0.3)",
      zIndex: 1000,
      border: "3px solid #D4A574",
    },
    dropdownItem: {
      padding: "1rem 1.2rem",
      color: "#8B4513",
      cursor: "pointer",
      transition: "all 0.3s ease",
      borderBottom: "2px solid rgba(212, 165, 116, 0.3)",
      fontSize: "1rem",
      fontWeight: "600",
      fontFamily: "'Inter', sans-serif",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
    },
    modalContent: {
      background: "linear-gradient(135deg, #FFF8E1, #F5F5DC)",
      padding: "1rem",
      borderRadius: "15px",
      width: "300px",
      maxWidth: "90vw",
      maxHeight: "90vh",
      overflowY: "auto",
      border: "2px solid #D4A574",
      boxShadow: "0 10px 30px rgba(212, 165, 116, 0.4)",
    },
    avatar: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      margin: "0 auto 0.75rem",
      display: "block",
      border: "2px solid #D4A574",
      boxShadow: "0 4px 15px rgba(212, 165, 116, 0.5)",
    },
    userProfile: {
      display: "flex",
      alignItems: "center",
      gap: "0.8rem",
      cursor: "pointer",
      background: "rgba(255,255,255,0.9)",
      padding: "0.5rem 1rem",
      borderRadius: "25px",
      border: "3px solid #D4A574",
      boxShadow: "0 4px 15px rgba(212, 165, 116, 0.3)",
    },
    smallAvatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      border: "3px solid #D4A574",
    },
    userName: {
      color: "#8B4513",
      fontSize: "1rem",
      fontWeight: "700",
      fontFamily: "'Inter', sans-serif",
    },
    popup: {
      position: "fixed",
      top: "80px",
      right: "20px",
      background: "rgba(255, 255, 255, 0.95)",
      color: "#333",
      padding: "0.8rem 1.2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      zIndex: 3000,
      border: "1px solid #e0e0e0",
      backdropFilter: "blur(10px)",
      minWidth: "250px",
      maxWidth: "300px",
      animation: "slideIn 0.3s ease",
      fontFamily: "'Inter', sans-serif",
    },
    popupSuccess: {
      borderLeft: "4px solid #10b981",
      background: "rgba(240, 253, 244, 0.95)",
      color: "#065f46",
    },
    popupError: {
      borderLeft: "4px solid #ef4444",
      background: "rgba(254, 242, 242, 0.95)",
      color: "#991b1b",
    },
    popupHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.5rem",
    },
    popupTitle: {
      fontSize: "0.9rem",
      fontWeight: "600",
      margin: 0,
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    popupClose: {
      background: "none",
      border: "none",
      color: "#8B4513",
      fontSize: "1.2rem",
      cursor: "pointer",
      opacity: 0.8,
      fontWeight: "bold",
    },
    cartIcon: {
      position: "relative",
      fontSize: "2rem",
      cursor: "pointer",
      padding: "0.8rem",
      background: "rgba(255,255,255,0.9)",
      borderRadius: "50%",
      border: "3px solid #D4A574",
      boxShadow: "0 4px 15px rgba(212, 165, 116, 0.3)",
      transition: "all 0.3s ease",
    },
    cartBadge: {
      position: "absolute",
      top: "-5px",
      right: "-5px",
      background: "#D4A574",
      color: "white",
      borderRadius: "50%",
      width: "25px",
      height: "25px",
      fontSize: "0.8rem",
      fontWeight: "800",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid white",
      fontFamily: "'Inter', sans-serif",
    },
    // Hero Section
    hero: {
      minHeight: "80vh",
      background: "linear-gradient(135deg, #D4A574 0%, #8B4513 50%, #A0522D 100%), url('./images/cake21.jpg')",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "3rem 2rem",
      backgroundRepeat: "no-repeat",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      position: "relative",
      backgroundBlendMode: "overlay",
    },

    heroTitle: {
      fontSize: "6rem",
      fontWeight: "900",
      marginBottom: "1.5rem",
      textShadow: "4px 4px 8px rgba(0,0,0,0.5)",
      letterSpacing: "3px",
      background: "linear-gradient(45deg, #fff, #D4A574, #8B4513)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontFamily: "'Playfair Display', serif",
      animation: "wiggle 2s ease-in-out infinite",
    },
    heroSubtitle: {
      fontSize: "2.2rem",
      marginBottom: "4rem",
      opacity: 0.95,
      fontWeight: "600",
      textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
      fontFamily: "'Inter', sans-serif",
      color: "#FFF8E1",
    },
    button: {
      background: "linear-gradient(135deg, #D4A574, #8B4513)",
      color: "white",
      border: "4px solid white",
      padding: "1.5rem 4rem",
      borderRadius: "50px",
      fontSize: "1.5rem",
      fontWeight: "800",
      cursor: "pointer",
      transition: "all 0.4s ease",
      backdropFilter: "blur(20px)",
      textTransform: "uppercase",
      letterSpacing: "3px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Inter', sans-serif",
      boxShadow: "0 8px 30px rgba(212, 165, 116, 0.4)",
      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    },
    // Wish Section
    wish: {
      background: "linear-gradient(135deg, #F5F5DC 0%, #FFF8E1 50%, #D4A574 100%)",
      padding: "6rem 0",
      position: "relative",
      overflow: "hidden",
    },
    wishContainer: {
      padding: "0 2rem",
      maxWidth: "1400px",
      margin: "0 auto",
    },
    wishScroll: {
      display: "flex",
      gap: "3rem",
      overflowX: "auto",
      paddingBottom: "2rem",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
      scrollBehavior: "smooth",
    },
    wishCard: {
      background: "linear-gradient(135deg, #FFF8E1, #F5F5DC)",
      borderRadius: "2rem",
      boxShadow: "0 20px 40px rgba(212, 165, 116, 0.3)",
      minWidth: "250px",
      textAlign: "center",
      transition: "all 0.4s ease",
      overflow: "hidden",
      cursor: "pointer",
      flexShrink: 0,
      position: "relative",
      border: "4px solid #D4A574",
      transform: "rotate(-2deg)",
    },
    wishImage: {
      width: "240px",
      height: "300px",
      borderRadius: "16px",
      objectFit: "cover",
      transition: "transform 0.4s ease",
      filter: "brightness(1.1) saturate(1.2)",
      border: "3px solid white",
    },
    wishContent: {
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      background: "linear-gradient(transparent, rgba(139, 69, 19, 0.9))",
      padding: "2.5rem 1.5rem 1.5rem",
      borderRadius: "0 0 16px 16px",
    },
    wishTitle: {
      color: "white",
      textAlign: "center",
      fontSize: "22px",
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: "2px",
      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
      fontFamily: "'Inter', sans-serif",
    },
    // Slideshow Section
    slideshow: {
      // background: "linear-gradient(135deg, #8B4513 0%, #D4A574 50%, #FFF8E1 100%)",
      padding: "2rem 0",
      position: "relative",
    },
    slideshowContainer: {
      maxWidth: "1300px",
      margin: "0 auto",
      padding: "-1 2rem",
    },
    bannerSlide: {
  position: "relative",
  width: "100%",
  minHeight: "450px",
  // borderRadius: "3rem",
  overflow: "hidden",
  // border: "6px solid #D4A574",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
},

   ctaBtn: {
  marginTop: "1.5rem",
  padding: "1rem 2.5rem",
  background: "transparent",
  border: "2px solid #8B4513",
  borderRadius: "8px",
  color: "white",
  fontSize: "1.1rem",
  fontWeight: "700",
  cursor: "pointer",
  transition: "all 0.4s ease",
  textTransform: "uppercase",
  letterSpacing: "1px",
  position: "relative",
  overflow: "hidden",
},


slideImageContainer: {
  width: "100%",
  height: "400px",
  borderRadius: "1rem",
  overflow: "hidden",
  position: "relative",
},

slideImage: {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.5s ease",
},
slideImageHover: {
  transform: "scale(1.05)",
},

    slideContent: {
      padding: "2rem",
    },
    slideTitle: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      color: "#2d3748",
    },
    slideDescription: {
      fontSize: "1.2rem",
      color: "#4a5568",
      lineHeight: "1.6",
    },
    // About Section
    about: {
      minHeight: "100vh",
      backgroundColor: "#1a1a1a",
      padding: "4rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    aboutContent: {
      maxWidth: "1200px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "3rem",
      alignItems: "center",
    },
    sectionTitle: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "white",
      marginBottom: "1.5rem",
    },
    aboutText: {
      fontSize: "1.1rem",
      lineHeight: "1.8",
      color: "#e2e8f0",
      marginBottom: "1rem",
    },
    // Menu Section
    menu: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #D4A574 0%, #F5F5DC 50%, #8B4513 100%)",
      padding: "7rem 2rem",
      position: "relative",
    },
    menuGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
      maxWidth: "1400px",
      margin: "0 auto",
    },
    cakeCard: {
      background: "linear-gradient(135deg, #FFF8E1, #F5F5DC)",
      borderRadius: "1rem",
      boxShadow: "0 8px 20px rgba(212, 165, 116, 0.3)",
      padding: "0",
      textAlign: "center",
      transition: "all 0.4s ease",
      overflow: "hidden",
      cursor: "pointer",
      border: "2px solid #D4A574",
      position: "relative",
      transform: "rotate(-1deg)",
    },
    cakeImage: {
      width: "100%",
      height: "140px",
      objectFit: "cover",
      transition: "transform 0.4s ease",
      filter: "brightness(1.1) saturate(1.3)",
      borderRadius: "8px 8px 0 0",
    },
    cakeContent: {
      padding: "0.8rem",
      background: "linear-gradient(135deg, #FFF8E1, #F5F5DC)",
    },
    cakePrice: {
      fontSize: "2rem",
      fontWeight: "900",
      color: "#8B4513",
      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      fontFamily: "'Inter', sans-serif",
    },
    viewMoreBtn: {
      marginTop: "1.5rem",
      padding: "0.7rem 1.5rem",
      background: "linear-gradient(135deg, #8B4513, #D4A574)",
      color: "white",
      border: "none",
      borderRadius: "20px",
      fontSize: "0.85rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontFamily: "'Inter', sans-serif",
      boxShadow: "0 2px 10px rgba(139, 69, 19, 0.4)",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    // Order Section
    order: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #8B4513 0%, #D4A574 50%, #A0522D 100%)",
      padding: "7rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    orderForm: {
      background: "linear-gradient(135deg, #FFF8E1, #F5F5DC)",
      padding: "4rem",
      borderRadius: "3rem",
      boxShadow: "0 25px 60px rgba(212, 165, 116, 0.4)",
      maxWidth: "700px",
      width: "100%",
      border: "6px solid #D4A574",
      backdropFilter: "blur(10px)",
    },
    formGroup: {
      marginBottom: "0.75rem",
    },
    label: {
      display: "block",
      fontSize: "0.8rem",
      fontWeight: "600",
      color: "#8B4513",
      marginBottom: "0.3rem",
      fontFamily: "'Inter', sans-serif",
    },
    input: {
      width: "100%",
      padding: "0.5rem",
      border: "2px solid #D4A574",
      borderRadius: "8px",
      fontSize: "0.85rem",
      backgroundColor: "rgba(255,255,255,0.9)",
      color: "#8B4513",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
      backdropFilter: "blur(5px)",
      fontFamily: "'Inter', sans-serif",
      fontWeight: "500",
      boxShadow: "0 2px 8px rgba(212, 165, 116, 0.3)",
    },
    select: {
      width: "100%",
      padding: "0.5rem",
      border: "2px solid #D4A574",
      borderRadius: "8px",
      fontSize: "0.85rem",
      backgroundColor: "rgba(255,255,255,0.9)",
      color: "#8B4513",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
      backdropFilter: "blur(5px)",
      fontFamily: "'Inter', sans-serif",
      fontWeight: "500",
      boxShadow: "0 2px 8px rgba(212, 165, 116, 0.3)",
    },
    submitBtn: {
      width: "100%",
      background: "linear-gradient(135deg, #8B4513, #D4A574)",
      color: "white",
      border: "none",
      padding: "0.6rem",
      borderRadius: "8px",
      fontSize: "0.9rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "1px",
      boxShadow: "0 4px 12px rgba(139, 69, 19, 0.4)",
      fontFamily: "'Inter', sans-serif",
      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
    },
    // Login Section
    login: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #A0522D 0%, #8B4513 50%, #D4A574 100%)",
      color: "white",
      padding: "5rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    loginContent: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "4rem",
      maxWidth: "1100px",
      width: "100%",
    },
    loginForm: {
      background: "linear-gradient(135deg, #FFF8E1, #F5F5DC)",
      padding: "3rem",
      borderRadius: "2rem",
      border: "5px solid #D4A574",
      boxShadow: "0 20px 50px rgba(212, 165, 116, 0.4)",
    },
    brandSection: {
      textAlign: "center",
    },
    brandLogo: {
      backgroundPosition: "center",
      fontSize: "8rem",
      marginBottom: "1.5rem",
    },
    brandName: {
      fontSize: "4rem",
      fontWeight: "900",
      marginBottom: "1.5rem",
      fontFamily: "'Playfair Display', serif",
      color: "#FFF8E1",
      textShadow: "4px 4px 8px rgba(0,0,0,0.5)",
    },
    orderNowBtn: {
      width: "100%",
      padding: "0.5rem",
      background: "linear-gradient(135deg, #8B4513, #D4A574, #A0522D)",
      color: "white",
      border: "none",
      borderRadius: "15px",
      fontSize: "0.75rem",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "0.5rem",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      boxShadow: "0 2px 8px rgba(139, 69, 19, 0.4)",
      fontFamily: "'Inter', sans-serif",
    },
  };



  return (
    <div>
      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '0.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderBottom: '2px solid #D4A574'
      }}>
        {/* Logo and Brand Name */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          cursor: 'pointer'
        }}>
          <img 
            src="./images/my-logo-1.png" 
            alt="Homely Bakes Logo" 
            style={{
              height: '40px',
              width: '40px',
              borderRadius: '50%',
              border: '2px solid #D4A574'
            }} 
          />
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#8B4513',
            margin: 0,
            fontFamily: "'Playfair Display', serif"
          }}>
            Homely Bakes
          </h1>
        </div>

        {/* Right Side - Search, Cart, Sign In */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search cakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchDropdown(true)}
              onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
              onClick={() => setShowUserDropdown(false)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: '2px solid #D4A574',
                background: 'white',
                color: '#8B4513',
                fontSize: '0.9rem',
                width: '200px',
                outline: 'none'
              }}
            />
            {showSearchDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'white',
                borderRadius: '10px',
                marginTop: '0.5rem',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                zIndex: 1001,
                border: '2px solid #D4A574'
              }}>
                {searchCategories.map((category, index) => (
                  <div 
                    key={index}
                    style={{
                      padding: '0.75rem 1rem',
                      color: '#8B4513',
                      cursor: 'pointer',
                      borderBottom: index < searchCategories.length - 1 ? '1px solid #f0f0f0' : 'none',
                      fontSize: '0.9rem'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f8f8f8'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    onClick={() => {
                      setSearchQuery(category.name);
                      setShowSearchDropdown(false);
                    }}
                  >
                    {category.emoji} {category.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <div 
            style={{
              position: 'relative',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              color: '#8B4513',
              transition: 'color 0.3s ease'
            }}
            onClick={() => setShowCartModal(true)}
            onMouseOver={(e) => e.currentTarget.style.color = '#D4A574'}
            onMouseOut={(e) => e.currentTarget.style.color = '#8B4513'}
          >
            🛒
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: '#D4A574',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white'
              }}>
                {cartCount}
              </span>
            )}
          </div>

          {/* Sign In / User Profile */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  background: 'rgba(212, 165, 116, 0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: '2px solid #D4A574'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserDropdown(!showUserDropdown);
                }}
              >
                <img 
                  src={user.gender === "female" ? "./images/woman.png" : "./images/boy.png"}
                  alt="Avatar"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: '2px solid #D4A574'
                  }}
                />
                <span style={{
                  color: '#8B4513',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  {user.name}
                </span>
                <span style={{
                  color: '#8B4513',
                  fontSize: '0.8rem',
                  marginLeft: '0.5rem'
                }}>▼</span>
              </div>
              
              {showUserDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'white',
                  borderRadius: '10px',
                  marginTop: '0.5rem',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                  zIndex: 1001,
                  border: '2px solid #D4A574',
                  minWidth: '150px'
                }}>
                  <div 
                    style={{
                      padding: '0.75rem 1rem',
                      color: '#8B4513',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f8f8f8'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    onClick={() => {
                      logout();
                      setShowUserDropdown(false);
                      showNotification('Logged out successfully', 'success');
                    }}
                  >
                    🚪 Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setShowSignInModal(true)}
              style={{
                background: 'linear-gradient(135deg, #D4A574, #8B4513)',
                color: 'white',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Sign Up / Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section - Specialty Cakes Slideshow */}
      <section style={{...styles.slideshow, marginTop: '60px'}}>
        <div style={styles.slideshowContainer}>
          {(() => {
            const specialtyCakes = [
              { 
                name: "Anniversary Cakes 💕", 
                image: "./images/annivesary.jpg", 
                description: "Celebrate love with a cake crafted for your sweetest milestones.", 
                backgroundImage: "./images/annivesary.jpg" 
              },
              { 
                name: "Birthday Cakes 🎂", 
                image: "./images/birthday-banner.png", 
                description: "Turning moments into magical bites for every birthday celebration.", 
                backgroundImage: "./images/birthday-banner.png" 
              },
              { 
                name: "Theme Cakes 🎭", 
                image: "./images/theme-banner.png", 
                description: "Custom designs that bring your dream themes to life.", 
                backgroundImage: "./images/theme-banner.png" 
              },
              { 
                name: "Homemade Specials 🏡", 
                image: "./images/classiccake.jpg", 
                description: "Made with love, baked with tradition, and delivered fresh.", 
                backgroundImage: "./images/classiccake.jpg" 
              },
            ];
            return (
              <div
                style={{
                  ...styles.bannerSlide,
                  backgroundImage: specialtyCakes[currentSlide % specialtyCakes.length].backgroundImage 
                    ? `url('${specialtyCakes[currentSlide % specialtyCakes.length].backgroundImage}')`
                    : `url('${specialtyCakes[currentSlide % specialtyCakes.length].image}')`,
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative'
                }}
              >
                {/* Dark Overlay for Readability */}
                <div
                  style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0,0,0,0.4)"
                }}
                />

                {/* Text placed INSIDE the Image */}
                <div
                  style={{
                    ...styles.slideContent,
                    position: 'absolute',
                    zIndex: 2,
                    top: '50%',
                    left: '8%',
                    transform: 'translateY(-50%)',
                    color: '#fff',
                    maxWidth: '40%'
                  }}
                >
                  <h2 style={{ 
                    ...styles.slideTitle, 
                    color: '#fff',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                    marginBottom: '1rem'
                  }}>
                    {specialtyCakes[currentSlide % specialtyCakes.length].name}
                  </h2>
                  <p style={{ 
                    ...styles.slideDescription,
                    color: '#fff',
                    fontSize: '1.2rem',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                    lineHeight: '1.6'
                  }}>
                    {specialtyCakes[currentSlide % specialtyCakes.length].description}
                  </p>
                </div>

                {/* Right Side Image - Only show if backgroundImage exists */}
                {specialtyCakes[currentSlide % specialtyCakes.length].backgroundImage && (
                  <div
                    style={{
                      position: 'absolute',
                      right: '5%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 2,
                      maxWidth: '40%',
                      maxHeight: '80%'
                    }}
                  >
                    <img
                      src={specialtyCakes[currentSlide % specialtyCakes.length].image}
                      alt={specialtyCakes[currentSlide % specialtyCakes.length].name}
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '300px',
                        objectFit: 'contain',
                        borderRadius: '15px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                      }}
                    />
                  </div>
                )}
              </div>

            );
          })()} 
        </div>
        {/* Wave Effect at Bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0
        }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{
            position: 'relative',
            display: 'block',
            width: '100%',
            height: '60px'
          }}>
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#D4A574"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#D4A574"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#D4A574"></path>
          </svg>
        </div>
      </section>

      {/* Wish Section */}
      <section style={styles.wish}>
        <div style={styles.wishContainer}>
          <h2 style={{
            ...styles.sectionTitle, 
            textAlign: "center", 
            marginBottom: "4rem", 
            color: "white",
            fontSize: "3rem",
            fontWeight: "800",
            background: "linear-gradient(45deg, #D4A574, #8B4513, #A0522D)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none"
          }}>What will you wish for?</h2>
          <div style={styles.wishScroll}>
            {[
              {img: "./images/cake2.jpg", title: "Cakes"},
              {img: "./images/cookies2.jpg", title: "Cookies"},
              {img: "./images/Gourment.jpg", title: "Gourment"},
              {img: "./images/Cupcakes.jpg", title: "Cupcakes"},
              {img: "./images/hampers.jpg", title: "Hampers"},
              {img: "./images/dessert.jpg", title: "Dessert"}
            ].map((item, index) => (
              <div 
                key={index}
                style={styles.wishCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-15px) scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,0,0,0.6)";
                  e.currentTarget.querySelector('img').style.transform = "scale(1.1)";
                  e.currentTarget.querySelector('img').style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.4)";
                  e.currentTarget.querySelector('img').style.transform = "scale(1)";
                  e.currentTarget.querySelector('img').style.filter = "brightness(0.9)";
                }}
              >
                <img src={item.img} alt={item.title} style={styles.wishImage} />
                <div style={styles.wishContent}>
                  <h3 style={styles.wishTitle}>{item.title}</h3>
                </div>
              </div>
            ))
          }
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section style={styles.menu}>
        <div>
          <h2 style={{
            ...styles.sectionTitle, 
            textAlign: "center", 
            marginBottom: "4rem",
            fontSize: "3rem",
            fontWeight: "800",
            background: "linear-gradient(45deg, #D4A574, #8B4513, #A0522D)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>Our Delicious Menu</h2>
          {loading ? (
            <div style={{textAlign: "center", fontSize: "1.2rem"}}>Loading delicious treats...</div>
          ) : (
            <>
              <div style={styles.menuGrid}>
                {cakes.slice(0, 10).map((cake, index) => (
                  <div 
                    key={index} 
                    style={styles.cakeCard}
                    onClick={() => navigate(`/cake/${index + 1}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,0,0,0.6)";
                      e.currentTarget.querySelector('img').style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.4)";
                      e.currentTarget.querySelector('img').style.transform = "scale(1)";
                    }}
                  >
                    <img src={cake.image} alt={cake.name} style={styles.cakeImage} />
                    <div style={styles.cakeContent}>
                      <h3 style={{fontSize: "1.1rem", marginBottom: "0.5rem", color: "#8B4513", fontWeight: "700"}}>{cake.name}</h3>
                      <p style={styles.cakePrice}>{cake.price}</p>
                      <button 
                        style={styles.orderNowBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (user?._id) {
                            addToCart({...cake, id: index + 1}, user._id);
                          } else {
                            showNotification('Please sign in to add items to cart', 'error');
                          }
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "scale(1.05)";
                          e.target.style.boxShadow = "0 6px 20px rgba(212, 165, 116, 0.5)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "scale(1)";
                          e.target.style.boxShadow = "0 4px 15px rgba(212, 165, 116, 0.3)";
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {cakes.length > 10 && (
                <div style={{textAlign: "center"}}>
                  <button 
                    style={styles.viewMoreBtn}
                    onClick={() => window.location.href = '/menu'}
                  >
                    View More ({cakes.length - 10} more items)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{
        background: "linear-gradient(135deg, #F5F5DC 0%, #FFF8E1 50%, #D4A574 100%)",
        padding: "4rem 2rem",
        position: "relative"
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto"
        }}>
          <h2 style={{
            textAlign: "center",
            marginBottom: "3rem",
            fontSize: "3rem",
            fontWeight: "800",
            background: "linear-gradient(45deg, #D4A574, #8B4513, #A0522D)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>Our Gallery</h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem"
          }}>
            {[
              {img: "./images/chocolate-mousse.jpg", title: "Chocolate Delights"},
              {img: "./images/brownie.jpg", title: "Browines"},
              {img: "./images/cake1.jpg", title: "Birthday Specials"},
              {img: "./images/anniversary-hamper.jpg", title: "Anniversary Collection"},
              {img: "./images/Cupcakes.jpg", title: "Cupcake Varieties"},
              {img: "./images/cookies2.jpg", title: "Cookie Creations"}
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: "linear-gradient(135deg, #FFF8E1, #F5F5DC)",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  boxShadow: "0 15px 35px rgba(212, 165, 116, 0.3)",
                  transition: "all 0.4s ease",
                  cursor: "pointer",
                  border: "3px solid #D4A574"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(212, 165, 116, 0.3)";
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    transition: "transform 0.4s ease"
                  }}
                />
                <div style={{
                  padding: "1.5rem",
                  textAlign: "center"
                }}>
                  <h3 style={{
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    color: "#8B4513",
                    margin: 0
                  }}>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section style={{
        background: "linear-gradient(135deg, #8B4513 0%, #D4A574 50%, #A0522D 100%)",
        padding: "4rem 2rem 2rem",
        color: "white"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          {/* Main Footer Content */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem"
          }}>
            {/* Brand Section */}
            <div style={{textAlign: "left"}}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem"
              }}>
                <img 
                  src="./images/my-logo-1.png" 
                  alt="Homely Bakes Logo" 
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    border: "3px solid #FFF8E1"
                  }} 
                />
                <h1 style={{
                  fontSize: "2.5rem",
                  fontWeight: "900",
                  margin: 0,
                  fontFamily: "'Playfair Display', serif",
                  color: "#FFF8E1",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                }}>Homely Bakes</h1>
              </div>
              <p style={{
                fontSize: "1.1rem",
                marginBottom: "1.5rem",
                opacity: 0.9,
                lineHeight: "1.6"
              }}>Sweet moments, delivered fresh. We create delicious homemade cakes with love and tradition for your special occasions.</p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                marginBottom: "1rem",
                color: "#FFF8E1"
              }}>Quick Links</h3>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0
              }}>
                {["Home", "Menu", "Gallery", "About Us", "Contact"].map((link, index) => (
                  <li key={index} style={{
                    marginBottom: "0.5rem"
                  }}>
                    <a href="#" style={{
                      color: "rgba(255,255,255,0.8)",
                      textDecoration: "none",
                      fontSize: "1rem",
                      transition: "color 0.3s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#FFF8E1"}
                    onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.8)"}
                    >{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                marginBottom: "1rem",
                color: "#FFF8E1"
              }}>Contact Us</h3>
              <div style={{fontSize: "1rem", opacity: 0.9, lineHeight: "1.8"}}>
                <p style={{margin: "0.5rem 0"}}>📍 57/f Vanniyarpalayam Cuddalore</p>
                <p style={{margin: "0.5rem 0"}}>📞 +91-8838142150</p>
                <p style={{margin: "0.5rem 0"}}>✉️ homelybakes@gmail.com</p>
              </div>
            </div>
            
            {/* Business Hours */}
            <div>
              <h3 style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                marginBottom: "1rem",
                color: "#FFF8E1"
              }}>Business Hours</h3>
              <div style={{fontSize: "1rem", opacity: 0.9, lineHeight: "1.8"}}>
                <p style={{margin: "0.3rem 0"}}>Mon - Fri: 8:00 AM - 8:00 PM</p>
                <p style={{margin: "0.3rem 0"}}>Saturday: 9:00 AM - 9:00 PM</p>
                <p style={{margin: "0.3rem 0"}}>Sunday: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
          
          {/* Social Media & Copyright */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: "2rem",
            textAlign: "center"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              marginBottom: "1.5rem"
            }}>
              <a href="#" style={{
                color: "white",
                fontSize: "2rem",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >📘</a>
              <a href="#" style={{
                color: "white",
                fontSize: "2rem",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >📷</a>
              <a href="#" style={{
                color: "white",
                fontSize: "2rem",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >🐦</a>
              <a href="#" style={{
                color: "white",
                fontSize: "2rem",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >💬</a>
              <a href="#" style={{
                color: "white",
                fontSize: "2rem",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >📝</a>
            </div>
            
            <p style={{
              fontSize: "0.9rem",
              opacity: 0.7,
              margin: 0
            }}>© 2024 Homely Bakes. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </section>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div style={styles.modal} onClick={() => setShowSignInModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={{float: "right", background: "none", border: "none", color: "#8B4513", fontSize: "1.5rem", cursor: "pointer"}}
              onClick={() => setShowSignInModal(false)}
            >
              ×
            </button>
            <h2 style={{textAlign: "center", color: "#8B4513", marginBottom: "0.75rem", fontSize: "1.1rem"}}>
              {isLoginMode ? "Welcome Back" : "Create Account"}
            </h2>
            
            {userDetails.gender && (
              <img 
                src={userDetails.gender === "female" ? "./images/woman.png" : "./images/boy.png"}
                alt="Avatar"
                style={styles.avatar}
              />
            )}
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                let result;
                if (isLoginMode) {
                  result = await login(userDetails.email, userDetails.password);
                } else {
                  result = await register(userDetails.name, userDetails.email, userDetails.password);
                }
                
                if (result.success) {
                  setShowSignInModal(false);
                  setUserDetails({ name: "", email: "", password: "", gender: "" });
                  showNotification(`Welcome!`, "success");
                } else {
                  if (result.message === 'User already exists' && !isLoginMode) {
                    setIsLoginMode(true);
                    showNotification('User already exists. Please sign in.', "error");
                  } else {
                    showNotification(result.message || 'Authentication failed.', "error");
                  }
                }
              } catch (error) {
                console.error('Error:', error);
                showNotification('Authentication error. Please try again.', "error");
              }
            }}>
              {!isLoginMode && (
                <div style={styles.formGroup}>
                  <label style={{...styles.label, color: "#8B4513"}}>Name</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                    required
                  />
                </div>
              )}
              <div style={styles.formGroup}>
                <label style={{...styles.label, color: "#8B4513"}}>Email</label>
                <input
                  type="email"
                  style={styles.input}
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={{...styles.label, color: "#8B4513"}}>Password</label>
                <input
                  type="password"
                  style={styles.input}
                  value={userDetails.password}
                  onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}
                  required
                />
              </div>
              {!isLoginMode && (
                <div style={styles.formGroup}>
                  <label style={{...styles.label, color: "#8B4513"}}>Gender</label>
                  <select
                    style={styles.select}
                    value={userDetails.gender}
                    onChange={(e) => setUserDetails({...userDetails, gender: e.target.value})}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              )}
              
              <button type="submit" style={styles.submitBtn}>
                {isLoginMode ? "Sign In" : "Create Account"}
              </button>
              <p style={{textAlign: "center", color: "#8B4513", marginTop: "1rem"}}>
                {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                <span 
                  style={{color: "#D4A574", cursor: "pointer", textDecoration: "underline"}}
                  onClick={() => setIsLoginMode(!isLoginMode)}
                >
                  {isLoginMode ? "Create Account" : "Sign In"}
                </span>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Custom Popup Notification */}
      {showPopup && (
        <div style={{
          ...styles.popup,
          ...(popupType === "success" ? styles.popupSuccess : styles.popupError)
        }}>
          <div style={styles.popupHeader}>
            <h4 style={styles.popupTitle}>
              <span style={{fontSize: "1.1rem"}}>{popupType === "success" ? "✓" : "⚠"}</span>
              {popupMessage}
            </h4>
            <button 
              style={styles.popupClose}
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Cart Components */}
      <CartPopup />
      <CartModal 
        isOpen={showCartModal} 
        onClose={() => setShowCartModal(false)}
        userId={user?._id}
      />
    </div>
  );
};

export default SinglePage;