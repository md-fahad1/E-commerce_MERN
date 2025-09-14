import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ImageToBase64 from "../../helpers/imageToBase64";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import loginIcons from "../../assest/login1.png";
import OAuth from "./OAuth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const image = await ImageToBase64(file);
    setData((prev) => ({ ...prev, profilePic: image }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Passwords do not match!");
    }
  };

  return (
    <section className="flex items-center justify-center max-h-fit bg-gray-100">
      <div className="flex w-full max-w-5xl h-80vh bg-white mt-5 rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-b from-[#192A56] to-purple-400 p-10 text-white">
          <h2 className="text-3xl font-bold mb-3 leading-snug">
            Create your <br /> account today.
          </h2>
          <p className="text-sm mb-6">
            Join us and manage your e-commerce business with ease using our
            powerful admin dashboard.
          </p>
          <img src={loginIcons} alt="illustration" className="max-w-xs mt-6" />
        </div>

        {/* Right Side (Signup Form) */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Sign Up</h2>
          <p className="text-sm text-gray-500 mb-6">
            Please create your account
          </p>

          {/* Profile Pic Upload */}
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full mb-6">
            <img
              src={data.profilePic || loginIcons}
              alt="profile"
              className="object-cover w-full h-full"
            />
            <label>
              <div className="text-xs bg-slate-200 py-1 bg-opacity-75 absolute bottom-0 w-full text-center cursor-pointer">
                Upload Photo
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleUploadPic}
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-gray-600 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

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
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-gray-600 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#192A56] text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Social Signup */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="px-3 text-sm text-gray-500">Or Sign up with</p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex justify-center gap-4">
            <OAuth />
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

          {/* Already have account */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#192A56] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
