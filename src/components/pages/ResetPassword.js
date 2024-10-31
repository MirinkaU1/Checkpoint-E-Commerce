import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await axios.post(
        "https://imarketstore-backend.onrender.com/api/users/reset-password",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Mot de passe mis à jour avec succès");
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe :", error);
      alert("Une erreur s'est produite lors de la mise à jour du mot de passe");
    }
  };

  return (
    <div className="container mx-auto p-4 py-20 md:pb-40 h-screen">
      <h1 className="text-3xl font-bold mb-6">Reinitialiser le mot de passe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nouveau mot de passe</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19.5c-5.385 0-9.873-3.941-11.25-9A10.054 10.054 0 014.125 5.175m4.927-2.077A9.956 9.956 0 0112 4.5c5.385 0 9.873 3.941 11.25 9a10.05 10.05 0 01-2.014 3.527M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3l18 18M9.88 9.88A3 3 0 0115 12m0 0a3 3 0 01-4.243 4.243M15 12a3 3 0 00-3-3m0 0a3 3 0 00-4.243 4.243M9.88 9.88L5.12 5.12M15 12l4.88 4.88M3 3l18 18"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Confirmer le nouveau mot de passe
            </span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19.5c-5.385 0-9.873-3.941-11.25-9A10.054 10.054 0 014.125 5.175m4.927-2.077A9.956 9.956 0 0112 4.5c5.385 0 9.873 3.941 11.25 9a10.05 10.05 0 01-2.014 3.527M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3l18 18M9.88 9.88A3 3 0 0115 12m0 0a3 3 0 01-4.243 4.243M15 12a3 3 0 00-3-3m0 0a3 3 0 00-4.243 4.243M9.88 9.88L5.12 5.12M15 12l4.88 4.88M3 3l18 18"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}
