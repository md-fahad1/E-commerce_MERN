import React from "react";
import Sidebar from "./Sidebar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaShoppingCart, FaUserPlus, FaChartLine, FaUsers } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Stats Cards
  const stats = [
    {
      title: "New Orders",
      value: 128,
      icon: <FaShoppingCart className="text-purple-500 w-6 h-6" />,
      color: "bg-purple-100",
      textColor: "text-purple-700",
    },
    {
      title: "New Users",
      value: 52,
      icon: <FaUserPlus className="text-green-500 w-6 h-6" />,
      color: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      title: "Bounce Rate",
      value: "40%",
      icon: <FaChartLine className="text-yellow-500 w-6 h-6" />,
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
    },
    {
      title: "Unique Visitors",
      value: 165,
      icon: <FaUsers className="text-blue-500 w-6 h-6" />,
      color: "bg-blue-100",
      textColor: "text-blue-700",
    },
  ];

  // Visitors and Sales data
  const visitorsData = [
    { month: "Jan", visitors: 50000, sales: 40000 },
    { month: "Feb", visitors: 60000, sales: 50000 },
    { month: "Mar", visitors: 80000, sales: 60000 },
    { month: "Apr", visitors: 45000, sales: 40000 },
    { month: "May", visitors: 50000, sales: 42000 },
    { month: "Jun", visitors: 60000, sales: 55000 },
    { month: "Jul", visitors: 65000, sales: 60000 },
    { month: "Aug", visitors: 70000, sales: 62000 },
  ];

  // New Customers
  const newCustomers = [
    { name: "Lucas Toledo", username: "@lukedo20" },
    { name: "Matthew Shander", username: "@mattchander" },
    { name: "Caroline Ripper", username: "@carolinechill" },
    { name: "John Rodriguez", username: "@johnrodriguez" },
  ];

  // Chart.js data
  const chartData = {
    labels: visitorsData.map((d) => d.month),
    datasets: [
      {
        label: "Visitors",
        data: visitorsData.map((d) => d.visitors),
        borderColor: "#8B5CF6", // purple
        backgroundColor: "rgba(139,92,246,0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Sales",
        data: visitorsData.map((d) => d.sales),
        borderColor: "#3B82F6", // blue
        backgroundColor: "rgba(59,130,246,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Visitors & Sales Trend", font: { size: 18 } },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-6 ">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`flex flex-col justify-between p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ${stat.color}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-lg font-semibold ${stat.textColor}`}>{stat.title}</span>
                {stat.icon}
              </div>
              <span className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</span>
              <button className={`mt-4 text-sm font-medium ${stat.textColor} hover:underline`}>
                View Details →
              </button>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 h-96">
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Widgets Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* New Customers */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-5">New Customers</h2>
            <div className="space-y-4">
              {newCustomers.map((c) => (
                <div
                  key={c.username}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-sm text-gray-500">{c.username}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-5 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition">
              View All
            </button>
          </div>

          {/* Store Visit */}
          <div className="bg-white p-6 rounded-2xl shadow-lg lg:col-span-2">
            <h2 className="text-xl font-semibold mb-5">Store Visits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-xl text-center hover:bg-green-100 transition">
                <p className="text-gray-500">America</p>
                <p className="text-3xl font-bold mt-2">628</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl text-center hover:bg-blue-100 transition">
                <p className="text-gray-500">Europe</p>
                <p className="text-3xl font-bold mt-2">462</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
