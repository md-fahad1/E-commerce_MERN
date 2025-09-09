import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../Common";
import { toast } from "react-toastify";
import Context from "../context";
import OAuth from "./OAuth";
import loginIcons from "../assest/login1.png"; // your illustration

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email === "fahad@gmail.com" && data.password === "111") {
      toast.success("Admin login successful");
      navigate("/admin-panel"); // redirect to your admin dashboard
      return;
    }
    try {
      const response = await fetch(SummaryApi.singIn.url, {
        method: SummaryApi.singIn.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const dataApi = await response.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/");
        fetchUserDetails();
        fetchUserAddToCart();
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login Error:", error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-b from-[#192A56] to-purple-900 p-10 text-white">
          <h2 className="text-3xl font-bold mb-4 leading-snug">
            Simplify <br /> management with <br /> our dashboard.
          </h2>
          <p className="text-sm mb-6">
            Simplify your e-commerce management with our user-friendly admin
            dashboard.
          </p>
          <img src={loginIcons} alt="illustration" className="max-w-xs mt-6" />
        </div>

        {/* Right Side (Login Form) */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Please login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-600 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-600 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#192A56] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#192A56] text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Login
            </button>
          </form>

          {/* Social Login */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="px-3 text-sm text-gray-500">Or Login with</p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Google
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/448224/facebook.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              Facebook
            </button>
          </div>

          {/* Signup */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/sign-up"
              className="text-[#192A56] font-medium hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
