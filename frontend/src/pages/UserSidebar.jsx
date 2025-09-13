import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaBoxOpen,
  FaHeart,
  FaCog,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";
import SummaryApi from "../Common";
import Empty from "../assest/empty.jpg"
import { setUserDetails } from "../store/userSlice";

const UserSidebar = () => {
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

  const navItems = [
    { name: "Dashboard", path: "/user-panel", icon: <FaChartLine /> },
    { name: "My Orders", path: "/user-panel/orders", icon: <FaBoxOpen /> },
    { name: "Wishlist", path: "/user-panel/wishlist", icon: <FaHeart /> },
    { name: "Settings", path: "/user-panel/settings", icon: <FaCog /> },
    { name: "Profile", path: "/user-panel/profile", icon: <FaUserCircle /> },
  ];

  const colorMap = {
    activeBg: "bg-green-100",
    activeText: "text-green-700",
    hoverBg: "hover:bg-green-50",
    hoverText: "hover:text-green-600",
  };

  return (
    <aside className="bg-white shadow-lg w-64 min-h-screen flex flex-col sticky top-0 rounded-r-2xl overflow-hidden">
      {/* Profile Header */}
      <div className="  p-6 flex flex-col items-center text-gray-700 rounded-b-2xl shadow-md">
        <div className="w-20 h-20 mb-3 relative">
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt={user.name}
              className="w-full h-full rounded-full object-cover border-2 border-gray-700 shadow-sm"
            />
          ) : (
           <img
              src={Empty}
              alt={user.name}
              className="w-full h-full rounded-full object-cover  shadow-sm"
            />
          )}
        </div>
        <h2 className="text-lg font-semibold capitalize text-center">
          {user?.name || "User"}
        </h2>
        <p className="text-sm opacity-90">{user?.role || "General"}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 mt-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 transition-all duration-200
                ${
                  isActive
                    ? `${colorMap.activeBg} ${colorMap.activeText} font-medium shadow-md`
                    : `${colorMap.hoverBg} ${colorMap.hoverText}`
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer - Logout */}
      <div className="px-4 mt-auto mb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 w-full font-medium transition-all duration-200 shadow-sm"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;
