import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { updateCartItemsCount } = useContext(CartContext);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const updateQuantity = (index, quantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    updateCartItemsCount();
  };

  const removeFromCart = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    updateCartItemsCount();
  };

  // Cart.js

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/register"); // Rediriger vers la page de création de compte ou de connexion
    } else {
      try {
        const user = localStorage.getItem("user");
        if (!user) {
          throw new Error(
            "Utilisateur non connecté ou informations utilisateur manquantes."
          );
        }
        const userData = JSON.parse(user);
        if (!userData || !userData._id) {
          throw new Error(
            "Utilisateur non connecté ou informations utilisateur manquantes."
          );
        }

        // Vérifier les articles du panier
        console.log("Cart items:", cartItems);

        // Préparer les articles de la commande
        const orderItems = cartItems.map((item) => {
          console.log("Processing item:", item);
          return {
            product: item.productId, // Utilisez la propriété qui contient l'ID du produit
            quantity: item.quantity,
            color: item.color.name,
            memoryOption: item.memory,
          };
        });

        orderItems.forEach((orderItem, index) => {
          if (!orderItem.product) {
            console.error(
              `Le champ 'product' est manquant dans orderItems[${index}]`
            );
          }
        });

        console.log("Cart items:", cartItems);

        const orderData = {
          orderItems,
          totalPrice: getTotalPrice(),
        };

        console.log("Order data:", orderData); // Afficher les données de la commande

        // Envoyer la commande au backend
        const response = await axios.post(
          "https://imarketstore-backend.onrender.com/api/orders",
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const createdOrder = response.data;
        console.log("Created order:", createdOrder); // Afficher la commande créée

        // Vider le panier
        localStorage.removeItem("cart");
        setCartItems([]);

        // Rediriger vers la page de paiement
        navigate(`/success`);
      } catch (error) {
        console.error("Erreur lors de la création de la commande :", error);
        // Afficher un message d'erreur à l'utilisateur si nécessaire
      }
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto p-4 py-20 md:pb-40">
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
        <h1 className="text-3xl font-bold mb-4">Votre Panier</h1>
      </div>

      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li
                key={`${item.productId}-${item.color?.name}-${item.memory}`}
                className="flex flex-row justify-between items-center mb-4 border-b pb-4"
              >
                <div className="flex items-center">
                  {item.color?.image?.[0] && (
                    <img
                      src={item.color.image[0]}
                      alt={item.color.name}
                      className="w-24 h-24 object-cover mt-2 mr-4"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p>{item.color?.name}</p>
                    <p>{item.memory} GB</p>
                    <p>{item.price.toLocaleString("fr-FR")} FCFA</p>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeFromCart(index)}
                      className="p-2 bg-red-500 text-white rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="size-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(index, Math.max(1, item.quantity - 1))
                      }
                      className="favorite-btn p-1 text-white bg-bleu rounded-md"
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
                          d="M5 12h14"
                        />
                      </svg>
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="favorite-btn p-1 text-white bg-bleu rounded-md transition duration-300 ease-in-out"
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
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-auto">
        <div className="flex justify-end mt-4">
          <p className="text-xl font-semibold">
            Total : {getTotalPrice().toLocaleString("fr-FR")} FCFA
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCheckout}
            className="px-6 py-3 bg-green-500 text-white rounded"
          >
            Valider la commande
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
