import React, { useState, useEffect } from "react";
import ProductList from "../ProductList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/products`,
          {
            headers: {
              "Content-Type": "application/json", // En-tête Content-Type si nécessaire
            },
            withCredentials: true, // Si le backend utilise les cookies pour la session/authentification
          }
        );
        setProducts(response.data);
        response.data.forEach((product) => console.log(product._id));
      } catch (err) {
        console.error("Erreur lors du chargement des produits:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="relative flex flex-col w-full">
      <div className="bg-blue-600 text-white flex gap-2 items-center justify-around px-3 mt-20">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-white flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="relative w-4/5">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600"
          />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="my-4 p-2 pl-10 w-full text-blue-600 rounded-full placeholder-blue-600"
          />
        </div>
      </div>
      <div className="product_contain">
        <ProductList searchTerm={searchTerm} products={products} />
      </div>
    </section>
  );
};

export default Products;
