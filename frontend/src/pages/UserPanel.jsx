import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import ROLE from "../Common/role";


import UserDashboard from "./UserDashboard";
import UserSidebar from "./UserSidebar";
import UserHeader from "./UserHeader";

const UserPanel = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (user && user.role !== ROLE.GENERAL) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden max-w-full">
      <div className="w-1/6">
          <UserSidebar />
      </div>
      <div className="flex-1 flex flex-col w-5/6">
        <UserHeader />
       <main className="w-full h-full p-4 bg-gray-50">
  {window.location.pathname === "/user-panel" && <UserDashboard />}
  <Outlet />
</main>
      </div>
    </div>
  );
};

export default UserPanel;
