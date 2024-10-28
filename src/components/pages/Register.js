import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // État pour gérer la visibilité du mot de passe
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.BACKEND_URL}/api/users/register`,
        {
          name,
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
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      navigate("/login");
    } catch (err) {
      console.error("Erreur lors de l'inscription:", err);
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
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
          Register
        </h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-white mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-white mb-2">Password:</label>
            <input
              type={showPassword ? "text" : "password"} // Basculer le type d'entrée
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white">
            Already have an account?{" "}
            <a href="/login" className="text-orange hover:underline">
              Go to login
            </a>
          </p>
        </div>
        <button
          onClick={handleBackClick}
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default Register;
