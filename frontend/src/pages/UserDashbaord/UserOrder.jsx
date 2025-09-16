import React, { useState, useEffect } from "react";
import {
  FaClipboardList,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import displayCurrency from "../../helpers/displayCurrency";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";

const MyOrder = () => {
  const [filter, setFilter] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const user = useSelector((state) => state.user.user);

  const allSteps = [
    { label: "Order Placed", icon: <FaClipboardList /> },
    { label: "Processing", icon: <FaBox /> },
    { label: "Shipped", icon: <FaTruck /> },
    { label: "Delivered", icon: <FaCheckCircle /> },
  ];

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

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.orderStatus === filter);

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">My Orders</h1>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-3 gap-3">
        <div className="flex items-center gap-2 border rounded-lg p-2 bg-white shadow-sm">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="outline-none px-2 py-1"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Delivered", "Pending", "Shipped"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === status
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {loading ? (
          <p>Loading...</p>
        ) : filteredOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg p-3 hover:shadow-xl transition"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Order #{order._id.slice(-4)}
                  </h2>
                  <p className="text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.orderStatus || "Pending"}
                  </span>
                  <span className="text-gray-700 font-semibold">
                    {displayCurrency(
                      order.items.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                    )}
                  </span>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {order.items.map((item) => (
                  <div
                    key={item.productId._id}
                    className="border p-2 rounded-lg flex justify-between items-center"
                  >
                    <span className="font-medium">
                      {item.productId.productName}
                    </span>
                    <span className="text-gray-500">x{item.quantity}</span>
                    <span className="text-gray-700 font-semibold">
                      {displayCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tracking Progress */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between w-full relative">
                  {allSteps.map((step, idx) => {
                    const completed =
                      order.items.some(
                        (i) => order.orderStatus === step.label
                      ) || order.orderStatus === step.label;
                    const isLast = idx === allSteps.length - 1;
                    return (
                      <div
                        key={step.label}
                        className="flex-1 flex flex-col items-center relative"
                      >
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-full text-lg z-10 transition-all duration-500 ${
                            completed
                              ? "bg-green-600 text-white"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {step.icon}
                        </div>
                        {!isLast && (
                          <div
                            className={`absolute top-5 left-1/2 w-full h-1 -translate-x-1/2 transition-all duration-500 ${
                              completed ? "bg-green-600" : "bg-gray-300"
                            }`}
                          ></div>
                        )}
                        <span className="text-xs text-gray-500 mt-2 text-center w-20">
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-11/12 max-w-2xl relative shadow-2xl border-t-8 border-green-600">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold transition"
              onClick={() => setSelectedOrder(null)}
            >
              &times;
            </button>

            {/* Modal Header */}
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Order #{selectedOrder._id.slice(-4)}
              </h2>
              <p className="text-gray-500 mt-1">
                Placed on{" "}
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Products Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-1 border-gray-200">
                Products
              </h3>
              <ul className="space-y-3">
                {selectedOrder.items.map((item) => (
                  <li
                    key={item.productId._id}
                    className="flex justify-between items-center p-3 bg-green-50 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">
                        {item.productId.productName}
                      </span>
                      <span className="text-gray-500 text-sm">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="text-green-700 font-semibold">
                      {displayCurrency(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order History Section */}
            {selectedOrder.history?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-1 border-gray-200">
                  Order History
                </h3>
                <ul className="space-y-2">
                  {selectedOrder.history.map((h) => (
                    <li
                      key={h.step}
                      className="flex justify-between p-3 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                      <span className="font-medium text-gray-800">
                        {h.step}
                      </span>
                      <span className="text-blue-700 font-semibold">
                        {h.date}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
