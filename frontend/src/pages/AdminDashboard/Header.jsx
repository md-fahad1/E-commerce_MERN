import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FaBell, FaEnvelope, FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white flex justify-between items-center px-6 py-3 shadow-md sticky top-0 z-50">
      {/* Left: Logo / Title */}
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        {/* Dummy search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-3 pr-10 ml-10 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="absolute right-1 top-1 text-gray-500 hover:text-gray-700">
            🔍
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FaBell className="text-xl" />
          <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
            5
          </span>
        </div>

        {/* Messages */}
        <div className="relative cursor-pointer">
          <FaEnvelope className="text-xl" />
          <span className="absolute -top-2 -right-2 text-xs bg-green-500 text-white rounded-full px-1">
            3
          </span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <FaUserCircle className="text-2xl" />
            )}
            <span className="capitalize font-medium">{user?.name}</span>
          </div>

          {/* Dropdown content */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                  <FaUserCircle /> <span>Profile</span>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                  <FaCog /> <span>Settings</span>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                  <FaSignOutAlt /> <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
