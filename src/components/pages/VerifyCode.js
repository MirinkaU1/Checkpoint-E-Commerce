import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Vérifier le code de vérification
      await axios.post(
        `https://imarketstore-backend.onrender.com/api/users/verify-code`,
        { email, code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Si le code est valide, rediriger vers la page de mise à jour du mot de passe
      navigate("/update-password", { state: { email } });
    } catch (err) {
      console.error("Erreur lors de la vérification du code:", err);
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 3000);
    }
  };

  return (
    <div className="container mx-auto p-4 py-20 md:pb-40 h-screen">
      <h1 className="text-3xl font-bold mb-6">Vérifier le code</h1>
      {errorMessage && (
        <div className="alert alert-error bg-white text-bleu shadow-lg w-80 md:max-w-md mb-4 fixed bottom-4 right-4">
          <span>Le code de vérification est invalide ou a expiré.</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Code de vérification</span>
          </label>
          <input
            type="text"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Valider le code
        </button>
      </form>
    </div>
  );
}
