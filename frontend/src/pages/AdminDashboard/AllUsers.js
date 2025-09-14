import React, { useEffect, useState } from "react";
import SummaryApi from "../../Common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import ChangeUserRole from "../../components/ChangeUserRole";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: "include",
      });
      const responseData = await fetchData.json();
      if (responseData.success) {
        setAllUsers(responseData.data);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
      toast.error("Error fetching all users. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold text-gray-800 mb-1">All Users</h1>

      <div className="overflow-x-auto shadow-lg rounded-md bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#16a085] text-white">
            <tr>
              <th className="px-6 py-1 text-left text-sm font-semibold uppercase">SN</th>
              <th className="px-6 py-1 text-left text-sm font-semibold uppercase">Name</th>
              <th className="px-6 py-1 text-left text-sm font-semibold uppercase">Email</th>
              <th className="px-6 py-1 text-left text-sm font-semibold uppercase">Role</th>
              <th className="px-6 py-1 text-left text-sm font-semibold uppercase">Created Date</th>
              <th className="px-6 py-1 text-left text-sm font-semibold uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allUsers.map((user, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-green-50 transition duration-150`}
              >
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-800 font-medium">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-purple-500"
                        : user.role === "USER"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {moment(user.createdAt).format("lll")}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    className="bg-green-100 p-2 rounded-md hover:bg-[#192A56] hover:text-white transition duration-200"
                    onClick={() => {
                      setUpdateUserDetails(user);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <CiEdit size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunction={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
