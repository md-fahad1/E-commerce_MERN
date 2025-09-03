import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ImageToBase64 from "../helpers/imageToBase64";
import SummaryApi from "../Common";
import { toast } from "react-toastify";

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
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const image = await ImageToBase64(file);

    setData((prev) => {
      return {
        ...prev,
        profilePic: image,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
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
      console.log("please check password and confirm password");
    }
  };
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto ">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img
                src={data.profilePic || loginIcons}
                alt="login icon"
                className=""
              />
            </div>
            <form>
              <label>
                <div className="text-xs bg-slate-200 pb-5 pt-1 bg-opacity-75 absolute bottom-0 w-full cursor-pointer">
                  Uplaod Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <div className=" bg-slate-100 p-2">
                <input
                  type="text"
                  className=" w-full h-full outline-none bg-transparent"
                  placeholder="Enter your name "
                  onChange={handleOnChange}
                  name="name"
                  value={data.name}
                />
              </div>
            </div>
            <div>
              <label>Email:</label>
              <div className=" bg-slate-100 p-2">
                <input
                  type="email"
                  className=" w-full h-full outline-none bg-transparent"
                  placeholder="Enter your email address"
                  onChange={handleOnChange}
                  name="email"
                  value={data.email}
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className=" bg-slate-100 p-2 flex ">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                  name="password"
                  value={data.password}
                />
                <div
                  className="cursor-pointer text-xl text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password:</label>
              <div className=" bg-slate-100 p-2 flex ">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your confirm password"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnChange}
                  name="confirmPassword"
                  value={data.confirmPassword}
                />
                <div
                  className="cursor-pointer text-xl text-gray-600"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-4"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="my-6">
            Already have an account ?{" "}
            <Link to={"/login"} className="text-red-600 hover:text-red-700">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
