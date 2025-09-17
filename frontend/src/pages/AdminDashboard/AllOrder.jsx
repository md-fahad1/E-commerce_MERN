import React, { useEffect, useState } from "react";
import SummaryApi from "../../Common"; // your API endpoints
import displayINRCurrency from "../../helpers/displayCurrency";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(SummaryApi.getAllOrders.url, {
        method: SummaryApi.getAllOrders.method,
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
    fetchOrders();
  }, []);
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/order/update-status/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderStatus: newStatus }), // ✅ match backend
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update order status");
      }
      toast.success("Order status updated successfully!");
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(error.message);
    }
  };
  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(
        SummaryApi.deleteOrder.url.replace(":id", orderId),
        {
          method: SummaryApi.deleteOrder.method,
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Order deleted successfully!");
        fetchOrders(); // refresh orders
      } else {
        toast.error(data.message || "Failed to delete order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const statusColors = {
    Processing: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Items</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Total Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{order._id.slice(0, 8)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {order.userId?.name} <br />
                    <span className="text-gray-400 text-xs">{order.userId?.email}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {order.items?.map((item) => (
                      <div key={item._id} className="mb-1">
                        {item.productId?.productName} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                    {displayINRCurrency(
                      order.items?.reduce((total, item) => total + item.price * item.quantity, 0)
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.paymentMethod}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className={`border rounded px-2 py-1 text-sm ${statusColors[order.orderStatus]}`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center flex items-center mt-4 justify-center gap-2">
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      <MdDelete /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllOrder;
