import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-transparent py-4 absolute z-10 top-0 w-full">
      <div className="mx-20 flex flex-row justify-between items-center">
        <Link
          className="flex gap-4 items-center text-2xl font-bold text-bleu"
          to="/"
        >
          <img
            src="/img/logo.png"
            alt="logo"
            className="text-Montserrat w-12"
          />
          iMasterStore
        </Link>
        <div className="flex flex-row gap-10 items-center">
          <div className="space-x-6">
            <Link to="/" className="text-gray-700 hover:text-bleu">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-bleu">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-bleu">
              About
            </Link>
          </div>
          <button className="flex flex-row gap-2 items-center text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6 text-bleu"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
            Cart
          </button>
          <Link
            to="/register"
            className="bg-orange text-white px-4 py-2 rounded-full"
          >
            Registration
          </Link>
          <Link
            to="/login"
            className="bg-white text-bleu border border-bleu px-4 py-2 rounded-full hover:bg-bleu hover:text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
