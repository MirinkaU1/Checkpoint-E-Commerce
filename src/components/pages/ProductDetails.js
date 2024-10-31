import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../Breadcrumbs";
import { CartContext } from "./../context/CartContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { updateCartItemsCount } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.error("ID du produit non défini");
        return;
      }

      try {
        const res = await axios.get(
          `https://imarketstore-backend.onrender.com/api/products/${productId}`
        );
        setProduct(res.data);

        if (res.data && res.data.colors.length > 0) {
          setSelectedColor(res.data.colors[0]);
        }
        if (res.data && res.data.memoryOptions.length > 0) {
          setSelectedMemory(res.data.memoryOptions[0].size);
        }
      } catch (err) {
        console.error("Erreur lors du chargement du produit:", err);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0);
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

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const newItem = {
      productId: product._id,
      name: product.name,
      price: getPrice(),
      color: selectedColor,
      memory: selectedMemory,
      quantity: 1,
    };

    const existingProductIndex = cart.findIndex(
      (item) =>
        item.productId === newItem.productId &&
        item.color.name === newItem.color.name &&
        item.memory === newItem.memory
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartItemsCount();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

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

  const getPrice = () => {
    let price = 0;

    if (selectedMemory) {
      const memoryOption = product.memoryOptions.find(
        (option) => option.size === selectedMemory
      );
      if (memoryOption) {
        price = memoryOption.price;
      }
    } else {
      price = getLowestPrice(product);
    }

    if (
      product.promotion?.isActive &&
      product.promotion.discountPercentage > 0
    ) {
      price = price - (price * product.promotion.discountPercentage) / 100;
    }

    return price;
  };

  const getShortDescription = (description) => {
    const words = description.split(" ");
    return words.slice(0, 50).join(" ") + (words.length > 50 ? "..." : "");
  };

  if (!product || !selectedColor) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Chargement</h1>
      </div>
    );
  }

  return (
    <div className="py-20 p-10 relative">
      {showAlert && (
        <div className="alert alert-success w-auto border-none bg-green-400 text-white fixed bottom-4 right-4">
          <span>Produit ajouté au panier !</span>
        </div>
      )}
      <Breadcrumbs />
      {/* Section En-tête du produit */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{product.name}</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        {/* Section Galerie d'images */}
        <div className="flex flex-col items-center md:w-1/2">
          <div className="h-96 bg-white mb-4 relative">
            {/* Image principale */}
            {selectedColor.image && selectedColor.image.length > 0 ? (
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
            {selectedColor.image && selectedColor.image.length > 1 && (
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
          <div className="flex gap-4 overflow-x-auto">
            {selectedColor.image && selectedColor.image.length > 0 ? (
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

        <div className="md:w-1/2">
          {/* Section Options du produit */}
          <div className="mb-8">
            {/* Sélection de la couleur */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Couleur :</h3>
              <div className="flex">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color)}
                    className={`p-4 m-1 border rounded-full ${
                      selectedColor === color ? "border-bleu" : "border-white"
                    }`}
                    style={{ backgroundColor: color.code }}
                  ></button>
                ))}
              </div>
            </div>

            {product.memoryOptions && product.memoryOptions.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold">Mémoire :</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.memoryOptions.map((memoryOption) => (
                    <button
                      key={memoryOption._id}
                      onClick={() => setSelectedMemory(memoryOption.size)}
                      className={`px-4 py-2 border rounded-xl ${
                        selectedMemory === memoryOption.size
                          ? "bg-bleu text-white"
                          : "border-bleu text-bleu"
                      }`}
                    >
                      {memoryOption.size} Go
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Section Prix et Actions */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                {getPrice().toLocaleString("fr-FR")} FCFA
              </h2>
              <p
                className={
                  product.stock === "Available"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {product.stock === "Available" ? "Disponible" : "Stock épuisé"}
              </p>
              {product.stock === "Available" ? (
                <div className="mt-4">
                  <button
                    onClick={addToCart}
                    className="bg-orange w-full lg:w-60 text-white py-4 rounded-2xl"
                  >
                    Ajouter au panier
                  </button>
                </div>
              ) : (
                <button
                  className="bg-slate-200 text-slate-800 w-full py-4 rounded-2xl"
                  disabled
                >
                  Stock épuisé
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <h1 className="mt-10 text-2xl font-bold">Description</h1>
      <div className="prose mt-5">
        <div
          dangerouslySetInnerHTML={{
            __html: getShortDescription(product.description),
          }}
        />
        {product.description.split(" ").length > 50 && (
          <button
            onClick={() => setShowModal(true)}
            className="text-blue-500 underline"
          >
            Afficher plus
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white mx-4 p-8 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Description complète</h2>
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              className="prose"
            />
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
