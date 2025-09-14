import React, { useState } from "react";
import {
  FaClipboardList,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";

const MyOrder = () => {
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: "#1001",
      date: "Sep 5, 2025",
      status: "Delivered",
      total: "$120",
      progress: ["Order Placed", "Processed", "Shipped", "Delivered"],
      history: [
        { step: "Order Placed", date: "Sep 1, 2025" },
        { step: "Processed", date: "Sep 2, 2025" },
        { step: "Shipped", date: "Sep 4, 2025" },
        { step: "Delivered", date: "Sep 5, 2025" },
      ],
    },
    {
      id: "#1002",
      date: "Sep 8, 2025",
      status: "Pending",
      total: "$75",
      progress: ["Order Placed", "Processed"],
      history: [
        { step: "Order Placed", date: "Sep 6, 2025" },
        { step: "Processed", date: "Sep 7, 2025" },
      ],
    },
    {
      id: "#1003",
      date: "Sep 10, 2025",
      status: "Shipped",
      total: "$250",
      progress: ["Order Placed", "Processed", "Shipped"],
      history: [
        { step: "Order Placed", date: "Sep 8, 2025" },
        { step: "Processed", date: "Sep 9, 2025" },
        { step: "Shipped", date: "Sep 10, 2025" },
      ],
    },
  ];

  const allSteps = [
    { label: "Order Placed", icon: <FaClipboardList /> },
    { label: "Processed", icon: <FaBox /> },
    { label: "Shipped", icon: <FaTruck /> },
    { label: "Delivered", icon: <FaCheckCircle /> },
  ];

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

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

      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-lg p-3 hover:shadow-xl transition"
          >
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-800">{order.id}</h2>
                <p className="text-gray-500">{order.date}</p>
              </div>
              <div className="flex items-center gap-4 mt-2 md:mt-0">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.status}
                </span>
                <span className="text-gray-700 font-semibold">{order.total}</span>
              </div>
            </div>

            {/* Tracking Progress */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between w-full relative">
                {allSteps.map((step, idx) => {
                  const completed = order.progress.includes(step.label);
                  const isLast = idx === allSteps.length - 1;
                  return (
                    <div key={step.label} className="flex-1 flex flex-col items-center relative">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-lg z-10 transition-all duration-500 ${
                          completed ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {step.icon}
                      </div>
                      {!isLast && (
                        <div
                          className={`absolute top-5 left-1/2 w-full h-1 -translate-x-1/2 transition-all duration-500 ${
                            order.progress.includes(allSteps[idx + 1].label)
                              ? "bg-green-600"
                              : "bg-gray-300"
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
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-11/12 max-w-2xl relative shadow-xl">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => setSelectedOrder(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Order Details {selectedOrder.id}
            </h2>
            <ul className="space-y-2">
              {selectedOrder.history.map((h) => (
                <li key={h.step} className="flex justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="font-medium">{h.step}</span>
                  <span className="text-gray-500">{h.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
