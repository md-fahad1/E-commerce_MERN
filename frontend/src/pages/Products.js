import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../Common";
import AdminProductCard from "../components/AdminProductCard";

const Products = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }
      const dataResponse = await response.json();
      setAllProducts(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg"> All Products</h2>
        <button
          className="border-2 border-blue-600 text-blue-600 hover:bg-green-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>
      {/* all product */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProducts.map((product, index) => {
          return (
            <AdminProductCard data={product} key={index + "allproducts"} fetchData={fetchAllProducts} />
          );
        })}
      </div>
      {/* upload product component */}
      {openUploadProduct && (
        <UploadProduct onclose={() => setOpenUploadProduct(false)} fetchData={fetchAllProducts} />
      )}
    </div>
  );
};

export default Products;
