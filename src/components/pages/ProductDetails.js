import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../Breadcrumbs";

const ProductDetail = () => {
  const { productId } = useParams(); // Utilisez 'productId' pour correspondre au nom du paramètre défini dans la route
  console.log("Product ID from URL:", productId);
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.error("Product ID is undefined");
        return;
      }

      try {
        console.log(`Fetching product with ID: ${productId}`); // Ajoutez ce log pour vérifier l'ID du produit
        const res = await axios.get(
          `${process.env.BACKEND_URL}/api/products/${productId}`,
          {
            headers: {
              "Content-Type": "application/json", // En-tête Content-Type si nécessaire
            },
            withCredentials: true, // Si le backend utilise les cookies pour la session/authentification
          }
        );
        console.log(res.data);
        setProduct(res.data);
        if (res.data && res.data.colors.length > 0) {
          setSelectedColor(res.data.colors[0]);
        }
      } catch (err) {
        console.error("Erreur lors du chargement du produit:", err);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0); // Reset the image index when the color changes
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedColor.image.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedColor.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center mx-20 h-screen">
        <h1 className="text-4xl font-bold">Chargement</h1>
        {/* <p className="text-gray-500">
          The product you are looking for does not exist.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-xl"
        >
          Go Back
        </button> */}
      </div>
    );
  }

  return (
    <div className="pt-20 p-4">
      <Breadcrumbs />
      <div className="flex flex-col md:flex-row gap-5">
        {/* Section Galerie d'images */}
        <div className="flex flex-col items-center md:w-1/2">
          <div className="h-96 bg-white mb-4 relative">
            {/* Image principale */}
            {selectedColor &&
            selectedColor.image &&
            selectedColor.image.length > 0 ? (
              <img
                src={selectedColor.image[currentImageIndex]}
                alt="Product"
                className="w-auto h-full object-contain"
              />
            ) : (
              <p className="text-red-500">
                Aucune image disponible pour cette couleur.
              </p>
            )}
            {selectedColor &&
              selectedColor.image &&
              selectedColor.image.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 text-bleu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-bleu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </>
              )}
          </div>
          <div className="flex gap-4">
            {/* Miniatures */}
            {selectedColor &&
            selectedColor.image &&
            selectedColor.image.length > 0 ? (
              selectedColor.image.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className={`w-16 h-16 object-cover rounded-xl border ${
                    currentImageIndex === index ? "border-blue-500" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))
            ) : (
              <p className="text-red-500">Aucune miniature disponible.</p>
            )}
          </div>
        </div>

        <div className="md:w-1/2 p-9">
          {/* Section En-tête du produit */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-500">
              Reference: {product.id} | {product.views} views
            </p>
          </div>

          {/* Section Options du produit */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold">
              Color:{" "}
              <span className="font-normal">
                {selectedColor ? selectedColor.name : "N/A"}
              </span>
            </h2>
            <div className="flex space-x-4 mb-4">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleColorChange(color)}
                  className={`p-4 border rounded-full ${
                    selectedColor && selectedColor.code === color.code
                      ? "border-blue-500"
                      : ""
                  }`}
                  style={{ backgroundColor: color.code }}
                ></button>
              ))}
            </div>

            <h2 className="text-lg font-semibold">Storage:</h2>
            <div className="flex space-x-4">
              {product.memoryOptions.map((storage, index) => (
                <button key={index} className="px-4 py-2 border rounded-2xl">
                  {storage}
                </button>
              ))}
            </div>
          </div>

          {/* Section Prix et Actions */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              ${product.price}
            </h2>
            <p
              className={
                product.stock === "Available"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {product.stock === "Available"
                ? "Available in stock"
                : "Out of stock"}
            </p>
            {product.stock === "Available" ? (
              <div className="mt-4">
                <button className="bg-orange text-white px-6 py-4 rounded-2xl">
                  Buy
                </button>
              </div>
            ) : (
              <button
                className="bg-slate-200 text-slate-800 w-full px-6 py-4 my-4 rounded-2xl"
                disabled
              >
                Buy
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
