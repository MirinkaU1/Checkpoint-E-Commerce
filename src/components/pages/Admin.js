// Admin.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../admin/ProductCard";
import OrdersTab from "../admin/OrdersTab";
import UsersTab from "../admin/UsersTab";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    image: "",
    basePrice: "",
    stock: "Available",
    memoryOptions: [{ size: "", price: "" }],
    colors: [{ name: "", code: "", image: [] }],
    promotion: {
      isActive: false,
      discountPercentage: 0,
    },
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const isAdmin = localStorage.getItem("isAdmin");
      if (isAdmin !== "true") {
        navigate("/");
      }
    }
  }, [navigate]);

  // Récupérer tous les produits lors du chargement de la page
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token non disponible. Veuillez vous connecter.");
      return;
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleDescriptionChange = (value) => {
    setProductForm((prevForm) => ({
      ...prevForm,
      description: value,
    }));
  };

  const handleMemoryOptionChange = (index, field, value) => {
    const updatedMemoryOptions = [...productForm.memoryOptions];
    updatedMemoryOptions[index][field] = value;
    setProductForm((prevForm) => ({
      ...prevForm,
      memoryOptions: updatedMemoryOptions,
    }));
  };

  const handleAddMemoryOption = () => {
    setProductForm((prevForm) => ({
      ...prevForm,
      memoryOptions: [...prevForm.memoryOptions, { size: "", price: "" }],
    }));
  };

  const handleRemoveMemoryOption = (index) => {
    const updatedMemoryOptions = productForm.memoryOptions.filter(
      (_, i) => i !== index
    );
    setProductForm({ ...productForm, memoryOptions: updatedMemoryOptions });
  };

  const handleColorChange = (index, field, value) => {
    const updatedColors = [...productForm.colors];
    updatedColors[index][field] = value;
    setProductForm({ ...productForm, colors: updatedColors });
  };

  const handleAddColor = () => {
    setProductForm({
      ...productForm,
      colors: [...productForm.colors, { name: "", code: "", image: [] }],
    });
  };

  const handleRemoveColor = (index) => {
    const updatedColors = productForm.colors.filter((_, i) => i !== index);
    setProductForm({ ...productForm, colors: updatedColors });
  };

  // Télécharger des images pour une couleur spécifique
  const handleImageUpload = async (e, colorIndex) => {
    const files = Array.from(e.target.files);
    const uploadedImages = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      ); // Utilisation de la variable d'environnement

      try {
        const res = await axios.post(
          process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, // Utilisation de la variable d'environnement
          formData
        );
        uploadedImages.push(res.data.secure_url);
      } catch (error) {
        console.error("Erreur lors de l'importation de l'image", error);
      }
    }

    if (colorIndex >= 0 && colorIndex < productForm.colors.length) {
      const updatedColors = [...productForm.colors];
      if (!updatedColors[colorIndex].image) {
        updatedColors[colorIndex].image = [];
      }
      updatedColors[colorIndex].image = [
        ...updatedColors[colorIndex].image,
        ...uploadedImages,
      ];
      setProductForm({ ...productForm, colors: updatedColors });
    } else {
      console.error("Invalid color index:", colorIndex);
    }
  };

  // Télécharger l'image principale du produit
  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    ); // Utilisation de la variable d'environnement

    try {
      const res = await axios.post(
        process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, // Utilisation de la variable d'environnement
        formData
      );
      setProductForm({ ...productForm, image: res.data.secure_url });
    } catch (error) {
      console.error(
        "Erreur lors de l'importation de l'image principale",
        error
      );
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (editingProductId) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/${editingProductId}`, // Utilisation de la variable d'environnement
          productForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/products`, // Utilisation de la variable d'environnement
          productForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout ou de la mise à jour du produit",
        error
      );
    }
  };

  const handleEditProduct = (product) => {
    setProductForm(product);
    setEditingProductId(product._id);
  };

  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token non disponible. Veuillez vous connecter.");
      return;
    }
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Rafraîchir la liste des produits
      fetchProducts();
    } catch (error) {
      console.error("Erreur lors de la suppression du produit", error);
    }
  };

  const resetForm = () => {
    setProductForm({
      name: "",
      description: "",
      image: "",
      basePrice: "",
      stock: "Available",
      memoryOptions: [{ size: "", price: "" }],
      colors: [{ name: "", code: "", image: [] }],
      promotion: {
        isActive: false,
        discountPercentage: 0,
      },
    });
    setEditingProductId(null);
  };

  return (
    <div className="px-20 pt-32 p-4">
      <h1 className="text-3xl font-bold mb-4">
        Tableau de bord d'administration
      </h1>

      <div className="tabs flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("products")}
          className={`tab px-4 rounded ${
            activeTab === "products" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Produits
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`tab px-4 rounded ${
            activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Commandes
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`tab px-4 rounded ${
            activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Utilisateurs
        </button>
      </div>

      {/* Contenu des onglets */}
      {activeTab === "products" && (
        <div className="lg:flex lg:gap-5">
          {/* Formulaire d'ajout / modification de produit */}
          <form
            onSubmit={handleFormSubmit}
            className="bg-gray-100 p-4 rounded mb-4"
          >
            {/* Champs du formulaire */}
            <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-2">
                Nom du produit
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={productForm.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Autres champs, comme la description, le prix, etc. */}
            <div className="mb-4">
              <label htmlFor="description" className="block font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={productForm.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className="w-full p-2 border rounded"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="basePrice" className="block font-bold mb-2">
                Prix de départ
              </label>
              <input
                type="number"
                name="basePrice"
                id="basePrice"
                value={productForm.basePrice}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Gestion de l'image principale */}
            <div className="mb-4">
              <label className="block font-bold mb-2">Image principale</label>
              <input
                type="file"
                onChange={handleMainImageUpload}
                className="w-full"
              />
              {productForm.image && (
                <img
                  src={productForm.image}
                  alt="Aperçu"
                  className="w-32 h-32 object-cover mt-2"
                />
              )}
            </div>

            {/* Options de mémoire */}
            <div className="mb-4">
              <label className="block font-bold mb-2">Options de mémoire</label>
              {productForm.memoryOptions.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder="Taille"
                    value={option.size}
                    onChange={(e) =>
                      handleMemoryOptionChange(index, "size", e.target.value)
                    }
                    className="p-2 border rounded mr-2"
                  />
                  <input
                    type="number"
                    placeholder="Prix"
                    value={option.price}
                    onChange={(e) =>
                      handleMemoryOptionChange(index, "price", e.target.value)
                    }
                    className="p-2 border rounded mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMemoryOption(index)}
                    className="bg-red-600 text-white p-2 rounded"
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddMemoryOption}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Ajouter une option
              </button>
            </div>

            {/* Couleurs */}
            <div className="mb-4">
              <label className="block font-bold mb-2">Couleurs</label>
              {productForm.colors.map((color, index) => (
                <div key={index} className="border p-4 mb-2">
                  <div className="flex items-center mb-2">
                    <input
                      type="text"
                      placeholder="Nom de la couleur"
                      value={color.name}
                      onChange={(e) =>
                        handleColorChange(index, "name", e.target.value)
                      }
                      className="p-2 border rounded mr-2"
                    />
                    <input
                      type="text"
                      placeholder="Code HEX"
                      value={color.code}
                      onChange={(e) =>
                        handleColorChange(index, "code", e.target.value)
                      }
                      className="p-2 border rounded mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(index)}
                      className="bg-red-600 text-white p-2 rounded"
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* Télécharger les images pour cette couleur */}
                  <div className="mb-2">
                    <label className="block font-bold mb-2">
                      Images de la couleur
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleImageUpload(e, index)}
                      className="w-full"
                    />
                    <div className="flex flex-wrap mt-2">
                      {color.image &&
                        color.image.map((imageUrl, idx) => (
                          <img
                            key={idx}
                            src={imageUrl}
                            alt={`Couleur ${color.name}`}
                            className="w-16 h-16 object-cover mr-2 mb-2"
                          />
                        ))}
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddColor}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Ajouter une couleur
              </button>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {editingProductId
                ? "Mettre à jour le produit"
                : "Ajouter le produit"}
            </button>
          </form>

          {/* Affichage des produits sous forme de cartes */}
          {products && products.length > 0 ? (
            <div className="lg:sticky lg:top-0 flex flex-col">
              <h2 className="font-semibold text-xl mb-3">Liste des produits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>Aucun produit disponible.</p>
          )}
        </div>
      )}

      {activeTab === "orders" && <OrdersTab />}

      {activeTab === "users" && <UsersTab />}
    </div>
  );
};

export default Admin;
