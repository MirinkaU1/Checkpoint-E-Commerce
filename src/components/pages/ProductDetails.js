import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../Breadcrumbs";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMemory, setSelectedMemory] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
          setSelectedColor(res.data.colors[0].name);
        }
        if (res.data && res.data.memoryOptions.length > 0) {
          setSelectedMemory(res.data.memoryOptions[0]);
        }
      } catch (err) {
        console.error("Erreur lors du chargement du produit:", err);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleColorChange = (color) => {
    setSelectedColor(color.name);
    setCurrentImageIndex(0);
  };

  const handleMemoryChange = (memory) => {
    setSelectedMemory(memory);
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
      productId: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      memory: selectedMemory,
      quantity: 1,
    };

    const existingProductIndex = cart.findIndex(
      (item) =>
        item.productId === newItem.productId &&
        item.color === newItem.color &&
        item.memory === newItem.memory
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Produit ajouté au panier !");
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
    <div className="pt-20 p-10">
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
          <div className="flex gap-4 overflow-x-auto">
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
                    className={`p-2 m-1 border ${
                      selectedColor === color.name
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.code }}
                  ></button>
                ))}
              </div>
            </div>

            {/* Sélection de la mémoire */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Mémoire :</h3>
              <div className="flex">
                {product.memoryOptions.map((memory) => (
                  <button
                    key={memory}
                    onClick={() => handleMemoryChange(memory)}
                    className={`p-2 m-1 border ${
                      selectedMemory === memory
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  >
                    {memory}
                  </button>
                ))}
              </div>
            </div>

            {/* Section Prix et Actions */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                {product.price} FCFA
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
                  <button
                    onClick={addToCart}
                    className="bg-orange text-white px-6 py-4 rounded-2xl"
                  >
                    Buy
                  </button>
                </div>
              ) : (
                <button
                  className="bg-slate-200 text-slate-800 w-full px-6 py-4 my-4 rounded-2xl"
                  disabled
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
        <h2>Description</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
