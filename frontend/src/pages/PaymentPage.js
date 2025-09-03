import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlePayment = async (event) => {
    event.preventDefault();

    // Example payment processing logic
    try {
      const paymentData = {
        cardNumber,
        expiryDate,
        cvv,
        name,
        email,
      };

      console.log("Processing payment...", paymentData);
      // Here you would make an API call to your payment processor
      // Example: await processPayment(paymentData);
      navigate("/success");

      // Clear form fields after successful payment
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
      <form onSubmit={handlePayment}>
        <div className="mb-4">
          <label className="block text-gray-700">Name on Card</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Expiry Date</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 p-2 text-white w-full mt-2 rounded"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
