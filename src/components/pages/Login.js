import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // État pour gérer la visibilité du mot de passe
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://imarketstore-backend.onrender.com/api/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // En-tête Content-Type si nécessaire
          },
          withCredentials: true, // Si le backend utilise les cookies pour la session/authentification
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      alert("Connexion réussie !");
      navigate("/");
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
          Login
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
        <div className="mt-4 text-center">
          <p className="text-white">
            Don't have an account?{" "}
            <a href="/register" className="text-orange hover:underline">
              Register here
            </a>
          </p>
        </div>
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

export default Login;
