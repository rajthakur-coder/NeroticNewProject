// src/App.tsx
import React, { useState } from "react";
import { ChartBarIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Toggle from "../components/Common/ToggleButton";
import { Button } from "../components/Common/Button";
import { ArrowRight, Plus, Star, Trash2 } from "lucide-react";

const statsData = [
  { title: "Total active users", value: "18,765", change: "+2.6%", iconColor: "text-green-500", trendIcon: <ArrowUpIcon className="inline-block w-5 h-5" /> },
  { title: "Total installed", value: "4,876", change: "+0.2%", iconColor: "text-blue-500", trendIcon: <ArrowUpIcon className="inline-block w-5 h-5" /> },
  { title: "Total downloads", value: "678", change: "-0.1%", iconColor: "text-red-500", trendIcon: <ArrowDownIcon className="inline-block w-5 h-5" /> },
];

const downloadData = [
  { name: "Mac", value: 20000, color: "#d1fae5" },
  { name: "Window", value: 45000, color: "#34d399" },
  { name: "iOS", value: 55000, color: "#047857" },
  { name: "Android", value: 68345, color: "#064e3b" },
];

const App: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="min-h-screen p-2 space-y-6 bg-gray-50 dark:bg-[#1F2937] rounded-xl">
      {/* Toggle Button */}
      <div className="flex items-center justify-center mb-4">
        <Toggle isOn={isToggled} onToggle={() => setIsToggled(!isToggled)} />
        <span className="ml-3">{isToggled ? "On" : "Off"}</span>
      </div>

      {/* Welcome & Featured */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col justify-between p-6 text-white shadow-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl hover:shadow-3xl">
          <div>
            <h2 className="mb-1 text-xl font-bold">Welcome back <span className="wave">👋</span></h2>
            <h3 className="mb-2 text-3xl font-extrabold">Jaydon Frankie</h3>
            <p className="mb-4 text-gray-300">
              If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything.
            </p>
            <button className="px-5 py-2 font-semibold text-white rounded-lg shadow bg-primary">Go now</button>
          </div>
        </div>

        <div className="relative p-6 text-white bg-black shadow-xl rounded-2xl hover:shadow-2xl">
          <div className="mb-2 text-sm font-semibold text-green-400">FEATURED APP</div>
          <h3 className="mb-2 text-xl font-bold">Mental Health in the Di...</h3>
          <p className="text-sm text-gray-300">He carefully crafted a beautiful sc...</p>
          <div className="absolute flex space-x-2 text-lg bottom-4 right-4">
            <button className="hover:text-green-400">&larr;</button>
            <button className="hover:text-green-400">&rarr;</button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {statsData.map((stat, idx) => (
          <div key={idx} className="flex flex-col p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl hover:shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-gray-500 dark:text-gray-400">{stat.title}</div>
              <ChartBarIcon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <div className="mb-2 text-2xl font-bold">{stat.value}</div>
            <div className={`flex items-center ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
              {stat.trendIcon}
              <span className="ml-1 text-sm">{stat.change} last 7 days</span>
            </div>
          </div>
        ))}
      </div>


<div className="flex flex-col gap-4 p-6">
  <Button text="Default" />
  <Button text="With Icon Left" icon={Star} />
  {/* <Button text="With Icon Right" icon={ArrowRight} iconPosition="right" />
  <Button text="Wide" width="200px" />
  <Button text="Tall" height="60px" />
  <Button text="Big" width="200px" height="60px" />
  <Button text="Small" size="sm" width="100px" /> */}
</div>

      {/* Donut Chart */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl hover:shadow-2xl">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">Current download</h3>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Downloaded by operating system</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={downloadData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} dataKey="value">
                {downloadData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 text-xl font-bold text-center text-gray-900 dark:text-gray-100">Total 188,245</div>
          <div className="flex justify-center mt-4 space-x-4 text-sm">
            {downloadData.map((d, i) => (
              <div key={i} className="flex items-center space-x-1">
                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></span>
                <span className="text-gray-700 dark:text-gray-200">{d.name}</span>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default App;
