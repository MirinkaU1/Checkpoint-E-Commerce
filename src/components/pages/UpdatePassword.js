import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 3000);
    }
  };

  return (
    <div className="container mx-auto p-4 py-20 md:pb-40 h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <h1 className="text-3xl font-bold">Modifier le mot de passe</h1>
      </div>
      {errorMessage && (
        <div className="alert alert-error bg-white text-bleu shadow-lg w-80 md:max-w-md mb-4 fixed bottom-4 right-4">
          <span>
            Une erreur s'est produite lors de la mise à jour du mot de passe
          </span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nouveau mot de passe</span>
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Confirmer le nouveau mot de passe
            </span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}
