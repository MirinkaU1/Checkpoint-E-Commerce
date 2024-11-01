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
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      console.error("Erreur lors de la vérification du code:", err);
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 3000);
    }
  };

  return (
    <div className="container mx-auto p-4 py-20 md:pb-40 h-screen">
      <div className="flex items-center gap-5 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-bleu flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <h1 className="text-3xl font-bold">Vérifier le code</h1>
      </div>

      {errorMessage && (
        <div className="alert alert-error bg-white text-bleu shadow-lg w-80 md:max-w-md mb-4 fixed bottom-4 right-4">
          <span>Le code de vérification est invalide ou a expiré.</span>
        </div>
      )}
      <p className="mb-4">
        Veuillez vérifier votre boîte mail pour récupérer le code de
        vérification.
      </p>
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
