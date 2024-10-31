import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Redirige vers la page précédente
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Merci pour votre achat !</h1>
      <p>Votre commande a été passée avec succès.</p>
      <button
        onClick={handleBackClick}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-bleu"
      >
        Retour
      </button>
    </div>
  );
};

export default Success;
