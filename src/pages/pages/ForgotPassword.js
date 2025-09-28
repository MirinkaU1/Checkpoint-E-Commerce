import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/forgot-password`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);

      navigate("/verify-code", { state: { email } });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        alert("Cet email n'est pas inscrit sur notre site.");
      } else {
        console.error("Erreur lors de l'envoi du code de vérification:", err);
        alert("Une erreur s'est produite. Veuillez réessayer.");
        setErrorMessage(true);
        setTimeout(() => setErrorMessage(false), 3000);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 py-20 md:pb-40 h-screen">
      {errorMessage && (
        <div className="alert alert-error bg-white text-bleu shadow-lg w-80 md:max-w-md mb-4 fixed bottom-4 right-4">
          <span>Une erreur s'est produite. Veuillez réessayer.</span>
        </div>
      )}
      {showAlert && (
        <div className="alert alert-error bg-white text-bleu shadow-lg w-80 md:max-w-md mb-4 fixed bottom-4 right-4">
          <span>
            Un code de vérification a été envoyé à votre adresse email.
          </span>
        </div>
      )}
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
        <h1 className="text-3xl font-bold">Mot de passe oublié</h1>
      </div>
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
