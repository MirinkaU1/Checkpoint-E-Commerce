import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://imarketstore-backend.onrender.com/api/users/forgot-password`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Un code de vérification a été envoyé à votre adresse email.");
      navigate("/verify-code", { state: { email } });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        alert("Cet email n'est pas inscrit sur notre site.");
      } else {
        console.error("Erreur lors de l'envoi du code de vérification:", err);
        alert("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 py-20 md:pb-40 h-screen">
      <h1 className="text-3xl font-bold mb-6">Mot de passe oublié</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Envoyer le code de vérification
        </button>
      </form>
    </div>
  );
}
