import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit, FaSave, FaCamera } from "react-icons/fa";

const AdminProfile = () => {
  const user = useSelector((state) => state?.user?.user);

  const [adminDetails, setAdminDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    department: user?.department || "Operations",
    role: user?.role || "Super Admin",
    profilePic: user?.profilePic || "/empty.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(adminDetails.profilePic);
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setAdminDetails({ ...adminDetails, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle save
  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", adminDetails.name);
      formData.append("email", adminDetails.email);
      formData.append("phone", adminDetails.phone);
      formData.append("address", adminDetails.address);
      if (selectedFile) formData.append("profilePic", selectedFile);

      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      setAdminDetails(data.data);
      setPreviewImage(data.data.profilePic);
      setSelectedFile(null);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Profile</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side */}
        <div className="md:w-1/3 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg">
          <div className="relative">
            <img
              src={previewImage}
              alt={adminDetails.name}
              className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700">
                <FaCamera />
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">{adminDetails.name}</h2>
          <p className="text-gray-500 mt-1">{adminDetails.email}</p>
        </div>

        {/* Right Side */}
        <div className="md:w-2/3 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Account Details</h2>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
              disabled={loading}
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
                  isEditing ? "border-indigo-400 focus:ring-2 focus:ring-indigo-200" : "bg-gray-100 border-gray-300"
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
                  isEditing ? "border-indigo-400 focus:ring-2 focus:ring-indigo-200" : "bg-gray-100 border-gray-300"
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
                  isEditing ? "border-indigo-400 focus:ring-2 focus:ring-indigo-200" : "bg-gray-100 border-gray-300"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Role</label>
              <input
                type="text"
                name="role"
                value={adminDetails.role}
                disabled={true}
                className={`mt-1 p-2 border rounded-lg focus:outline-none ${
                  isEditing ? "border-indigo-400 focus:ring-2 focus:ring-indigo-200" : "bg-gray-100 border-gray-300"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={adminDetails.address}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-lg focus:outline-none ${
                  isEditing ? "border-indigo-400 focus:ring-2 focus:ring-indigo-200" : "bg-gray-100 border-gray-300"
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
