import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();
  const hideNavBar =
    location.pathname === "/login" || location.pathname === "/register";
  const hideFooter =
    location.pathname === "/login" || location.pathname === "/register";

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
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
};

export default App;
