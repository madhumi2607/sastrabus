import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Bus, MapPin } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
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

      <main className="pt-20 pb-12 min-h-screen bg-background dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user.name}!
            </h1>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

            {/* My Bus Card */}
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
                    My Bus
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.assignedBus}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Trichy Main Route
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <Bus className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Route Timeline */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Route Timeline
              </h2>

              <div className="space-y-3">
                {[
                  { name: "Mambalasalai", time: "07:00 AM", status: "reached" },
                  { name: "Palpannai", time: "07:15 AM", status: "reached" },
                  { name: "Thiruverumbur", time: "07:30 AM", status: "current" },
                  { name: "College Gate", time: "08:15 AM", status: "upcoming" },
                ].map((stop, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-800 last:border-0"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        stop.status === "reached"
                          ? "bg-green-500"
                          : stop.status === "current"
                          ? "bg-orange-500"
                          : "bg-gray-400 dark:bg-gray-600"
                      }`}
                    ></div>

                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {stop.name}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stop.time}
                    </p>
                  </div>
                ))}
              </div>

              <Link to="/my-bus-route">
                <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition">
                  View Full Route
                </button>
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Track Bus */}
            <Link to="/track">
              <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition cursor-pointer h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Track My Bus
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    View live GPS location of your bus
                  </p>
                </div>
              </div>
            </Link>

            {/* My Bus Route */}
            <Link to="/my-bus-route">
              <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition cursor-pointer h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                    <Bus className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    My Bus Route
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    View all stops on your route
                  </p>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </main>
    </div>
  );
}
