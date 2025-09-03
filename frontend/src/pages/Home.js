import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VarticalCardProduct from "../components/VarticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <VarticalCardProduct category={"earphones"} heading={"Popular's Earphones"} />
      <VarticalCardProduct category={"camera"} heading={"Top's Cameras"} />
      <VarticalCardProduct category={"mobiles"} heading={"Best Sell Mobiles"} />
      <HorizontalCardProduct category={"camera"} heading={"Top's Cameras"} />
      <HorizontalCardProduct category={"airpodes"} heading={"Popular's Airpods"} />

    </div>
  )
};

export default Home;
