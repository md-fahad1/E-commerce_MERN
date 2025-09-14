"use client";
import React from "react";
import { Link } from "react-router-dom";


const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Enter your registered email and we’ll send you a reset link.
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-tomato focus:border-tomato outline-none transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#192A56] text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="text-tomato font-medium hover:underline"
            >
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
