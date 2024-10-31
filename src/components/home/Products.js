import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getLowestPrice = (product) => {
    if (!product.memoryOptions || product.memoryOptions.length === 0) {
      return product.basePrice || product.price || 0;
    }

    const memoryPrices = product.memoryOptions.map((option) => option.price);
    const lowestPrice = Math.min(...memoryPrices);

    let finalPrice = lowestPrice;
    if (
      product.promotion?.isActive &&
      product.promotion.discountPercentage > 0
    ) {
      finalPrice =
        finalPrice - (finalPrice * product.promotion.discountPercentage) / 100;
    }

    return finalPrice;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://imarketstore-backend.onrender.com/api/products`,
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
          Découvrez les nouveaux iPhones avec des offres exclusives
        </h2>
        <p className="text-white mb-6">
          Passez à la dernière technologie à des prix imbattables. Choisissez
          votre modèle préféré et profitez des meilleures fonctionnalités
          qu'Apple a à offrir
        </p>
      </div>
      <div className="mx-5 lg:mx-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col bg-white border rounded-2xl w-auto h-auto p-4 md:p-6 shadow-md"
            >
              <div className="flex justify-center items-center pb-4 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-auto h-32 md:h-48 object-contain"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold">{product.name}</h3>
              <p className="text-lg md:text-2xl font-bold mb-4 pt-4">
                À partir de {getLowestPrice(product).toLocaleString("fr-FR")}{" "}
                FCFA
              </p>
              <div className="mt-auto">
                <button
                  onClick={() => handleBuyNowClick(product._id)}
                  className="bg-orange text-sm md:text-xl text-white px-4 py-2 w-full rounded-xl hover:bg-orange-600"
                >
                  Acheter
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
