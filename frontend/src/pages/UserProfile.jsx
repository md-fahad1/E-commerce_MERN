import React, { useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaEdit, FaSave } from "react-icons/fa";

const UserProfile = () => {
  // Dummy user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, City, Country",
    dob: "1990-05-15",
    profilePic: "https://images.unsplash.com/photo-1603415526960-f5f2c9b7f99c?w=200",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save logic here (API call)
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side */}
        <div className="md:w-1/3 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg">
          <img
            src={user.profilePic}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <FaPhone /> {user.phone}
          </p>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <FaEnvelope /> {user.email}
          </p>
        </div>

        {/* Right Side */}
        <div className="md:w-2/3 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Account Details</h2>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
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
                value={user.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-lg focus:outline-none ${
                  isEditing
                    ? "border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    : "bg-gray-100 border-gray-300"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-lg focus:outline-none ${
                  isEditing
                    ? "border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    : "bg-gray-100 border-gray-300"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-lg focus:outline-none ${
                  isEditing
                    ? "border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    : "bg-gray-100 border-gray-300"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={user.dob}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-lg focus:outline-none ${
                  isEditing
                    ? "border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    : "bg-gray-100 border-gray-300"
                }`}
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-600 font-medium">Address</label>
              <textarea
                name="address"
                value={user.address}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-lg focus:outline-none ${
                  isEditing
                    ? "border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    : "bg-gray-100 border-gray-300"
                }`}
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
