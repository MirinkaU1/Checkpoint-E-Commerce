import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import products from "../data/products.json"; // Assurez-vous que le chemin est correct

const Breadcrumbs = () => {
  const location = useLocation();
  const { productId } = useParams();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Mapping des chemins vers des noms lisibles
  const routeNames = {
    products: "Products",
    "product-details": "Details",
  };

  // Trouver le nom du produit si l'ID du produit est présent dans l'URL
  const productName = productId
    ? products.find((p) => p.id === parseInt(productId))?.name
    : null;

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
