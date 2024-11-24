import React from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const getExcerpt = (htmlString, wordLimit) => {
    const div = document.createElement("div");
    div.innerHTML = htmlString;
    const text = div.textContent || div.innerText || "";
    const words = text.split(" ").slice(0, wordLimit).join(" ");
    return words + (text.split(" ").length > wordLimit ? "..." : "");
  };

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <div className="flex flex-row mb-2 ">
        <div className="h-auto">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48"
            />
          )}
        </div>

        <div className="w-1/2">
          <p>{getExcerpt(product.description, 20)}</p>
          <p>Prix : {product.basePrice} €</p>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => onEdit(product)}
          className="bg-blue-500 text-white p-2 rounded mr-2"
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(product._id)}
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
    </div>
  );
};

export default ProductCard;
