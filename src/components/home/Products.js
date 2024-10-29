import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://imarketstore-backend.onrender.com/api/products",
          {
            headers: {
              "Content-Type": "application/json", // En-tête Content-Type si nécessaire
            },
            withCredentials: true, // Si le backend utilise les cookies pour la session/authentification
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNowClick = (productId) => {
    console.log("Navigating to product with ID:", productId);
    navigate(`/products/${productId}`);
  };

  return (
    <section className="bg-bleu w-full py-12">
      <div className="mx-10 lg:mx-20">
        <h2 className="text-2xl text-white font-bold mb-2">
          Discover the newest iPhones with exclusive deals
        </h2>
        <p className="text-white mb-6">
          Upgrade to the latest technology at unbeatable prices. Choose your
          favorite model and enjoy the best features Apple has to offer
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col bg-white border rounded-xl h-auto p-4 shadow-md"
            >
              <div className="flex justify-center items-center pb-4 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-auto h-32 md:h-48 object-contain"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-center">
                {product.name}
              </h3>
              <p className="text-lg md:text-2xl font-bold mb-4 text-center pt-4">
                {product.price} FCFA
              </p>
              <div className="mt-auto">
                <button
                  onClick={() => handleBuyNowClick(product._id)}
                  className="bg-orange text-sm md:text-xl text-white px-4 py-2 w-full rounded-xl hover:bg-orange-600"
                >
                  Buy now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
