import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaUsers,
  FaBoxOpen,
  FaCog,
  FaSignOutAlt,
  FaChartLine,
  FaClipboardList,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import SummaryApi from "../Common";
import { Link, useLocation } from "react-router-dom";
import { setUserDetails } from "../store/userSlice";

const Sidebar = () => {
  const user = useSelector((state) => state?.user?.user);
  const location = useLocation();
 const dispatch = useDispatch();
   const navigate = useNavigate();
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
  // Admin Navigation Paths
  const navItems = [
    { name: "Dashboard", path: "/admin-panel", icon: <FaChartLine /> },
    { name: "All Users", path: "/admin-panel/all-user", icon: <FaUsers /> },
    { name: "All Products", path: "/admin-panel/products", icon: <FaBoxOpen /> },
    { name: "Orders", path: "/admin-panel/orders", icon: <FaClipboardList /> },
    { name: "Messages", path: "/admin-panel/messages", icon: <FaEnvelope /> },
    { name: "Calendar", path: "/admin-panel/calendar", icon: <FaCalendarAlt /> },
    { name: "Reports", path: "/admin-panel/reports", icon: <FaChartLine /> },
    { name: "Profile", path: "/admin-panel/profile", icon: <FaUserCircle /> },
  ];

  // Color mapping for active item
  const colorMap = {
    activeBg: "bg-green-100",
    activeText: "text-green-700",
    hoverBg: "hover:bg-green-50",
    hoverText: "hover:text-green-600",
  };

  return (
    <aside className="bg-white shadow-lg w-[280px] min-h-screen flex flex-col sticky top-0">
      {/* Profile Section */}
      <div className="flex flex-col items-center mt-6 mb-6 px-6">
        <div className="w-16 h-16 relative">
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt={user.name}
              className="w-full h-full rounded-full object-cover border-2 border-green-400 shadow-sm"
            />
          ) : (
            <FaUserCircle className="w-full h-full text-gray-400" />
          )}
        </div>
        <h2 className="mt-3 text-md font-semibold text-gray-800 capitalize text-center">
          {user?.name || "Admin User"}
        </h2>
        <p className="text-sm text-gray-500">{user?.role || "Administrator"}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 transition-all duration-200
                ${isActive ? `${colorMap.activeBg} ${colorMap.activeText} font-medium` : `${colorMap.hoverBg} ${colorMap.hoverText}`}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Links */}
      <div className="px-4 mt-auto mb-6">
        <Link
          to="/admin-panel/settings"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 ${colorMap.hoverBg} ${colorMap.hoverText} transition-all duration-200`}
        >
          <FaCog /> <span>Settings</span>
        </Link>
        <button
           onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 mt-2 transition-all duration-200"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
