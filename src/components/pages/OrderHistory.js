import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

  return (
    <div className="container mx-auto p-4 py-20 md:pb-40">
      <h1 className="text-3xl font-bold mb-6">Historique de commande</h1>
      {orders.length === 0 ? (
        <p>Vous n'avez pas encore passé de commande.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="p-4 border rounded-lg shadow">
              <p className="font-semibold mx-4 mt-4">Commande n°{order._id}</p>
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
      )}
    </div>
  );
}