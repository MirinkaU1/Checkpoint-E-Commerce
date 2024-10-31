import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = useCallback(() => {
    axios
      .get("https://imarketstore-backend.onrender.com/api/orders/myorders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Orders data:", response.data); // Log des données reçues
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des commandes :", error);
        if (error.response && error.response.status === 401) {
          // Rediriger vers la page d'accueil si l'utilisateur n'est pas autorisé
          navigate("/");
        }
      });
  }, [navigate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  function handleDeleteHistory() {
    if (
      window.confirm(
        "Voulez-vous vraiment supprimer votre historique de commandes ?"
      )
    ) {
      axios
        .delete(
          "https://imarketstore-backend.onrender.com/api/orders/deleteAll",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          alert("Historique de commandes supprimé avec succès.");
          setOrders([]);
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression des commandes :", error);
          alert(
            "Une erreur s'est produite lors de la suppression de l'historique."
          );
        });
    }
  }

  const handleBackClick = () => {
    navigate(-1); // Redirige vers la page précédente
  };

  return (
    <>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">
            Vous n'avez pas encore passé de commande.
          </h1>
          <button
            onClick={handleBackClick}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-bleu"
          >
            Retour
          </button>
        </div>
      ) : (
        <div className="container mx-auto p-4 py-20 md:pb-40">
          <h1 className="text-3xl font-bold mb-6">Historique de commande</h1>
          <button onClick={handleDeleteHistory} className="btn btn-error mb-4">
            Supprimer l'historique
          </button>
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order._id} className="p-4 border rounded-lg shadow">
                <p className="font-semibold mx-4 mt-4">
                  Commande n°{order._id}
                </p>
                <p className="mx-4">
                  Date : {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <div className="collapse collapse-arrow">
                  <input type="checkbox" />
                  <div className="collapse-title text-mb font-medium">
                    Afficher les détails
                  </div>
                  <div className="collapse-content">
                    {order.orderItems.map((item, index) => {
                      // Trouver la couleur correspondante
                      const colorInfo = item.product.colors.find(
                        (color) => color.name === item.color
                      );

                      return (
                        <div key={index} className="flex gap-3">
                          {colorInfo &&
                            colorInfo.image &&
                            colorInfo.image.length > 0 && (
                              <img
                                src={colorInfo.image[0]} // Assurez-vous que l'image est disponible dans colorInfo.image
                                alt={`Couleur ${item.color}`}
                                className="w-24 h-24 object-cover mb-2"
                              />
                            )}
                          <div>
                            <p>Quantité : {item.quantity}</p>
                            <p>Produit : {item.product.name}</p>
                            <p>Couleur : {item.color ? item.color : "N/A"}</p>
                            <p>Mémoire : {item.memoryOption}</p>
                            <p>
                              Prix :{order.totalPrice.toLocaleString("fr-FR")}{" "}
                              FCFA
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
