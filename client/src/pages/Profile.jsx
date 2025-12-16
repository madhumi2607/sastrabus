import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";

import {
  User,
  BookOpen,
  Building2,
  GraduationCap,
  Bus,
  MapPin,
  Sun,
  Moon,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) navigate("/login");
    else setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950">
      <Navbar />

      <main className="pt-20 pb-12 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header + Theme Toggle */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome, {user.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Your Profile Information
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition flex items-center"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>

          {/* Profile Card */}
          <div className="p-8 mb-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow">
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-orange-500" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h2>

              <p className="text-gray-500 dark:text-gray-400">
                {user.registerNumber}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-6">

              {/* Name */}
              <ProfileItem
                iconBg="bg-blue-100 dark:bg-blue-900/20"
                icon={<User className="w-5 h-5 text-blue-600" />}
                label="Full Name"
                value={user.name}
              />

              {/* Register Number */}
              <ProfileItem
                iconBg="bg-purple-100 dark:bg-purple-900/20"
                icon={<BookOpen className="w-5 h-5 text-purple-600" />}
                label="Register Number"
                value={user.registerNumber}
              />

              {/* Department */}
              <ProfileItem
                iconBg="bg-green-100 dark:bg-green-900/20"
                icon={<Building2 className="w-5 h-5 text-green-600" />}
                label="Department"
                value={user.department}
              />

              {/* Year */}
              <ProfileItem
                iconBg="bg-yellow-100 dark:bg-yellow-900/20"
                icon={<GraduationCap className="w-5 h-5 text-yellow-600" />}
                label="Year"
                value={user.year}
              />

              {/* Bus */}
              <ProfileItem
                iconBg="bg-orange-100 dark:bg-orange-900/20"
                icon={<Bus className="w-5 h-5 text-orange-500" />}
                label="Assigned Bus ID"
                value={user.assignedBus}
              />

              {/* Pickup Point */}
              <ProfileItem
                iconBg="bg-red-100 dark:bg-red-900/20"
                icon={<MapPin className="w-5 h-5 text-red-600" />}
                label="Pickup Point"
                value={user.pickupPoint}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* Reusable Profile Row Component */
function ProfileItem({ iconBg, icon, label, value }) {
  return (
    <div className="flex items-start gap-4 pb-6 border-b border-gray-200 dark:border-gray-800 last:border-0">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{label}</p>
        <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
