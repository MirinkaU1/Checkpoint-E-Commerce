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
      .get("https://imarketstore-backend.onrender.com/api/users/profile", {
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
      <h1 className="text-3xl font-bold mb-6">Paramètres de compte</h1>
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
