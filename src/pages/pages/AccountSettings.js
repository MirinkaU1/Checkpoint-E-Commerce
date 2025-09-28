import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AccountSettings() {
  const [userData, setUserData] = useState({
    nom: "",
    email: "",
    password: "********", // Mot de passe masqué par défaut
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserData({
          ...response.data,
          password: "********", // Masquer le mot de passe
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const handlePasswordChange = () => {
    navigate("/update-password");
  };

  return (
    <div className="container mx-auto p-4 py-20 md:pb-40 h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-4 text-black hover:underline"
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
        </button>
        <h1 className="text-3xl font-bold">Paramètres de compte</h1>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Informations personnelles</h2>
        <div className="form-control">
          <p>Nom : {userData.name}</p>
        </div>
        <div className="form-control">
          <p>Email : {userData.email}</p>
        </div>
        <div className="form-control">
          <p>Mot de passe : {userData.password}</p>
          <button
            type="button"
            onClick={handlePasswordChange}
            className="btn btn-secondary mt-2"
          >
            Modifier le mot de passe
          </button>
        </div>
      </div>
    </div>
  );
}
