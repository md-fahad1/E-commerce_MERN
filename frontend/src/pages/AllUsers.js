import React, { useEffect, useState } from "react";
import SummaryApi from "../Common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

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
      console.log("responseData", responseData.data);
      if (responseData.success) {
        setAllUsers(responseData.data); // Directly assign the array of users
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
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div>
      <h1>All Users</h1>
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>SN</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Application</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{moment(user.createdAt).format("lll")}</td>
              <td>
                <button
                  className="bg-green-300 p-2 rounded-md hover:bg-green-600 hover:text-white"
                  onClick={() => {
                    setUpdateUserDetails(user);
                    setOpenUpdateRole(true);
                  }}
                >
                  <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
