import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SinglePage from './pages/SinglePage';
import MenuPage from './pages/MenuPage';
import CakeDetailsPage from './pages/CakeDetailsPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SinglePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cake/:cakeId" element={<CakeDetailsPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;