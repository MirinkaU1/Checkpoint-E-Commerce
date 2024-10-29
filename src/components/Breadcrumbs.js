import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [productName, setProductName] = useState(null);

  useEffect(() => {
    const fetchProductName = async () => {
      const productId = pathnames[pathnames.length - 1];
      if (productId) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`
          );
          setProductName(response.data.name);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération du nom du produit:",
            error
          );
        }
      }
    };

    fetchProductName();
  }, [pathnames]);

  const routeNames = {
    products: "Products",
    // Ajoutez d'autres noms de routes si nécessaire
  };

  return (
    <div className="breadcrumbs text-sm mb-4">
      <ul>
        <li>
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const name = routeNames[value] || value;

          return isLast ? (
            <li key={to} className="text-gray-500">
              {productName || name}
            </li>
          ) : (
            <li key={to}>
              <Link to={to} className="text-gray-700 hover:text-blue-600">
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
