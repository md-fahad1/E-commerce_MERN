import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../../Common";
import displayCurrency from "../../helpers/displayCurrency";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.user); // logged-in user

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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left border-b">Order ID</th>
                <th className="py-3 px-4 text-left border-b">Date</th>
                <th className="py-3 px-4 text-left border-b">Total Items</th>
                <th className="py-3 px-4 text-left border-b">Total Price</th>
                <th className="py-3 px-4 text-left border-b">Status</th>
                <th className="py-3 px-4 text-left border-b">Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-gray-700 font-medium">
                    {order._id}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-600">
                    {order.items.length}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-700 font-semibold">
                    {displayCurrency(
                      order.items.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        order.orderStatus === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.orderStatus === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.orderStatus || "Pending"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <ul className="space-y-1">
                      {order.items.map((item) => (
                        <li key={item._id} className="text-gray-700 text-sm">
                          {item.productId.productName} x {item.quantity}
                        </li>
                      ))}
                    </ul>
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

export default OrderPage;
