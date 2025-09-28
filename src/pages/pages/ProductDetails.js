import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../../components/ui/breadcrumb";
import { Button } from "../../components/ui/button";
import { CartContext } from "../../context/CartContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { updateCartItemsCount } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.error("ID du produit non défini");
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`
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

  // Fetch a small list of other products to display in the sidebar
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/products`
        );
        if (res.data && Array.isArray(res.data)) {
          const items = res.data.filter((p) => p._id !== productId);
          setRelatedProducts(items.slice(0, 6));
        }
      } catch (err) {
        console.error("Erreur lors du chargement des produits liés :", err);
      }
    };

    fetchRelated();
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
    // Prefer to return the first paragraph if description contains HTML paragraphs
    if (!description) return "";
    // If HTML with <p> tags, take the first paragraph
    const pMatch = description.match(/([\s\S]*?<\/p>)([\s\S]*)/i);
    if (pMatch) {
      const firstPara = pMatch[1];
      // remove surrounding wrapper if necessary
      return firstPara;
    }

    // If plain text with paragraph breaks, take first paragraph
    if (/\n\s*\n/.test(description)) {
      return description.split(/\n\s*\n/)[0];
    }

    // Fallback: try to cut at a sentence end before or near 50 words
    const words = description.split(/\s+/);
    if (words.length <= 50) return description;
    const firstPart = words.slice(0, 50).join(" ");
    // find last sentence end in the first part
    const lastSentenceIdx = Math.max(
      firstPart.lastIndexOf("."),
      firstPart.lastIndexOf("!"),
      firstPart.lastIndexOf("?")
    );
    if (
      lastSentenceIdx > -1 &&
      lastSentenceIdx > Math.floor(firstPart.length * 0.3)
    ) {
      return firstPart.slice(0, lastSentenceIdx + 1);
    }
    return firstPart + "...";
  };

  const getRemainingDescription = (description) => {
    if (!description) return "";
    // If HTML with <p> tags, return everything after the first paragraph
    const pMatch = description.match(/([\s\S]*?<\/p>)([\s\S]*)/i);
    if (pMatch) {
      return pMatch[2];
    }

    // If plain text with paragraph breaks, return everything after the first paragraph
    if (/\n\s*\n/.test(description)) {
      const parts = description.split(/\n\s*\n/);
      return parts.slice(1).join("\n\n");
    }

    // Fallback: return the words after the 50th
    const words = description.split(/\s+/);
    if (words.length <= 50) return "";
    return words.slice(50).join(" ");
  };

  if (!product || !selectedColor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">
          <div className="loader-small"></div>
          <div className="loader-large"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-5 pb-20 px-24 relative">
      {showAlert && (
        <div className="alert alert-success w-auto border-none bg-green-400 text-white fixed bottom-4 right-4">
          <span>Produit ajouté au panier !</span>
        </div>
      )}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Accueil</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/products">Produits</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex w-full flex-col lg:flex-row gap-10">
        <div className="w-3/4">
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
                    <Button
                      onClick={handlePrevImage}
                      variant="secondary"
                      size="icon"
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 text-bleu hover:bg-gray-200 rounded-full p-2"
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
                    </Button>
                    <Button
                      onClick={handleNextImage}
                      variant="secondary"
                      size="icon"
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 text-bleu hover:bg-gray-200 rounded-full p-2"
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
                    </Button>
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
                      className={`w-16 h-16 object-cover cursor-pointer rounded-xl hover:border-bleu border ${
                        currentImageIndex === index ? "border-bleu" : ""
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
                      <Button
                        key={color.name}
                        onClick={() => handleColorChange(color)}
                        variant="ghost"
                        size="icon"
                        className={`p-4 m-1 border rounded-full ${
                          selectedColor === color
                            ? "border-bleu"
                            : "border-white"
                        }`}
                        style={{ backgroundColor: color.code }}
                        aria-label={`Choisir la couleur ${color.name}`}
                      />
                    ))}
                  </div>
                </div>

                {product.memoryOptions && product.memoryOptions.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-bold">Mémoire :</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.memoryOptions.map((memoryOption) => (
                        <Button
                          key={memoryOption._id}
                          onClick={() => setSelectedMemory(memoryOption.size)}
                          className={`px-4 py-2 border rounded-xl ${
                            selectedMemory === memoryOption.size
                              ? "bg-bleu text-white hover:bg-bleu"
                              : "border-bleu text-bleu"
                          }`}
                        >
                          {memoryOption.size} Go
                        </Button>
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
                    {product.stock === "Available"
                      ? "Disponible"
                      : "Stock épuisé"}
                  </p>
                  {product.stock === "Available" ? (
                    <div className="mt-4">
                      <Button
                        onClick={addToCart}
                        className="bg-orange hover:bg-amber-600 w-full lg:w-60 text-white py-4 rounded-2xl"
                      >
                        Ajouter au panier
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="bg-slate-200 text-slate-800 w-full py-4 rounded-2xl"
                      disabled
                    >
                      Stock épuisé
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t mt-10 p-10 rounded-2xl bg-gray-100">
            <h1 className=" text-2xl font-bold">Description</h1>
            <div className="prose mt-5">
              <div
                dangerouslySetInnerHTML={{
                  __html: getShortDescription(product.description),
                }}
              />
              {showFullDescription && (
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{
                    __html: getRemainingDescription(product.description),
                  }}
                />
              )}
              {product.description.split(" ").length > 50 && (
                <Button
                  onClick={() => setShowFullDescription((s) => !s)}
                  variant="link"
                  className="text-blue-500 underline mt-2 block"
                >
                  {showFullDescription ? "Afficher moins" : "Afficher plus"}
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/4 lg:pl-4">
          <div className="lg:sticky lg:top-28 self-start">
            <h3 className="text-xl font-semibold mb-4">Produits similaires</h3>
            <div className="flex flex-col gap-4">
              {relatedProducts.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Aucun produit similaire trouvé.
                </p>
              ) : (
                relatedProducts.map((p) => (
                  <Link key={p._id} to={`/products/${p._id}`} className="block">
                    <div className="flex items-center gap-4 p-3 border rounded-lg bg-white transition transform hover:bg-gray-50 duration-200 ease-in-out">
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                        {p.colors &&
                        p.colors[0] &&
                        p.colors[0].image &&
                        p.colors[0].image[0] ? (
                          <img
                            src={p.colors[0].image[0]}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">
                            Pas d'image
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800 truncate">
                          {p.name}
                        </div>
                        <div className="text-sm font-bold text-gray-600">
                          {(p.basePrice || p.price || 0).toLocaleString(
                            "fr-FR"
                          )}{" "}
                          FCFA
                        </div>
                        <div
                          className={`text-xs mt-1 ${
                            p.stock === "Available"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {p.stock === "Available"
                            ? "Disponible"
                            : "Stock épuisé"}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
