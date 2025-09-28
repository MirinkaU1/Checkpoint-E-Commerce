import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(res.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes :", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Liste des commandes</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-4">
            <p>Commande n° {order._id}</p>
            <p>Client : {order.user.name}</p>
            <p>Total : {order.totalPrice} €</p>
            {/* Afficher plus de détails selon vos besoins */}
          </div>
        ))
      ) : (
        <p>Aucune commande disponible.</p>
      )}
    </div>
  );
};

export default OrdersTab;
