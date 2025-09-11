import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./Common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation(); // get current path
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      const dataApi = await response.json();
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      } else {
        console.error("Error fetching user details:", dataApi.message);
      }
    } catch (error) {
      console.error("Fetch User Details Error:", error);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const response = await fetch(SummaryApi.addTocartProductCount.url, {
        method: SummaryApi.addTocartProductCount.method,
        credentials: "include",
      });

      const dataApi = await response.json();
      if (dataApi.success) {
        setCartProductCount(dataApi?.data?.count);
      } else {
        console.error("Error fetching cart product count:", dataApi.message);
      }
    } catch (error) {
      console.error("Fetch Cart Product Count Error:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  // check if path includes admin panel
  const isAdminRoute = location.pathname.startsWith("/admin-panel");
  const isUserRoute = location.pathname.startsWith("/user-panel");

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />
        {!isAdminRoute && !isUserRoute && <Header />}
       <main
  className={`min-h-[calc(100vh-120px)] ${
    isAdminRoute ? "pt-0" : isUserRoute ? "pt-16" : "pt-16"
  }`}
>
  <Outlet />
</main>

        {!isAdminRoute && <Footer />}
      </Context.Provider>
    </>
  );
}

export default App;
