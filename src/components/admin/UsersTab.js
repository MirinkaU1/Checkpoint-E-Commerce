import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(res.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    document.title = "Utilisateurs | iMarketStore";
  }, []);

  const handleConfirm = (action) => {
    setConfirmAction(action);
  };

  const handleDeleteUser = async (userId) => {
    handleConfirm(() => async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'utilisateur :",
          error
        );
      }
    });
  };

  const handleAssignAdmin = async (userId) => {
    handleConfirm(() => async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/users/${userId}/assign-admin`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchUsers();
      } catch (error) {
        console.error(
          "Erreur lors de l'attribution du rôle administrateur :",
          error
        );
      }
    });
  };

  const handleRemoveAdmin = async (userId) => {
    handleConfirm(() => async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/users/${userId}/remove-admin`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchUsers();
      } catch (error) {
        console.error("Erreur lors du retrait du rôle administrateur :", error);
      }
    });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    handleConfirm(() => async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/users/${editingUser._id}`,
          editingUser,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditingUser(null);
        fetchUsers();
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de l'utilisateur :",
          error
        );
      }
    });
  };

  const executeConfirmAction = async () => {
    if (confirmAction) {
      await confirmAction();
      setConfirmAction(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs</h2>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-auto">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="border p-4 mb-4">
              <p>Nom : {user.name}</p>
              <p>Email : {user.email}</p>
              <p>
                Rôle :{" "}
                <span
                  className={user.isAdmin ? "text-green-500" : "text-gray-500"}
                >
                  {user.isAdmin ? "Administrateur" : "Utilisateur"}
                </span>
              </p>
              <div className="mt-2 flex space-x-2">
                {user.isAdmin ? (
                  <button
                    onClick={() => handleRemoveAdmin(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Retirer admin
                  </button>
                ) : (
                  <button
                    onClick={() => handleAssignAdmin(user._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Attribuer admin
                  </button>
                )}
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-bleu text-white p-2 rounded"
                >
                  {/* Icône SVG pour "modifier" */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-600 text-white p-2 rounded"
                >
                  {/* Icône SVG pour "supprimer" */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun utilisateur trouvé.</p>
        )}
      </div>

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <h2 className="text-xl font-bold mb-4">Modifier l'utilisateur</h2>
            <div className="mb-4">
              <label className="block font-bold mb-2">Nom :</label>
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2">Email :</label>
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateUser}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmAction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <h2 className="text-xl font-bold mb-4">Confirmer l'action</h2>
            <p>Êtes-vous sûr de vouloir effectuer cette action ?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setConfirmAction(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Annuler
              </button>
              <button
                onClick={executeConfirmAction}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTab;
