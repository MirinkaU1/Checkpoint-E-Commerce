import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products.json"; // Assure-toi que le chemin est correct.

const ProductList = ({ searchTerm, filter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Limite à 3 produits par page
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBuyNowClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="mx-20 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col bg-white border rounded-2xl h-auto p-6 shadow-md"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-auto h-96 -mt-16 -mb-10"
            />
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-600 text-Poppins text-base mb-2">
              {product.description}
            </p>
            <p className="text-2xl font-bold mb-4">${product.price}</p>
            <div className="mt-auto">
              <button
                onClick={() => handleBuyNowClick(product.id)}
                className="bg-orange text-xl text-white px-4 py-2 w-full rounded-xl hover:bg-orange-600"
              >
                Buy now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded-full mx-1 ${
              currentPage === index + 1
                ? "bg-bleu text-white hover:bg-blue-700"
                : "bg-white border border-bleu hover:bg-gray-200"
            } rounded`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
