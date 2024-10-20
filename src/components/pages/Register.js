import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'inscription ici (envoi de données à l'API)
    console.log("Register:", { name, email, password });
  };

  const handleBackClick = () => {
    navigate(-1); // Redirige vers la page précédente
  };

  return (
    <div className="flex flex-row items-center w-full h-screen">
      <div className="w-1/2 h-full">
        <img
          src="/img/product_bg2.png"
          alt="Product Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-full bg-bleu p-8">
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
          <div className="mb-4">
            <label className="block text-white mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
