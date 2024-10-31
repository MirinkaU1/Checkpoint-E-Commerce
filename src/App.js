import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetails from "./components/pages/ProductDetails";
import Admin from "./components/pages/Admin";
import LoginAdmin from "./components/pages/LoginAdmin";
import Cart from "./components/pages/Cart";
import NotFound from "./components/pages/NotFound";
import Checkout from "./components/pages/Checkout";
import Success from "./components/pages/Success";
import { CartProvider } from "./components/context/CartContext";
import AccountSettings from "./components/pages/AccountSettings";
import OrderHistory from "./components/pages/OrderHistory";

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();
  const hideNavBar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/login-admin";
  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/login-admin";

  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Vérifiez si l'utilisateur est un administrateur

  return (
    <>
      {!hideNavBar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route
          path="/admin"
          element={
            isAuthenticated && isAdmin ? (
              <Admin />
            ) : (
              <Navigate to="/login-admin" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
};

export default App;
