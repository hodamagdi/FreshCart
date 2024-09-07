import logo from "../../assets/imgs/fav.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { token, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function logOut() {
    setToken(null);
    navigate('/login');
  }

  return (
    <>
      <nav className="bg-gray-100 py-2 border-gray-200 dark:bg-gray-900">
        <div className="max-w-[1400px] flex gap-4  items-center justify-between mx-auto py-4">
          <a className="flex items-center">
            <img src={logo} alt="" className="w-10 h-7 px-0" />
            <h1 className="text-black dark:text-gray-100 text-2xl me-3">FreshCart</h1>
          </a>

          {/* Navigation Links */}
          {token && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to=""
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Home
              </Link>

              <Link
                to="cart"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Cart
              </Link>

              <Link
                to="wishlist"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Wish List
              </Link>

              <Link
                to="products"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Products
              </Link>

              <Link
                to="categories"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                categories
              </Link>

              <Link
                to="brands"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Brands
              </Link>

            </div>
          )}
          {token && (
            <div className="hidden lg:flex items-center space-x-4">
              <ul>
                <li className="flex gap-4">
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaInstagram /></a>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaFacebook /></a>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaTiktok /></a>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaTwitter /></a>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaLinkedin /></a>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaYoutube /></a>
                </li>

              </ul>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden dark:text-white text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {!token && (
              <>
                <Link to="/login" className="dark:text-white text-black hover:text-green-500">Log In</Link>
                <Link to="/register" className="dark:text-white text-black hover:text-green-500">Register</Link>
              </>
            )}
            {token && (
              <>
                <Link
                  to="cart">
                  <span className="block relative cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
                    <IoCartOutline className="text-2xl" />
                    <span className="text-sm text-white bg-green-500 rounded-md px-1 absolute top-0 end-0 translate-x-1/2 -translate-y-1/2">{cartItems}</span>
                  </span>
                </Link>
                <button onClick={logOut} className="dark:text-white text-black hover:text-green-500">Log Out</button>
              </>
            )}
            <ToggleMode />
          </div>
        </div>

        {/* Mobile Menu */}
        {token && (
          <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
            <ul className="space-y-4 mt-4 flex flex-col justify-center text-center">
            <Link
                to=""
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 sm:hover:text-green-700 lg:p-0 dark:text-white sm:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Home
              </Link>

              <Link
                to="cart"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 sm:hover:text-green-700 lg:p-0 dark:text-white sm:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Cart
              </Link>

              <Link
                to="wishlist"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 sm:hover:text-green-700 lg:p-0 dark:text-white sm:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Wish List
              </Link>

              <Link
                to="products"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 sm:hover:text-green-700 lg:p-0 dark:text-white sm:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Products
              </Link>

              <Link
                to="categories"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 sm:hover:text-green-700 lg:p-0 dark:text-white sm:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                categories
              </Link>

              <Link
                to="brands"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 sm:hover:text-green-700 lg:p-0 dark:text-white sm:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Brands
              </Link>

            </ul>
            <div className="flex space-x-4 mt-4 justify-center">
              <ul>
                <li className="flex gap-4">
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaInstagram /></a>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaFacebook /></a>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaTiktok /></a>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaTwitter /></a>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaLinkedin /></a>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaYoutube /></a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function ToggleMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
  const ref = useRef(document.querySelector("html"));
  useEffect(() => {
    ref.current.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <button onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? (
        <MdDarkMode className="text-white" />
      ) : (
        <MdOutlineDarkMode />
      )}
    </button>
  );
}

export default Navbar;
