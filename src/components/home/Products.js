import React from "react";
import { useNavigate } from "react-router-dom";
import products from "../../data/products.json";

const Products = () => {
  const featuredProducts = products.slice(0, 3);
  const navigate = useNavigate();

  const handleBuyNowClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <section className="bg-bleu w-full py-12">
      <div className="mx-20">
        <h2 className="text-2xl text-white font-bold mb-2">
          Discover the newest iPhones with exclusive deals
        </h2>
        <p className="text-white mb-6">
          Upgrade to the latest technology at unbeatable prices. Choose your
          favorite model and enjoy the best features Apple has to offer
        </p>
        <div className="grid grid-cols-3 justify-between gap-6 mx-5">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-white border rounded-xl h-auto p-4 shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-auto h-96 -mt-16 -mb-10 -mx-0"
              />
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-gray-600 text-Poppins text-base mb-2">
                {product.description}
              </p>
              <p className="text-2xl font-bold mb-4">${product.price}</p>
              <div className="mt-auto">
                <button
                  onClick={() => handleBuyNowClick(product.id)}
                  className="bg-orange text-xl text-white px-4 py-2 w-full rounded-xl hover:bg-orange-600"
                >
                  Buy now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
