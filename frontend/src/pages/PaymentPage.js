import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context";
import SummaryApi from "../Common";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";

const PaymentPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const context = useContext(Context);

  // Fetch cart products
  const fetchCartData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        setCartData(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchCartData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty > 1) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchCartData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchCartData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = cartData.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = cartData.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const handleOrderConfirm = async (e) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderData = {
      name,
      phone,
      address,
      note,
      cartItems: cartData,
      total: totalPrice,
    };

    console.log("Placing order...", orderData);

    // Here you'd call your backend to create the order
    // await fetch("/api/create-order", { method: "POST", body: JSON.stringify(orderData) })

    navigate("/success");
  };

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
      {/* Left - User Info */}
      <div className="w-full lg:w-2/3 bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Note (Optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              rows="2"
            />
          </div>
        </form>
      </div>

      {/* Right - Cart Summary */}
      <div className="w-full lg:w-1/3">
        <div className="bg-gray-50 border rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {cartData.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between mb-4 border-b pb-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div>
                      <p className="font-medium">
                        {product?.productId?.productName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {displayINRCurrency(product?.productId?.sellingPrice)} ×{" "}
                        {product.quantity}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQty(product._id, product.quantity)
                          }
                          className="border px-2 rounded"
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            increaseQty(product._id, product.quantity)
                          }
                          className="border px-2 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-semibold">
                      {displayINRCurrency(
                        product?.productId?.sellingPrice * product.quantity
                      )}
                    </p>
                    <button
                      type="button"
                      onClick={() => deleteCartProduct(product._id)}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center mt-1"
                    >
                      <MdDelete className="mr-1" /> Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between mt-4 text-lg font-semibold">
                <span>Total ({totalQty} items)</span>
                <span>{displayINRCurrency(totalPrice)}</span>
              </div>

              <button
                onClick={handleOrderConfirm}
                className="bg-[#192A56] hover:bg-green-700 text-white w-full mt-5 py-3 rounded-lg font-semibold"
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
