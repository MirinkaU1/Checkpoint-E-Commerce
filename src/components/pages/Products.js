import React, { useState, useEffect } from "react";
import ProductList from "../ProductList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const [products, setProducts] = useState([]);

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
        response.data.forEach((product) => console.log(product._id));
      } catch (err) {
        console.error("Erreur lors du chargement des produits:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterClick = () => {
    setFilter(!filter);
  };

  return (
    <section className="relative flex flex-col min-h-screen w-full">
      <div className="bg-blue-600 text-white flex gap-4 items-center justify-around px-3 mt-20">
        <button
          onClick={handleFilterClick}
          className="flex gap-4 my-4 p-2 text-white rounded-full"
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
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          <span>Filtrer</span>
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
        <ProductList
          searchTerm={searchTerm}
          filter={filter}
          products={products}
        />
      </div>
    </section>
  );
};

export default Products;
