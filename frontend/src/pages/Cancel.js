import React from "react";
import SUCCESSIMAGE from "../assest/banner/banner1.jpg";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="bg-slate-200 w-full m-2 rounded max-w-md mx-auto flex justify-center items-center flex-col p-4">
      <img
        src={SUCCESSIMAGE}
        alt="success"
        width={150}
        height={150}
        className="mix-blend-multiply"
      />
      <p className="text-green-500 font-bold text-lg">Payment Cancel</p>
      <Link
        to={"/cart"}
        className="p-2 mt-4  border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white"
      >
        Go to Cart
      </Link>
    </div>
  );
};

export default Cancel;
