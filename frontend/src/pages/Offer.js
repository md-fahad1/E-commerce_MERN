// pages/Offers.jsx
import React from "react";

const dummyOffers = [
  {
    id: 1,
    name: "Wireless Headphones",
    oldPrice: 120,
    newPrice: 80,
    image: "https://images.unsplash.com/photo-1585386959984-a415522b8c6b?auto=format&fit=crop&w=400&q=80",
    discount: "33% OFF",
  },
  {
    id: 2,
    name: "Smart Watch",
    oldPrice: 200,
    newPrice: 150,
    image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=400&q=80",
    discount: "25% OFF",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    oldPrice: 90,
    newPrice: 60,
    image: "https://images.unsplash.com/photo-1580894908361-6d4a4f48624c?auto=format&fit=crop&w=400&q=80",
    discount: "33% OFF",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    oldPrice: 50,
    newPrice: 35,
    image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=400&q=80",
    discount: "30% OFF",
  },
  {
    id: 5,
    name: "Laptop Stand",
    oldPrice: 70,
    newPrice: 50,
    image: "https://images.unsplash.com/photo-1593642532871-8b12e02d091c?auto=format&fit=crop&w=400&q=80",
    discount: "28% OFF",
  },
];

export default function Offers() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className=" p-10 rounded-b-3xl text-center text-black mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Exclusive Product Offers</h1>
        <p className="text-lg md:text-xl">Grab your favorite products at unbeatable prices!</p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {dummyOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow">
                  {offer.discount}
                </span>
              </div>

              <div className="p-4 flex flex-col justify-between h-56">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{offer.name}</h2>
                  <div className="mt-2 flex items-center">
                    <span className="text-gray-400 line-through mr-2">${offer.oldPrice}</span>
                    <span className="text-green-600 font-bold text-lg">${offer.newPrice}</span>
                  </div>
                </div>
                <button
                  className="mt-4 w-full py-2 rounded-lg font-semibold text-white"
                  style={{ backgroundColor: "#192A56" }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
