import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { ChevronLeft, Minus, Plus, Trash } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const { updateCartItemsCount } = useContext(CartContext);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  // Fetch related products to show similar items
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/products`
        );
        if (res.data && Array.isArray(res.data)) {
          // Exclude products already in cart
          const cartIds = (JSON.parse(localStorage.getItem("cart")) || []).map(
            (i) => i.productId
          );
          const items = res.data.filter((p) => !cartIds.includes(p._id));
          setRelatedProducts(items.slice(0, 6));
        }
      } catch (err) {
        console.error(
          "Erreur lors du chargement des produits similaires:",
          err
        );
      }
    };

    fetchRelated();
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

        // Préparer les articles de la commande
        const orderItems = cartItems.map((item) => {
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

        const orderData = {
          orderItems,
          totalPrice: getTotalPrice(),
        };

        // Envoyer la commande au backend
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
    <>
      {cartItems.length === 0 ? (
        <div className="flex flex-col text-center items-center justify-center -mt-20 h-screen">
          <h1 className="text-4xl font-bold mb-4">Votre panier est vide.</h1>
          <Button
            onClick={() => navigate(-1)}
            variant="link"
            className="flex items-center gap-4 mt-5 group"
          >
            <ChevronLeft className="size-5 transform transition-transform duration-200 ease-out group-hover:-translate-x-1" />
            <span>Retour</span>
          </Button>
        </div>
      ) : (
        <div className="container mx-auto px-10 pt-4 pb-20 md:pb-40">
          <div className="flex items-center gap-5 mb-6">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              className="px-4 py-2 text-bleu flex items-center group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 transform transition-transform duration-200 ease-out group-hover:-translate-x-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
            <h1 className="text-3xl font-bold">Votre Panier</h1>
          </div>
          <ul>
            {cartItems.map((item, index) => (
              <li
                key={`${item.productId}-${item.color?.name}-${item.memory}`}
                className="flex flex-row justify-between items-center mb-4 md:px-10 border-b pb-4"
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
                    <Button
                      onClick={() => removeFromCart(index)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded"
                      variant="destructive"
                      size="icon"
                    >
                      <Trash className="size-5" />
                    </Button>
                  </div>

                  <div className="flex items-center">
                    <Button
                      type="button"
                      onClick={() =>
                        updateQuantity(index, Math.max(1, item.quantity - 1))
                      }
                      className="favorite-btn p-1 text-white bg-bleu hover:bg-blue-800 rounded-md"
                      variant="secondary"
                      size="icon"
                    >
                      <Minus className="size-5" />
                    </Button>
                    <span className="px-3">{item.quantity}</span>
                    <Button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="favorite-btn p-1 text-white bg-bleu hover:bg-blue-800"
                      variant="secondary"
                      size="icon"
                    >
                      <Plus className="size-5" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <div className="flex justify-end mt-4">
              <p className="text-xl font-semibold">
                Total : {getTotalPrice().toLocaleString("fr-FR")} FCFA
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleCheckout}
                className="px-6 py-3 bg-green-500 text-white rounded"
                variant="default"
              >
                Valider la commande
              </Button>
            </div>
          </div>
          {/* Produits similares */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Produits similaires</h2>
            {relatedProducts.length === 0 ? (
              <p className="text-sm text-gray-500">
                Aucun produit similaire trouvé.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedProducts.map((p) => (
                  <Link key={p._id} to={`/products/${p._id}`} className="block">
                    <div className="flex items-center gap-4 p-3 border rounded-lg bg-white hover:shadow-md transition">
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                        {p.colors &&
                        p.colors[0] &&
                        p.colors[0].image &&
                        p.colors[0].image[0] ? (
                          <img
                            src={p.colors[0].image[0]}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">
                            Pas d'image
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800 truncate">
                          {p.name}
                        </div>
                        <div className="text-sm font-bold text-gray-600">
                          {(p.basePrice || p.price || 0).toLocaleString(
                            "fr-FR"
                          )}{" "}
                          FCFA
                        </div>
                        <div
                          className={`text-xs mt-1 ${
                            p.stock === "Available"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {p.stock === "Available"
                            ? "Disponible"
                            : "Stock épuisé"}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
