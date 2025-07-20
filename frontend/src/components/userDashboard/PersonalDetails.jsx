import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";

axios.defaults.baseURL = "http://localhost:5000";

const PersonalDetails = () => {
  const { currentUser } = useAuth();

  const [userInfo, setUserInfo] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    allergies: "",
    illness: "",
    medication: "",
  });

  const [isEditing, setIsEditing] = useState(true);

  // Fetch user details based on email
  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(`/profile/${email}`);
      if (response.data.success) {
        const user = response.data.data;

        const updatedUserInfo = {
          name: user.name || "",
          mobile: user.mobile || "",
          email: user.email || "",
          city: user.city || "",
          age: user.age || "",
          weight: user.weight || "",
          height: user.height || "",
          gender: user.gender || "",
          allergies: user.allergies || "",
          illness: user.illness || "",
          medication: user.medication || "",
        };

        setUserInfo(updatedUserInfo);
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error fetching user details: ", error);
    }
  };

  // Save or update details in the database
  const handleSave = async () => {
    try {
      await axios.post("/profile", userInfo);
      alert("Details saved successfully!");

      setUserInfo((prevState) => ({
        ...prevState,
        ...userInfo, // Ensure all fields are updated
      }));

      localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Save to localStorage
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving details: ", error);
      alert("Failed to save details. Please try again.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Load data on component mount
  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInfo");

    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
      setIsEditing(false);
    } else if (currentUser?.email) {
      fetchUserDetails(currentUser.email); // Fetch from backend
    }
  }, [currentUser]);

  return (
    <div
      className="flex-grow ml-64 p-6 bg-gray-100 min-h-screen"
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold text-[#00b894] mb-6">
        Personal Details
      </h2>
      <div className="flex-grow">
        {isEditing ? (
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#00b894] font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b894]"
                />
              </div>
              <div>
                <label className="block text-[#00b894] font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={userInfo.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b894]"
                />
              </div>
              <div>
                <label className="block text-[#00b894] font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b894]"
                />
              </div>
              <div>
                <label className="block text-[#00b894] font-semibold">Age</label>
                <input
                  type="number"
                  name="age"
                  value={userInfo.age}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b894]"
                />
              </div>
              <div>
                <label className="block text-[#00b894] font-semibold">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={userInfo.weight}
                  onChange={handleInputChange}
                  placeholder="Enter your weight in kg"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b894]"
                />
              </div>
              <div>
                <label className="block text-[#00b894] font-semibold">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={userInfo.height}
                  onChange={handleInputChange}
                  placeholder="Enter your height in cm"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b894]"
                />
              </div>
              <div>
                <label className="block text-[#00b894] font-semibold">City</label>
                <input
                  type="text"
                  name="city"
                  value={userInfo.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b894]"
                />
              </div>
              <div>
                <label className="block text-[#00b894] font-semibold">
                  Gender (M/F)
                </label>
                <input
                  type="text"
                  name="gender"
                  value={userInfo.gender}
                  onChange={handleInputChange}
                  placeholder="Enter your gender (M/F)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b894]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#00b894] font-semibold">
                Allergies
              </label>
              <input
                type="text"
                name="allergies"
                value={userInfo.allergies}
                onChange={handleInputChange}
                placeholder="List any allergies (if any)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b894]"
              />
            </div>
            <div>
              <label className="block text-[#00b894] font-semibold">
                Past Illnesses
              </label>
              <textarea
                name="illness"
                value={userInfo.illness}
                onChange={handleInputChange}
                placeholder="Mention any past illnesses"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b894]"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label className="block text-[#00b894] font-semibold">
                Current Medication
              </label>
              <textarea
                name="medication"
                value={userInfo.medication}
                onChange={handleInputChange}
                placeholder="Mention any ongoing medication"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b894]"
                rows="3"
              ></textarea>
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-[#00b894] text-white py-3 rounded-lg hover:bg-[#059f7d] transition"
            >
              Save
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#00b894]">Your Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><strong>Name:</strong> {userInfo.name}</div>
              <div><strong>Email:</strong> {userInfo.email}</div>
              <div><strong>Phone Number:</strong> {userInfo.mobile}</div>
              <div><strong>City:</strong> {userInfo.city}</div>
              <div><strong>Age:</strong> {userInfo.age}</div>
              <div><strong>Weight:</strong> {userInfo.weight} kg</div>
              <div><strong>Height:</strong> {userInfo.height} cm</div>
              <div><strong>Gender:</strong> {userInfo.gender}</div>
              <div><strong>Allergies:</strong> {userInfo.allergies || "None"}</div>
              <div><strong>Past Illnesses:</strong> {userInfo.illness || "None"}</div>
              <div><strong>Current Medication:</strong> {userInfo.medication || "None"}</div>
            </div>
            <button
              className="mt-4 bg-[#00b894] text-white py-2 px-4 rounded hover:bg-[#059f7d] transition"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDetails;
