import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DashboardContent = () => {
  // Chart Data
  const [calorieData, setCalorieData] = useState([
    { name: "Breakfast", value: 500 },
    { name: "Lunch", value: 700 },
    { name: "Dinner", value: 600 },
    { name: "Snacks", value: 300 },
  ]);

  const [stepsData, setStepsData] = useState([
    { name: "Monday", steps: 5000 },
    { name: "Tuesday", steps: 8000 },
    { name: "Wednesday", steps: 7500 },
    { name: "Thursday", steps: 6000 },
    { name: "Friday", steps: 9000 },
  ]);

  const [sleepData, setSleepData] = useState([
    { name: "Monday", hours: 7 },
    { name: "Tuesday", hours: 6 },
    { name: "Wednesday", hours: 8 },
    { name: "Thursday", hours: 7.5 },
    { name: "Friday", hours: 6.5 },
  ]);

  const [waterIntakeData, setWaterIntakeData] = useState([
    { name: "Monday", liters: 2 },
    { name: "Tuesday", liters: 1.8 },
    { name: "Wednesday", liters: 2.2 },
    { name: "Thursday", liters: 2 },
    { name: "Friday", liters: 1.5 },
  ]);

  // Remedies Data
  const remedies = [
    { name: "Flu", remedy: "Drink plenty of fluids and rest." },
    { name: "Asthma", remedy: "Use prescribed inhalers and avoid triggers." },
    { name: "Diabetes Mellitus Type 1", remedy: "Manage blood sugar with insulin and a healthy diet." },
    { name: "Hypertension", remedy: "Reduce salt intake and exercise regularly." },
    { name: "Alzheimer's Disease", remedy: "Maintain a healthy diet and stay mentally active." },
    { name: "Breast Carcinoma", remedy: "Seek treatment from an oncologist and maintain a healthy lifestyle." },
    { name: "Coronary Artery Disease", remedy: "Maintain a heart-healthy diet and exercise." },
    { name: "Ischemic Stroke", remedy: "Take prescribed medication and follow physical therapy." },
  ];

  return (
    <div className="ml-64 p-8">
      {/* Health Charts Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-[#00b894] mb-6">Health Metrics Dashboard</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calories Chart */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Calories Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={calorieData} dataKey="value" cx="50%" cy="50%" outerRadius={100}>
                  {calorieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Steps Chart */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Steps Walked</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stepsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="steps" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Remedies Section */}
      <div>
        <h2 className="text-3xl font-bold text-[#00b894] mb-6">Home Remedies</h2>
        <div className="grid grid-cols-1 gap-4">
          {remedies.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">{item.remedy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
