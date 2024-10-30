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
    <div className="container mx-auto p-4 pt-20 min-h-screen">
      <div className="flex items-center gap-5">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-bleu mb-4 flex items-center"
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
        <h1 className="text-3xl font-bold mb-4">Paiement</h1>
      </div>
      <div className="flex justify-center text-xl">
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
    </div>
  );
};

export default Checkout;
