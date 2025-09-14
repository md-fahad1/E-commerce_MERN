import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaTrashAlt } from "react-icons/fa";

const UserWishList = () => {
  // Dummy wishlist items
  const [wishlist, setWishlist] = useState([
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
    {
      id: 3,
      name: "Gaming Mouse",
      price: "$60",
      image:
        "https://images.unsplash.com/photo-1593642532871-8b12e02d091c?w=200",
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: "$80",
      image:
        "https://images.unsplash.com/photo-1585386959984-a4155224a1a1?w=200",
    },
  ]);

  // Remove item
  const removeItem = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p>Your wishlist is empty 😔</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition relative group"
            >
              {/* Image */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Item Info */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="font-semibold text-gray-800 text-lg">
                  {item.name}
                </h2>
                <p className="text-gray-500 font-medium">{item.price}</p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-4">
                  <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
                    <FaShoppingCart /> Add to Cart
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm transition"
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              </div>

              {/* Heart Icon overlay */}
              <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-red-100 transition">
                <FaHeart className="text-red-500" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserWishList;
