import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const updateQuantity = (index, quantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const removeFromCart = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleCheckout = () => {
    // Redirection vers la page de paiement
    navigate("/checkout");
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-3xl font-bold mb-4">Votre Panier</h1>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li
                key={`${item.productId}-${item.color}-${item.memory}`}
                className="flex justify-between items-center mb-4 border-b pb-4"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Couleur : {item.color}</p>
                  <p>Mémoire : {item.memory}</p>
                  <p>Prix : {item.price}€</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      updateQuantity(index, Math.max(1, item.quantity - 1))
                    }
                    className="px-3 py-1 bg-gray-200 rounded-l"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        index,
                        Math.max(1, parseInt(e.target.value))
                      )
                    }
                    className="w-12 text-center border-t border-b"
                    min="1"
                  />
                  <button
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 rounded-r"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-4">
            <p className="text-xl font-semibold">Total : {getTotalPrice()}€</p>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-green-500 text-white rounded"
            >
              Valider la commande
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
