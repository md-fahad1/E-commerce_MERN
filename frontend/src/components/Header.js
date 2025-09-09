import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle, FaMobileAlt, FaTv } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { TiShoppingCart, TiHeart } from "react-icons/ti";
import { CiGift } from "react-icons/ci";
import Context from "../context";
import SummaryApi from "../Common";
import ROLE from "../Common/role";
import { setUserDetails } from "../store/userSlice";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      dispatch(setUserDetails(null));
      navigate("/");
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) navigate(`/search?q=${value}`);
    else navigate("/search");
  };

  const handleCategoryClick = (category) => {
    navigate(`/product-category?category=${category}`);
  };

  const handleOfferClick = () => navigate("/offers");
  const handleWishlistClick = () => navigate("/wishlist");

  return (
    <header className="bg-[#192a56] text-white fixed w-full z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold font-serif hover:text-green-400 transition"
        >
          Gadget 360°
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center bg-white rounded-md overflow-hidden shadow-sm w-full max-w-md mx-4">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 outline-none text-gray-800"
          />
          <div className="bg-gray-300 p-2 flex items-center justify-center text-white">
            🔍
          </div>
        </div>

        {/* Categories & Sections */}
        <div className="hidden lg:flex gap-8 items-center">
          <div
            onClick={() => handleCategoryClick("televisions")}
            className="flex flex-col items-center cursor-pointer hover:text-green-400 transition"
          >
            <FaTv className="text-3xl" />
            <span className="text-xs mt-1">TVs</span>
          </div>
          <div
            onClick={() => handleCategoryClick("mobiles")}
            className="flex flex-col items-center cursor-pointer hover:text-green-400 transition"
          >
            <FaMobileAlt className="text-3xl" />
            <span className="text-xs mt-1">Mobiles</span>
          </div>
          <div
            onClick={handleOfferClick}
            className="flex flex-col items-center cursor-pointer hover:text-green-400 transition"
          >
            <span className="text-3xl font-bold">
              <CiGift />
            </span>
            <span className="text-xs mt-1">Offers</span>
          </div>
          <div
            onClick={handleWishlistClick}
            className="flex flex-col items-center cursor-pointer hover:text-green-400 transition"
          >
            <TiHeart className="text-3xl" />
            <span className="text-xs mt-1">Wishlist</span>
          </div>
          {/* Admin Panel */}
          {user?.role === ROLE.ADMIN && (
            <Link
              to="/admin-panel/products"
              className="flex flex-col items-center cursor-pointer hover:text-green-400 transition"
            >
              <span className="text-3xl font-bold">⚙️</span>
              <span className="text-xs mt-1">Admin</span>
            </Link>
          )}
        </div>

        {/* Cart, Profile, Logout */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          {user?._id && (
            <Link
              to="/cart"
              className="relative text-white text-2xl hover:text-green-400 transition"
            >
              <TiShoppingCart />
              <span className="absolute -top-2 -right-3 bg-red-600 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                {context?.cartProductCount || 0}
              </span>
            </Link>
          )}

          {/* Profile */}
          {!user?._id ? (
            <Link
              to="/login"
              className="flex items-center gap-2 text-white bg-[#1abc9c] px-3 py-1 rounded-full hover:bg-green-500 transition"
            >
              <FaUserCircle size={22} />
              <span className="text-sm font-semibold">Account</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <FaUserCircle size={28} className="text-white" />
              )}
            </div>
          )}

          {/* Logout */}
          {user?._id && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 transition text-white text-sm"
            >
              <IoIosLogOut size={20} />
              Logout
            </button>
          )}

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex items-center text-white text-2xl"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#192a56] text-white px-4 py-4 space-y-4">
          <div
            onClick={() => handleCategoryClick("televisions")}
            className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer"
          >
            <FaTv size={22} /> TVs
          </div>
          <div
            onClick={() => handleCategoryClick("mobiles")}
            className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer"
          >
            <FaMobileAlt size={22} /> Mobiles
          </div>
          <div
            onClick={handleOfferClick}
            className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer"
          >
            🔥 Offers
          </div>
          <div
            onClick={handleWishlistClick}
            className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer"
          >
            <TiHeart size={22} /> Wishlist
          </div>
          {user?._id && (
            <div
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-400 cursor-pointer"
            >
              <IoIosLogOut size={22} /> Logout
            </div>
          )}
          {!user?._id && (
            <Link
              to="/login"
              className="flex items-center gap-2 text-white bg-green-400 px-3 py-1 rounded-full hover:bg-green-500 transition"
            >
              <FaUserCircle size={20} /> Login / Register
            </Link>
          )}
          {user?.role === ROLE.ADMIN && (
            <Link
              to="/admin-panel/products"
              className="flex items-center gap-2 hover:text-green-400 transition"
            >
              ⚙️ Admin Panel
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
