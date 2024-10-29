import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    // Charger les articles du panier depuis le localStorage ou une API
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
    calculateTotalPrice(items);
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    calculateTotalPrice(updatedCartItems);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    calculateTotalPrice(updatedCartItems);
  };

  const handleShippingAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handlePaymentSuccess = async (details, data) => {
    try {
      // Enregistrer la commande dans la base de données
      await axios.post(
        `https://imarketstore-backend.onrender.com/api/orders`,
        {
          cartItems,
          shippingAddress,
          paymentDetails: details,
        },
        {
          headers: {
            "Content-Type": "application/json", // En-tête Content-Type si nécessaire
          },
          withCredentials: true, // Si le backend utilise les cookies pour la session/authentification
        }
      );

      // Vider le panier
      setCartItems([]);
      localStorage.removeItem("cartItems");
      alert("Paiement réussi et commande enregistrée !");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la commande:", error);
      alert(
        "Erreur lors de l'enregistrement de la commande. Veuillez réessayer."
      );
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
      <div className="mx-20 pt-20 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Votre Panier</h1>
        <div className="grid grid-cols-4 gap-2 sm:gap-4 p-5 bg-white sm:px-52">
          {cartItems.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            cartItems.map((item, index) => (
              <React.Fragment key={index}>
                <div className="col-span-1 row-span-2 bg-gray-500 rounded-lg h-20 lg:h-28"></div>
                <div className="col-span-2 flex bg-white text-center h-22">
                  <h3 className="self-center">{item.name}</h3>
                </div>
                <div className="col-span-1 flex justify-center bg-white rounded-lg h-22 text-green-500">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="favorite-btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>
                  </button>
                </div>
                <div className="col-span-2 flex bg-white text-center h-22">
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      className="product-price-input appearance-none border rounded w-full py-2 px-3 text-gray-700 font-bold leading-tight focus:outline-none focus:shadow-outline"
                      value={item.price * item.quantity}
                      disabled
                    />
                    <span className="absolute right-0 font-bold mr-2 text-gray-500">
                      FCFA
                    </span>
                  </div>
                </div>
                <div className="col-span-1 flex gap-3 justify-center items-center bg-white rounded-lg h-22">
                  <button
                    className="btn-animate decrement"
                    onClick={() =>
                      handleQuantityChange(index, item.quantity - 1)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-dash-square text-green-500"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="btn-animate increment"
                    onClick={() =>
                      handleQuantityChange(index, item.quantity + 1)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus-square-fill text-green-500"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                    </svg>
                  </button>
                </div>
              </React.Fragment>
            ))
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Adresse de Livraison</h2>
          <form className="space-y-4">
            <div>
              <label className="block">Rue</label>
              <input
                type="text"
                name="street"
                value={shippingAddress.street}
                onChange={handleShippingAddressChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block">Ville</label>
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleShippingAddressChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block">Code Postal</label>
              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleShippingAddressChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block">Pays</label>
              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleShippingAddressChange}
                className="border p-2 w-full"
                required
              />
            </div>
          </form>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Total: ${totalPrice}</h2>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalPrice.toString(),
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                handlePaymentSuccess(details, data);
              });
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Cart;
