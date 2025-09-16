import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaHeart,
  FaCreditCard,
  FaHeadset,
  FaUserCircle,
  FaTruck,
  FaCog,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../../Common"; // your API config
import displayCurrency from "../../helpers/displayCurrency";

const UserDashboard = ({ wishlist = [] }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.user);

  // Fetch user orders
  const fetchUserOrders = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const res = await fetch(`${SummaryApi.getUserOrders.url}/${user._id}`, {
        method: SummaryApi.getUserOrders.method,
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.data);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [user]);

  // Stats
  const stats = [
    {
      title: "My Orders",
      value: orders.length,
      icon: <FaBoxOpen className="text-indigo-600 w-7 h-7" />,
      bg: "bg-indigo-50",
    },
    {
      title: "Wishlist",
      value: wishlist.length,
      icon: <FaHeart className="text-pink-600 w-7 h-7" />,
      bg: "bg-pink-50",
    },
    {
      title: "Pending Payments",
      value: orders.filter((o) => o.orderStatus === "Pending").length,
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

  // Take last 3 orders
  const recentOrders = orders.slice(-3).reverse();

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
            <p className="mt-4 text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders & Wishlist Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-lg lg:col-span-2">
          <h2 className="text-xl font-semibold mb-5 text-gray-800">Recent Orders</h2>
          {loading ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : recentOrders.length === 0 ? (
            <p className="text-gray-500">No recent orders found.</p>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="p-4 rounded-xl border bg-gray-50 hover:shadow-md transition flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">#{order._id.slice(-4)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.orderStatus}
                  </p>
                  <p className="font-semibold text-gray-700">
                    {displayCurrency ? displayCurrency(order.totalAmount) : `$${order.totalAmount}`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Wishlist */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-5 text-gray-800">Wishlist</h2>
          {wishlist.length === 0 ? (
            <p className="text-gray-500">No items in wishlist.</p>
          ) : (
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
          )}
          {wishlist.length > 0 && (
            <button className="mt-5 w-full bg-gray-100 py-2 rounded-lg hover:bg-gray-200 transition text-gray-700 font-medium">
              View All
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
