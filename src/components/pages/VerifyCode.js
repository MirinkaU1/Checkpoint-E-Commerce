import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        `https://imarketstore-backend.onrender.com/api/users/verify-code`,
        { email, code, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Mot de passe mis à jour avec succès");
      navigate("/login");
    } catch (err) {
      console.error("Erreur lors de la vérification du code:", err);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="container mx-auto p-4 py-20 md:pb-40 h-screen">
      <h1 className="text-3xl font-bold mb-6">Vérifier le code</h1>
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
