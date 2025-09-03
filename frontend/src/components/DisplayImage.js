import React from "react";
import { CgClose } from "react-icons/cg";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 right-0 left-0 top-0 flex justify-center items-center ">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto">
        <div className=" w-fit ml-auto p-2">
          <CgClose
            className="text-2xl font-bold hover:text-red-600 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex justify-center p-4 max-h-[80vh] max-w-[80vw]">
          <img src={imgUrl} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
