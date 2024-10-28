import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Importation correcte

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // État pour gérer la visibilité du mot de passe
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      localStorage.setItem("isAdmin", decoded.isAdmin);
      if (decoded.isAdmin === true) {
        alert("Connexion réussie !");
        navigate("/admin"); // Rediriger vers la page admin après la connexion
      } else {
        alert("Accès refusé. Vous n'êtes pas un administrateur.");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion:", err);
      alert("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Redirige vers la page précédente
  };

  return (
    <div className="flex flex-col md:flex-row items-center w-full h-screen">
      <div className="hidden md:block w-1/2 h-full">
        <img
          src="/img/product_bg2.png"
          alt="Product Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-full bg-bleu p-8">
        <img src="/img/logo-white.png" alt="Logo" className="w-20 mb-5" />
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="bg-white w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"} // Basculer le type d'entrée
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Basculer la visibilité du mot de passe
              className="absolute right-2 top-2 text-blue-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-orange text-white py-2 rounded-lg"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleBackClick}
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default LoginAdmin;
