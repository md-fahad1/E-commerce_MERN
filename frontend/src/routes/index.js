import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import SignUp from "../pages/Auth/SignUp";
import AdminPanel from "../pages/AdminDashboard/AdminPanel";
import AllUsers from "../pages/AdminDashboard/AllUsers";
import Products from "../pages/Home/Products";
import CategoryProduct from "../pages/Home/CategoryProduct";
import ProductDetails from "../pages/Home/ProductDetails";
import Cart from "../pages/Home/Cart";
import SearchProduct from "../pages/Home/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/AdminDashboard/OrderPage";
import PaymentPage from "../pages/Home/PaymentPage";
import OAuth from "../pages/Auth/OAuth";
import Offers from "../pages/Home/Offer";
import Wishlist from "../pages/Home/Wishlist";
import UserPanel from "../pages/UserDashbaord/UserPanel";
import UserOrder from "../pages/UserDashbaord/UserOrder";
import UserWishList from "../pages/UserDashbaord/UserWishList";
import UserProfile from "../pages/UserDashbaord/UserProfile";
import AdminProfile from "../pages/AdminDashboard/AdminProfile";
import Home from "../pages/Home/Home";
import AllOrder from "../pages/AdminDashboard/AllOrder";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "offers",
        element: <Offers />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "google",
        element: <OAuth />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-user",
            element: <AllUsers />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "profile",
            element: <AdminProfile />,
          },
          {
            path: "orders",
            element: <AllOrder />,
          },
        ],
      },
      {
        path: "user-panel",
        element: <UserPanel />,
        children: [
          {
            path: "orders",
            element: <UserOrder />,
          },
           {
            path: "wishlist",
            element: <UserWishList />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
         
        ],
      },
    ],
  },
]);

export default router;

// npm i @stripe/stripe-js
