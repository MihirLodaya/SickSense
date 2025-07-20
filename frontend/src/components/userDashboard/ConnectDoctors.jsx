import React from "react";
import defaultProfilePic from "../../assets/default-profile.jpg"; // Add a default profile image to your assets

const doctors = [
  { id: 1, name: "Dr. Mehta", specialty: "Coronary Artery Disease" },
  { id: 2, name: "Dr. Iyer", specialty: "Ischemic Stroke" },
  { id: 3, name: "Dr. Nair", specialty: "Type 1 Diabetes" },
  { id: 4, name: "Dr. Chatterjee", specialty: "Type 2 Diabetes" },
  { id: 5, name: "Dr. Reddy", specialty: "Pulmonary Fibrosis" },
  { id: 6, name: "Dr. Desai", specialty: "Asthma" },
  { id: 7, name: "Dr. Singh", specialty: "Breast Cancer" },
  { id: 8, name: "Dr. Bhattacharya", specialty: "Lung Cancer" },
  { id: 9, name: "Dr. Patil", specialty: "Parkinson's Disease" },
];

const ConnectDoctors = () => {
  return (
    <div className="flex-grow ml-64 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-[#00b894] mb-8">
        Connect with Doctors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="p-6 bg-[#eaf9f4] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 flex items-center"
          >
            {/* Profile Picture */}
            <img
              src={defaultProfilePic}
              alt={`${doctor.name}'s Profile`}
              className="w-16 h-16 rounded-full mr-4 border-2 border-[#059f7d]"
            />
            {/* Doctor Details */}
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-[#00594f]">
                {doctor.name}
              </h3>
              <p className="text-gray-600">Specialization: {doctor.specialty}</p>
            </div>
            {/* Contact Button */}
            <button className="bg-[#00b894] text-white px-4 py-2 rounded-lg hover:bg-[#059f7d] transition">
              Contact
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectDoctors;