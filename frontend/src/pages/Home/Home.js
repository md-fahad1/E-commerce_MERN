import React from "react";

import HorizontalCardProduct from "../../components/LandingPage/HorizontalCardProduct";
import VarticalCardProduct from "../../components/LandingPage/VarticalCardProduct";
import BannerProduct from "../../components/LandingPage/BannerProduct";
import CategoryList from "../../components/LandingPage/CategoryList";

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
