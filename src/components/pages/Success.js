import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mx-10 text-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Merci pour votre achat !</h1>
      <p>Votre commande a été passée avec succès.</p>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-4 mt-5 hover:underline"
      >
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
        <span>Retour</span>
      </button>
    </div>
  );
};

export default Success;
