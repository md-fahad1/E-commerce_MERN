// pages/Wishlist.jsx
import React from "react";

const wishlistProducts = [
  {
    id: 1,
    name: "Grey Sweater",
    price: 18,
    oldPrice: 20,
    quantity: 1,
    stock: "In Stock",
    image: "https://via.placeholder.com/50",
    dateAdded: "August 22, 2022",
    action: "Add to Cart",
  },
  {
    id: 2,
    name: "Cherokee T-Shirt",
    price: 34.99,
    quantity: 1,
    stock: "In Stock",
    image: "https://via.placeholder.com/50",
    dateAdded: "August 22, 2022",
    action: "Add to Cart",
  },
  {
    id: 3,
    name: "Blue Man T-Shirt",
    price: "12.99 – 14.99",
    quantity: 1,
    stock: "In Stock",
    image: "https://via.placeholder.com/50",
    dateAdded: "August 22, 2022",
    action: "Select Options",
  },
];

const Wishlist = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <div className="flex justify-center space-x-6 text-gray-600 text-sm">
          <button className="hover:underline">Create a wishlist</button>
          <button className="hover:underline">Your wishlists</button>
          <button className="hover:underline">Search wishlist</button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Product Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Unit Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Stock Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Added On / Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {wishlistProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-4">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-4 flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  <span className="text-gray-800">{product.name}</span>
                </td>
                <td className="px-4 py-4 text-gray-700">
                  {product.oldPrice && (
                    <span className="line-through text-gray-400 mr-2">${product.oldPrice}</span>
                  )}
                  <span className="font-semibold text-gray-900">{product.price}</span>
                </td>
                <td className="px-4 py-4 text-gray-700">{product.quantity}</td>
                <td className="px-4 py-4 text-green-600 font-semibold">{product.stock}</td>
                <td className="px-4 py-4">
                  <p className="text-gray-500 text-xs mb-1">Added on: {product.dateAdded}</p>
                  <button className="bg-[#192A56] text-white py-1 px-3 rounded text-sm hover:bg-[#0f1b42] transition">
                    {product.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back Link */}
      <div className="max-w-6xl mx-auto mt-4">
        <button className="text-green-600 text-sm hover:underline">&lt; Back to all wishlists</button>
      </div>
    </div>
  );
};

export default Wishlist;
