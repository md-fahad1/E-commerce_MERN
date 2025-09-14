import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import ROLE from "../../Common/role";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "./Dashboard";

const AdminPanel = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (user && user.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden max-w-full">
      <div className="w-1/6">
          <Sidebar />
      </div>
      <div className="flex-1 flex flex-col w-5/6">
        <Header />
       <main className="w-full h-full p-4 bg-gray-50">
  {window.location.pathname === "/admin-panel" && <Dashboard />}
  <Outlet />
</main>
      </div>
    </div>
  );
};

export default AdminPanel;
