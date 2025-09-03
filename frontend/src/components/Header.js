import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLaptop } from "react-icons/ai";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../Common/role";
import Context from "../context";
import SummaryApi from "../Common";
import { FaUser } from "react-icons/fa";
import { FaMobileScreen } from "react-icons/fa6";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  console.log("user", user);
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  const handleCategoryClick = (category) => {
    window.location.href = `/product-category?category=${category}`;
  };

  return (
    <header className="h-16 shadow-md bg-[#192a56] fixed w-full z-40">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className="text-bold font-mono text-2xl text-white">
          <a href={"/"}>Gadget 360°</a>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border  focus-within:shadow bg-white ">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-gray-300 flex items-center justify-center rounded-l-md text-gray-800">
            <GrSearch />
          </div>
        </div>
        <div className=" text-white font-semibold flex items-center gap-2 cursor-pointer">
          <div
            onClick={() => handleCategoryClick("televisions")}
            className="flex items-center gap-2"
          >
            <AiOutlineLaptop className="text-3xl text-[#00b894]" />
            <div>
              <p> Televisions</p>
              <p className="text-xs">Deals</p>
            </div>
          </div>
        </div>

        <div className=" text-white font-semibold flex items-center gap-2 cursor-pointer">
          <div
            onClick={() => handleCategoryClick("mobiles")}
            className="flex items-center gap-2"
          >
            <FaMobileScreen className="text-3xl text-[#00b894]" />
            <div>
              <p> Mobile</p>
              <p className="text-xs">Deals</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser className="text-[#00b894]" />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <a
                      href="/admin-panel/products"
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </a>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <a href="/cart" className="text-2xl relative text-white">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </a>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white "
              >
                <div className="flex flex-col items-center gap-2 lg:flex-row">
                  <div>
                    <FaUser className="w-5 h-5 text-[#00b894] " />
                  </div>
                  <div className="text-white">
                    <p className="font-semibold text-2xs md:text-sm">Account</p>
                    <div className="text-xs mt-[-1px] hidden lg:block ">
                      <Link href="/auth/login"> Register</Link> or
                      <Link href=""> Login</Link>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
