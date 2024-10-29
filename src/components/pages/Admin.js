import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    stock: "Available",
    memoryOptions: [],
    colors: [{ name: "", code: "", images: [] }],
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login-admin");
    } else {
      const decoded = jwtDecode(token);
      if (!decoded.isAdmin) {
        navigate("/");
      } else {
        fetchProducts();
      }
    }
  }, [navigate]);

  // Récupérer tous les produits lors du chargement de la page
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://imarketstore-backend.onrender.com/api/products`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleMemoryOptionsChange = (index, value) => {
    const updatedMemoryOptions = [...productForm.memoryOptions];
    updatedMemoryOptions[index] = value;
    setProductForm({ ...productForm, memoryOptions: updatedMemoryOptions });
  };

  const handleAddMemoryOption = () => {
    setProductForm({
      ...productForm,
      memoryOptions: [...productForm.memoryOptions, ""],
    });
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
      colors: [...productForm.colors, { name: "", code: "", images: [] }],
    });
  };

  const handleRemoveColor = (index) => {
    const updatedColors = productForm.colors.filter((_, i) => i !== index);
    setProductForm({ ...productForm, colors: updatedColors });
  };

  // Télécharger une image pour une couleur spécifique
  const handleImageUpload = async (e, colorIndex) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Remplacez par votre upload preset Cloudinary

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd0dab4zq/image/upload", // Remplacez par votre URL Cloudinary
        formData
      );

      if (colorIndex >= 0 && colorIndex < productForm.colors.length) {
        const updatedColors = [...productForm.colors];
        updatedColors[colorIndex].image.push(res.data.secure_url);
        setProductForm({ ...productForm, colors: updatedColors });
      } else {
        console.error("Invalid color index:", colorIndex);
      }
    } catch (error) {
      console.error("Erreur lors de l'importation de l'image", error);
    }
  };

  // Télécharger l'image principale du produit
  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Remplacez par votre upload preset Cloudinary

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd0dab4zq/image/upload",
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
          `https://imarketstore-backend.onrender.com/api/products/${editingProductId}`,
          productForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          "https://imarketstore-backend.onrender.com/api/products",
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
    try {
      await axios.delete(
        `https://imarketstore-backend.onrender.com/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      price: "",
      stock: "Available",
      memoryOptions: [],
      colors: [{ name: "", code: "", images: [] }],
    });
    setEditingProductId(null);
  };

  return (
    <div className="container mx-auto pt-20 p-4">
      <h1 className="text-3xl font-bold mb-4">
        Page d'administration des produits
      </h1>

      <div className="mb-4">
        <h2 className="text-2xl mb-2">Ajouter ou mettre à jour un produit</h2>
        <form onSubmit={handleFormSubmit} className="bg-gray-100 p-4 rounded">
          <input
            type="text"
            name="name"
            placeholder="Nom du produit"
            value={productForm.name}
            onChange={handleInputChange}
            required
            className="block mb-2 p-2 border"
          />
          <textarea
            name="description"
            placeholder="Description du produit"
            value={productForm.description}
            onChange={handleInputChange}
            required
            className="block mb-2 p-2 border"
          />
          <input
            type="file"
            onChange={handleMainImageUpload}
            className="block mb-2 p-2 border"
          />
          {productForm.image && (
            <img
              src={productForm.image}
              alt="Image_principale"
              className="w-32 h-32 object-cover mb-2"
            />
          )}
          <input
            type="number"
            name="price"
            placeholder="Prix du produit"
            value={productForm.price}
            onChange={handleInputChange}
            required
            className="block mb-2 p-2 border"
          />
          <select
            name="stock"
            value={productForm.stock}
            onChange={handleInputChange}
            required
            className="block mb-2 p-2 border"
          >
            <option value="Available">Disponible</option>
            <option value="Out of Stock">Rupture de stock</option>
          </select>

          <h3>Options de mémoire</h3>
          {productForm.memoryOptions.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Option de mémoire"
                value={option}
                onChange={(e) =>
                  handleMemoryOptionsChange(index, e.target.value)
                }
                className="block mb-2 p-2 border flex-grow"
              />
              <button
                type="button"
                onClick={() => handleRemoveMemoryOption(index)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
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
            className="mb-2 bg-blue-500 text-white px-4 py-1 rounded"
          >
            Ajouter une option de mémoire
          </button>

          <h3>Couleurs</h3>
          {productForm.colors.map((color, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Nom de la couleur"
                  value={color.name}
                  onChange={(e) =>
                    handleColorChange(index, "name", e.target.value)
                  }
                  className="block mb-2 p-2 border flex-grow"
                />
                <input
                  type="text"
                  placeholder="Code couleur (hex)"
                  value={color.code}
                  onChange={(e) =>
                    handleColorChange(index, "code", e.target.value)
                  }
                  className="block mb-2 p-2 border flex-grow"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveColor(index)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
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
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, index)}
                className="block mb-2 p-2 border"
              />
              {color.images &&
                color.images.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Couleur ${index}-Image ${i}`}
                    className="w-16 h-16 object-cover mb-2"
                  />
                ))}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddColor}
            className="mb-4 bg-blue-500 text-white px-4 py-1 rounded"
          >
            Ajouter une couleur
          </button>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {editingProductId
              ? "Mettre à jour le produit"
              : "Ajouter le produit"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl mb-2">Liste des produits</h2>
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="p-2 border">Nom</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Prix</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">{product.description}</td>
                <td className="p-2 border">{product.price} FCFA</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
