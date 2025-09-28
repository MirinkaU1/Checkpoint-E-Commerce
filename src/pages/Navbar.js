import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [isScrolled, setIsScrolled] = useState(false);

  const { cartItemsCount } = useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    const currentPath = location.pathname;
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);

    if (currentPath === "/admin") {
      navigate("/404");
    } else {
      navigate(currentPath);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-30 transition-shadow duration-200 ${
          isScrolled
            ? "shadow-md bg-white/80 backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between py-6 mx-6 lg:mx-20"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="flex gap-3 items-center -m-1.5 p-1.5">
              <span className="sr-only">Votre entreprise</span>
              <img alt="" src="/img/logo.png" className="h-8 w-auto" />
              <span className="text-2xl font-bold text-bleu">iMasterStore</span>
            </Link>
          </div>

          <div className="flex gap-10 lg:hidden">
            <Link
              to="/cart"
              className="relative flex gap-3 -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-x-12">
            <Link
              to="/"
              className="menu__link text-base leading-6 text-gray-900"
            >
              Accueil
            </Link>
            <Link
              to="/products"
              className="menu__link text-base leading-6 text-gray-900"
            >
              Produits
            </Link>
            <Link
              to="/about"
              className="menu__link text-base leading-6 text-gray-900"
            >
              À propos
            </Link>
            <Link
              to="/cart"
              className="relative flex gap-3 -mx-3 rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
              Panier
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-5">
            {isAuthenticated ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <UserCircleIcon className="h-8 w-8 text-gray-700" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/account-settings"
                            className={`${
                              active ? "bg-gray-100" : ""
                            } flex justify-between w-full px-4 py-2 text-base text-gray-700`}
                          >
                            Paramètres de compte
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/order-history"
                            className={`${
                              active ? "bg-gray-100" : ""
                            } flex justify-between w-full px-4 py-2 text-base text-gray-700`}
                          >
                            Historique de commande
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } menu__link flex justify-between w-full px-4 py-2 text-base text-gray-700`}
                          >
                            Déconnexion
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <>
                <Link
                  to="/login"
                  className="menu__link text-base text-gray-700"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="menu__link text-base text-gray-700"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* spacer so page content isn't hidden behind fixed header */}
      <div className="h-24 lg:h-24" />

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div
          className={`fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:px-8 transition-transform duration-300 transform ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link
              onClick={() => setMobileMenuOpen(false)}
              to="/"
              className="-m-1.5 p-1.5"
            >
              <span className="sr-only">Votre entreprise</span>
              <img alt="" src="/img/logo.png" className="h-8 w-auto" />
            </Link>

            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fermer le menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6">
            <Link
              onClick={() => setMobileMenuOpen(false)}
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Accueil
            </Link>
            <Link
              onClick={() => setMobileMenuOpen(false)}
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Produits
            </Link>
            <Link
              onClick={() => setMobileMenuOpen(false)}
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              À propos
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to="/account-settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  Paramètres de compte
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to="/order-history"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  Historique de commande
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  Connexion
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}
