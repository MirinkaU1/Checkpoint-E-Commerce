import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-bleu mt-auto w-full text-white py-8">
      <div className="mx-10 lg:mx-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">Navigation</h3>
          <div className="flex flex-col">
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
            <Link to="/products" className="hover:text-blue-400">
              Products
            </Link>
            <Link to="/" className="hover:text-blue-400">
              Customer Reviews
            </Link>
            <Link to="/" className="hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-blue-400">
              Terms of Use
            </Link>
          </div>
          <Link
            className="flex flex-row gap-4 items-center text-2xl font-bold text-white mt-10"
            to="/"
          >
            <img
              src="/img/logo-white.png"
              alt="logo"
              className="text-Montserrat w-14"
            />
            iMasterStore
          </Link>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">About Us</h3>
          <div className="flex flex-col">
            <Link to="/" className="hover:text-blue-400">
              Meet the team
            </Link>
            <Link to="/products" className="hover:text-blue-400">
              Compagny Overview
            </Link>
            <Link to="/" className="hover:text-blue-400">
              Our values
            </Link>
            <Link to="/" className="hover:text-blue-400">
              Our mission
            </Link>
          </div>
          <div className="flex flex-row items-center gap-5 mt-auto">
            <Link
              to="https://instagram.com"
              className="bg-[#efefef] pb-1 p-3 rounded-full text-orange text-3xl"
            >
              <i class="fi fi-brands-instagram"></i>
            </Link>
            <Link
              to="https://linkedin.com"
              className="bg-[#efefef] pb-1 p-3 rounded-full text-orange text-3xl"
            >
              <i class="fi fi-brands-linkedin"></i>
            </Link>
            <Link
              to="https://twitter.com"
              className="bg-[#efefef] pb-1 p-3 rounded-full text-orange text-3xl"
            >
              <i class="fi fi-brands-twitter"></i>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">Contact Us</h3>
          <div className="flex flex-col">
            <Link to="/" className="hover:text-blue-400">
              logoipsum@gmail.com
            </Link>
            <Link to="/products" className="hover:text-blue-400">
              (229) 555-0109
            </Link>
            <Link to="/" className="hover:text-blue-400">
              (229) 657-0118
            </Link>
          </div>
          <div className="mt-auto text-left mb-4 md:mb-0">
            <p>&copy; 2024 Logoipsum.me</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
