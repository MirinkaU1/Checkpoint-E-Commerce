import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products.json";
import Breadcrumbs from "../Breadcrumbs";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Trouver le produit avec l'ID correspondant
    const foundProduct = products.find((p) => p.id === parseInt(productId));
    setProduct(foundProduct);
    if (foundProduct) {
      setSelectedColor(foundProduct.colors[0]); // Sélectionner la première couleur par défaut
    }
  }, [productId]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0); // Réinitialiser l'index de l'image
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedColor.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedColor.image.length - 1 : prevIndex - 1
    );
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center mx-20 h-screen">
        <h1 className="text-4xl font-bold">404 - Product Not Found</h1>
        <p className="text-gray-500">
          The product you are looking for does not exist.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="mx-20 py-28">
      <Breadcrumbs />
      <div className="flex flex-row gap-5">
        {/* Section Galerie d'images */}
        <div className="flex flex-col items-center w-1/2">
          <div className="h-96 bg-white mb-4 relative">
            {/* Image principale */}
            <img
              src={
                Array.isArray(selectedColor.image)
                  ? selectedColor.image[currentImageIndex]
                  : selectedColor.image
              }
              alt="Product"
              className="w-auto h-full object-contain"
            />
            {Array.isArray(selectedColor.image) && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 text-bleu"
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
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
          <div className="flex gap-4">
            {/* Miniatures */}
            {Array.isArray(selectedColor.image) ? (
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
              <img
                src={selectedColor.image}
                alt="Thumbnail"
                className="w-16 h-16 object-cover rounded-xl border"
              />
            )}
          </div>
        </div>

        <div className="w-1/2 p-9">
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
              Color: <span className="font-normal">{selectedColor.name}</span>
            </h2>
            <div className="flex space-x-4 mb-4">
              {product.colors.map((color, index) => (
                <>
                  <button
                    key={index}
                    onClick={() => handleColorChange(color)}
                    className={`p-4 border rounded-full ${
                      selectedColor.code === color.code ? "border-blue-500" : ""
                    }`}
                    style={{ backgroundColor: color.code }}
                  ></button>
                </>
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
                <button className="bg-orange w-96 text-white px-6 py-4 rounded-2xl">
                  Buy
                </button>
              </div>
            ) : (
              <button
                className="bg-slate-200 text-slate-800 w-96 px-6 py-4 my-4 rounded-2xl"
                disabled="disabled"
              >
                Buy
              </button>
            )}
          </div>

          {/* Section Produits similaires
          <div className="mt-8">
            <h2 className="text-lg font-semibold">
              You may also be interested in:
            </h2>
            <div className="flex space-x-8 mt-4">
              {product.relatedProducts.slice(0, 3).map((related, index) => (
                <div key={index} className="border p-4">
                  <h3>{related.name}</h3>
                  <p className="text-xl font-bold">${related.price}</p>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded mt-2">
                    Buy now
                  </button>
                </div>
              ))}
            </div> 
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
