import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Importation nommée correcte

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    memoryOptions: "",
    colors: [{ name: "", code: "", images: [] }], // Initialise avec une couleur vide
  });
  const [editProductId, setEditProductId] = useState(null); // Pour savoir si on est en mode édition
  const [users, setUsers] = useState([]); // Ajoute l'état pour les utilisateurs
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
        fetchUsers();
      }
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const method = editProductId ? "PUT" : "POST";
    const url = editProductId
      ? `http://localhost:5000/api/products/${editProductId}`
      : "http://localhost:5000/api/products";

    console.log("Sending data:", newProduct); // Ajoutez ce log pour vérifier les données

    try {
      const res = await axios({
        method,
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: newProduct,
      });

      if (res.status === 200 || res.status === 201) {
        const updatedProduct = res.data;
        if (editProductId) {
          setProducts((products) =>
            products.map((p) => (p._id === editProductId ? updatedProduct : p))
          );
        } else {
          setProducts((products) => [...products, updatedProduct]);
        }
        setNewProduct({
          name: "",
          description: "",
          price: "",
          stock: "",
          image: "",
          memoryOptions: "",
          colors: [{ name: "", code: "", images: [] }],
        });
        setEditProductId(null);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout/mise à jour du produit", error);
    }
  };

  const handleEdit = (product) => {
    setNewProduct(product);
    setEditProductId(product._id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        setProducts((products) => products.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du produit", error);
    }
  };

  const handleImageUpload = async (e, colorIndex) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Remplacez par votre upload preset Cloudinary

    console.log("Uploading file:", file); // Ajoutez ce log pour vérifier le fichier
    console.log("FormData:", formData); // Ajoutez ce log pour vérifier le FormData

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd0dab4zq/image/upload", // Remplacez par votre URL Cloudinary
        formData
      );
      console.log("Cloudinary response:", res.data); // Ajoutez ce log pour vérifier la réponse de Cloudinary

      if (colorIndex >= 0 && colorIndex < newProduct.colors.length) {
        const updatedColors = [...newProduct.colors];
        updatedColors[colorIndex].images.push(res.data.secure_url);
        setNewProduct({ ...newProduct, colors: updatedColors });
      } else {
        console.error("Invalid color index:", colorIndex);
      }
    } catch (error) {
      console.error("Erreur lors de l'importation de l'image", error);
    }
  };

  const handleAddColor = () => {
    setNewProduct({
      ...newProduct,
      colors: [...newProduct.colors, { name: "", code: "", images: [] }],
    });
  };

  const handleRemoveColor = (index) => {
    const updatedColors = newProduct.colors.filter((_, i) => i !== index);
    setNewProduct({ ...newProduct, colors: updatedColors });
  };

  const handleColorChange = (index, field, value) => {
    const updatedColors = [...newProduct.colors];
    updatedColors[index][field] = value;
    setNewProduct({ ...newProduct, colors: updatedColors });
  };

  return (
    <div className="mx-20 p-4 pt-20">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-xl mb-4">
          {editProductId ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label className="block">Product Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block">Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="border p-2 w-full"
              required
            ></textarea>
          </div>

          <div>
            <label className="block">Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block">Stock</label>
            <input
              type="text"
              name="stock"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block">Memory Options</label>
            <select
              name="memoryOptions"
              value={newProduct.memoryOptions}
              onChange={(e) =>
                setNewProduct({ ...newProduct, memoryOptions: e.target.value })
              }
              className="border p-2 w-full"
              required
            >
              <option value="">Select Memory</option>
              <option value="128">128 GB</option>
              <option value="256">256 GB</option>
            </select>
          </div>

          <div>
            <label className="block">Upload Image</label>
            <input
              type="file"
              onChange={(e) => handleImageUpload(e, -1)}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block">Colors</label>
            {newProduct.colors.map((color, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder="Color Name"
                    value={color.name}
                    onChange={(e) =>
                      handleColorChange(index, "name", e.target.value)
                    }
                    className="border p-2 w-full mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Color Code"
                    value={color.code}
                    onChange={(e) =>
                      handleColorChange(index, "code", e.target.value)
                    }
                    className="border p-2 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(index)}
                    className="ml-2 bg-red-500 text-white p-2 rounded"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block">
                    Upload Images for {color.name}
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="border p-2 w-full"
                  />
                  <div className="flex flex-wrap mt-2">
                    {color.images && color.images.length > 0 ? (
                      color.images.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt={`Color ${color.name}`}
                          className="w-20 h-20 object-cover mr-2 mb-2"
                        />
                      ))
                    ) : (
                      <p className="text-red-500">No images available</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddColor}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Color
            </button>
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {editProductId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Display existing products */}
      <div>
        <h2 className="text-xl mb-4">Manage Products</h2>
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product._id} className="border p-4 rounded">
              <h3 className="font-bold">{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white p-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Display existing users */}
      <div>
        <h2 className="text-xl mb-4">Manage Users</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user._id} className="border p-4 rounded">
              <h3 className="font-bold">{user.name}</h3>
              <p>{user.email}</p>
              {/* Ajoutez des boutons pour gérer les utilisateurs si nécessaire */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
