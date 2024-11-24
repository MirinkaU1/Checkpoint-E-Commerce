import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { CartProvider } from "./components/context/CartContext";

// Importation paresseuse des composants de page
const Home = lazy(() => import("./components/pages/Home"));
const About = lazy(() => import("./components/pages/About"));
const Login = lazy(() => import("./components/pages/Login"));
const Register = lazy(() => import("./components/pages/Register"));
const Products = lazy(() => import("./components/pages/Products"));
const ProductDetails = lazy(() => import("./components/pages/ProductDetails"));
const Admin = lazy(() => import("./components/pages/Admin"));
const LoginAdmin = lazy(() => import("./components/pages/LoginAdmin"));
const Cart = lazy(() => import("./components/pages/Cart"));
const NotFound = lazy(() => import("./components/pages/NotFound"));
const Checkout = lazy(() => import("./components/pages/Checkout"));
const Success = lazy(() => import("./components/pages/Success"));
const AccountSettings = lazy(() =>
  import("./components/pages/AccountSettings")
);
const UpdatePassword = lazy(() => import("./components/pages/UpdatePassword"));
const ResetPassword = lazy(() => import("./components/pages/ResetPassword"));
const OrderHistory = lazy(() => import("./components/pages/OrderHistory"));
const ForgotPassword = lazy(() => import("./components/pages/ForgotPassword"));
const VerifyCode = lazy(() => import("./components/pages/VerifyCode"));

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

  useEffect(() => {
    const pageTitles = {
      "/": "Accueil | iMarketStore",
      "/login": "Connexion | iMarketStore",
      "/register": "Inscription | iMarketStore",
      "/products": "Produits | iMarketStore",
      "/products/:productId": "Détails du produit | iMarketStore",
      "/about": "À propos | iMarketStore",
      "/cart": "Panier | iMarketStore",
      "/checkout": "Paiement | iMarketStore",
      "/success": "Succès | iMarketStore",
      "/login-admin": "Admin Connexion | iMarketStore",
      "/404": "Page non trouvée | iMarketStore",
      "/account-settings": "Paramètres du compte | iMarketStore",
      "/update-password": "Mettre à jour le mot de passe | iMarketStore",
      "/reset-password": "Réinitialiser le mot de passe | iMarketStore",
      "/order-history": "Historique des commandes | iMarketStore",
      "/forgot-password": "Mot de passe oublié | iMarketStore",
      "/verify-code": "Vérifier le code | iMarketStore",
      "/admin": "Admin | iMarketStore",
    };

    const title = pageTitles[location.pathname] || "iMarketStore";
    document.title = title;
  }, [location.pathname]);

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
    <div className="flex flex-col min-h-screen">
      {!hideNavBar && <Navbar />}
      <div className="flex-grow">
        <Suspense fallback={<Loading />}>
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
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
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
        </Suspense>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default App;
