import React, { useContext, useEffect, useState } from "react";

import Context from "../../context";
import displayINRCurrency from "../../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../../Common";
import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);
  const navigate = useNavigate();
  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
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
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
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
        fetchData();
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
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );
  const handlePayment = async () => {
    navigate("/payment");
  };
  //  const handlePayment = async () => {
  //    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  //    const response = await fetch(SummaryApi.payment.url, {
  //      method: SummaryApi.payment.method,
  //      credentials: "include",
  //      headers: {
  //        "content-type": "application/json",
  //      },
  //      body: JSON.stringify({
  //        cartItems: data,
  //      }),
  //    });
  //    const responseData = await response.json();
  //    if (responseData?.id) {
  //      stripePromise.rediretToCheckout({ sessionId: responseData.id });
  //    }
  //  };
  return (
    <div className="container mx-auto px-4 py-8">
      {data.length === 0 && !loading ? (
        <p className="bg-white py-5 text-center">No items in cart</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Cart Items */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
            <div className="border rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-4 bg-gray-100 p-3 font-medium">
                <p>Product Details</p>
                <p className="text-center">Quantity</p>
                <p className="text-center">Price</p>
                <p className="text-right">Total</p>
              </div>

              {data.map((product) => (
                <div
                  key={product?._id}
                  className="grid grid-cols-4 items-center border-t p-3 text-sm"
                >
                  {/* Product Details */}
                  <div className="flex gap-3 items-center">
                    <img
                      src={product?.productId?.productImage[0]}
                      className="w-16 h-16 object-contain border"
                    />
                    <div>
                      <p className="font-semibold">
                        {product?.productId?.productName}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {product?.productId?.category}
                      </p>
                      <button
                        onClick={() => deleteCartProduct(product?._id)}
                        className="text-red-500 text-xs mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() =>
                        decraseQty(product?._id, product?.quantity)
                      }
                      className="border px-2 rounded"
                    >
                      -
                    </button>
                    <span>{product?.quantity}</span>
                    <button
                      onClick={() =>
                        increaseQty(product?._id, product?.quantity)
                      }
                      className="border px-2 rounded"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <p className="text-center">
                    {displayINRCurrency(product?.productId?.sellingPrice)}
                  </p>

                  {/* Total */}
                  <p className="text-right font-medium">
                    {displayINRCurrency(
                      product?.productId?.sellingPrice * product?.quantity
                    )}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-4 text-[#192A56] text-sm"
            >
              ← Continue Shopping
            </button>
          </div>

          {/* Right - Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Items {totalQty}</span>
                <span>{displayINRCurrency(totalPrice)}</span>
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">
                  Shipping
                </label>
                <select className="w-full border p-2 rounded">
                  <option>Standard Delivery - ₹50</option>
                  <option>Express Delivery - ₹150</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">
                  Promo Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="border p-2 rounded-l w-full"
                  />
                  <button className="bg-[#192A56] text-white px-4 rounded-r">
                    Apply
                  </button>
                </div>
              </div>

              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total Cost</span>
                <span>{displayINRCurrency(totalPrice + 50)}</span>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-[#192A56] hover:bg-green-700 text-white py-2 rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
