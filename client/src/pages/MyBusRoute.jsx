import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function MyBusRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    }
  }, [navigate]);

  const busInfo = {
    id: 'BUS-001',
    startTime: '07:00 AM',
    expectedArrival: '08:15 AM'
  };

  const routeStops = [
    { name: 'Mambalasalai', time: '07:00 AM', status: 'completed' },
    { name: 'Palpannai', time: '07:15 AM', status: 'completed' },
    { name: 'Thiruverumbur', time: '07:30 AM', status: 'current' },
    { name: 'College Gate', time: '08:15 AM', status: 'upcoming' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-gray-900 dark:text-white text-4xl font-bold mb-2">My Bus Route</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Bus {busInfo.id} - Route Timeline</p>

        {/* Bus Info Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800 mb-8">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Bus ID</p>
              <p className="text-gray-900 dark:text-white text-2xl font-bold">{busInfo.id}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Start Time</p>
              <p className="text-gray-900 dark:text-white text-2xl font-bold">{busInfo.startTime}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Expected Arrival</p>
              <p className="text-gray-900 dark:text-white text-2xl font-bold">{busInfo.expectedArrival}</p>
            </div>
          </div>
        </div>

        {/* Route Timeline */}
        <div className="space-y-0">
          {routeStops.map((stop, index) => (
            <div key={index} className="relative">
              
              {/* Connector Line */}
              {index < routeStops.length - 1 && (
                <div
                  className={`absolute left-[20px] top-[70px] w-0.5 h-[72px] ${
                    stop.status === 'completed'
                      ? 'bg-green-300 dark:bg-green-600'
                      : stop.status === 'current'
                      ? 'bg-gray-300 dark:bg-gray-700'
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                ></div>
              )}

              {/* Stop Card */}
              <div
                className={`relative rounded-2xl p-6 flex items-center justify-between mb-4 ${
                  stop.status === 'completed'
                    ? 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800'
                    : stop.status === 'current'
                    ? 'bg-orange-50 dark:bg-orange-950/30 border-2 border-orange-500'
                    : 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800'
                }`}
              >
                {/* Icon */}
                <div className="absolute -left-[52px] top-6">
                  {stop.status === 'completed' ? (
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                  ) : stop.status === 'current' ? (
                    <div className="w-10 h-10 rounded-full border-4 border-orange-400 bg-white dark:bg-gray-900"></div>
                  ) : (
                    <div className="w-10 h-10 rounded-full border-4 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"></div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-1">
                    {stop.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {stop.status === 'completed'
                      ? 'Reached'
                      : stop.status === 'current'
                      ? 'Current Stop'
                      : 'Upcoming'}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-gray-900 dark:text-white text-xl font-bold">{stop.time}</p>
                  {stop.status === 'current' && (
                    <span className="text-orange-500 text-sm font-semibold">Now</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
