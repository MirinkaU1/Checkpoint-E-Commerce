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
      console.log("Response data:", response.data);

      const token = response.data.token;
      const user = response.data.user;
      console.log("User data:", user); // Log des données utilisateur
      console.log("Token:", token); // Log du token

      if (!user) {
        throw new Error("Les informations de l'utilisateur sont manquantes.");
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      alert("Connexion réussie !");
      navigate("/", { replace: true });
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
          alt="Arrière-plan du produit"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-full bg-bleu p-8">
        <img src="/img/logo-white.png" alt="Logo" className="w-20 mb-5" />
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Connectez vous !
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
              placeholder="Mot de passe"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Basculer la visibilité du mot de passe
              className="absolute right-2 top-2 text-blue-500"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-orange text-white py-2 rounded-lg"
          >
            Connexion
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white">
            Vous n'avez pas de compte?{" "}
            <a href="/register" className="text-orange hover:underline">
              Inscrivez-vous ici
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

export default Login;
