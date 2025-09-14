import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaUser, FaPhone, FaEnvelope, FaEdit, FaSave, FaBuilding } from "react-icons/fa";

const AdminProfile = () => {
  const user = useSelector((state) => state?.user?.user); // Get user from Redux

  // Local state for editing
  const [adminDetails, setAdminDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    department: user?.department || "Operations",
    role: user?.role || "Super Admin",
    profilePic: user?.profilePic || "/empty.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setAdminDetails({ ...adminDetails, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO: Call API to save changes
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Profile</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side */}
        <div className="md:w-1/3 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg">
          <img
            src={adminDetails.profilePic}
            alt={adminDetails.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-green-400 shadow-sm"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">{adminDetails.name}</h2>
          <p className="text-sm text-gray-500 mt-1">{adminDetails.role}</p>
          <p className="text-gray-500 mt-3 flex items-center gap-2">
            <FaPhone /> {adminDetails.phone}
          </p>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <FaEnvelope /> {adminDetails.email}
          </p>
        </div>

        {/* Right Side */}
        <div className="md:w-2/3 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Admin Details</h2>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
            >
              {isEditing ? <FaSave /> : <FaEdit />}
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={adminDetails.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-lg focus:outline-none ${
                  isEditing
                    ? "border-green-400 focus:ring-2 focus:ring-green-200"
                    : "bg-gray-100 border-gray-300"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={adminDetails.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-lg focus:outline-none ${
                  isEditing
                    ? "border-green-400 focus:ring-2 focus:ring-green-200"
                    : "bg-gray-100 border-gray-300"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={adminDetails.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-lg focus:outline-none ${
                  isEditing
                    ? "border-green-400 focus:ring-2 focus:ring-green-200"
                    : "bg-gray-100 border-gray-300"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Department</label>
              <input
                type="text"
                name="department"
                value={adminDetails.department}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-lg focus:outline-none ${
                  isEditing
                    ? "border-green-400 focus:ring-2 focus:ring-green-200"
                    : "bg-gray-100 border-gray-300"
                }`}
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-600 font-medium">Role</label>
              <input
                type="text"
                name="role"
                value={adminDetails.role}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-lg focus:outline-none ${
                  isEditing
                    ? "border-green-400 focus:ring-2 focus:ring-green-200"
                    : "bg-gray-100 border-gray-300"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
