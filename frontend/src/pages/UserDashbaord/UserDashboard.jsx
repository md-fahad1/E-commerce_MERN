import React from "react";
import {
  FaBoxOpen,
  FaHeart,
  FaCreditCard,
  FaHeadset,
  FaUserCircle,
  FaTruck,
  FaCog,
} from "react-icons/fa";

const UserDashboard = ({ user }) => {
  // Dummy stats
  const stats = [
    {
      title: "My Orders",
      value: 12,
      icon: <FaBoxOpen className="text-indigo-600 w-7 h-7" />,
      bg: "bg-indigo-50",
    },
    {
      title: "Wishlist",
      value: 5,
      icon: <FaHeart className="text-pink-600 w-7 h-7" />,
      bg: "bg-pink-50",
    },
    {
      title: "Pending Payments",
      value: 2,
      icon: <FaCreditCard className="text-yellow-600 w-7 h-7" />,
      bg: "bg-yellow-50",
    },
    {
      title: "Support Tickets",
      value: 1,
      icon: <FaHeadset className="text-green-600 w-7 h-7" />,
      bg: "bg-green-50",
    },
  ];

  // Dummy orders
  const recentOrders = [
    { id: "#1001", date: "Sep 5, 2025", status: "Delivered", total: "$120" },
    { id: "#1002", date: "Sep 8, 2025", status: "Pending", total: "$75" },
    { id: "#1003", date: "Sep 10, 2025", status: "Shipped", total: "$250" },
  ];

  // Dummy wishlist
  const wishlist = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$99",
      image:
        "https://images.unsplash.com/photo-1585386959984-a4155224a1a1?w=200",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$150",
      image:
        "https://images.unsplash.com/photo-1606813902912-fb57f02dbab1?w=200",
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-lg">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.name || "User"} 👋
          </h1>
          <p className="text-sm opacity-90 mt-1">
            Manage your orders, wishlist, and account settings easily.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <button className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 text-sm font-medium">
              <FaTruck /> Track Order
            </button>
            <button className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 text-sm font-medium">
              <FaCog /> Settings
            </button>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <FaUserCircle className="w-20 h-20 text-white/90" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`${stat.bg} p-6 rounded-xl shadow hover:shadow-md transition`}
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-700 font-medium">{stat.title}</p>
              {stat.icon}
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Orders & Wishlist Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-lg lg:col-span-2">
          <h2 className="text-xl font-semibold mb-5 text-gray-800">
            Recent Orders
          </h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl border bg-gray-50 hover:shadow-md transition flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <p
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.status}
                </p>
                <p className="font-semibold text-gray-700">{order.total}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wishlist */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-5 text-gray-800">Wishlist</h2>
          <div className="space-y-4">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-lg border hover:bg-gray-50 transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.price}</p>
                </div>
                <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <button className="mt-5 w-full bg-gray-100 py-2 rounded-lg hover:bg-gray-200 transition text-gray-700 font-medium">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
