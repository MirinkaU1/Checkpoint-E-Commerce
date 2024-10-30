import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const navigate = useNavigate();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBuyNowClick = (productId) => {
    console.log("Navigating to product with ID:", productId);
    navigate(`/products/${productId}`);
  };

  return (
    <div className="mx-5 lg:mx-20 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
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
            <p className="text-lg md:text-2xl font-bold mt-auto mb-4 pt-4">
              {product.price} FCFA
            </p>
            <div className="mt-auto">
              {product ? (
                <button
                  onClick={() => handleBuyNowClick(product._id)}
                  className="bg-orange text-sm md:text-xl text-white px-4 py-2 w-full rounded-xl hover:bg-orange-600"
                >
                  Acheter
                </button>
              ) : (
                <p>Chargement du produit...</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1 ? "bg-orange text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
