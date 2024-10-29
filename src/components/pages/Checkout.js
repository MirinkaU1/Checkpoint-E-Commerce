import React from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const createOrder = async (data, actions) => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount.toFixed(2),
            currency_code: "EUR",
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(async (details) => {
      // Enregistrer la commande dans la base de données
      try {
        await axios.post(
          `https://imarketstore-backend.onrender.com/api/orders`,
          {
            orderItems: cartItems,
            totalPrice: details.purchase_units[0].amount.value,
            payerID: details.payer.payer_id,
            paymentID: details.id,
          }
        );
        // Vider le panier
        localStorage.removeItem("cart");
        // Rediriger vers la page de succès
        navigate("/success");
      } catch (error) {
        console.error("Erreur lors de la création de la commande:", error);
      }
    });
  };

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-3xl font-bold mb-4">Paiement</h1>
      <PayPalScriptProvider
        options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
      >
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          style={{ layout: "vertical" }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default Checkout;
