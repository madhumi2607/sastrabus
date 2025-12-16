import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Contact() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const driverInfo = {
    name: 'Rajesh Kumar',
    mobile: '+91 98765 43210',
    busNumber: 'BUS-001',
    vehicleId: 'TN-07-AB-1234'
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-gray-900 dark:text-white text-4xl font-bold mb-2">Contact & Support</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Bus {driverInfo.busNumber} - Driver and Transport Information</p>

        {/* Driver Information Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border-2 border-orange-200 dark:border-orange-800 relative">
          {/* Icon Badge */}
          <div className="absolute top-6 right-6 bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl">
            <Bus className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>

          <h3 className="text-gray-900 dark:text-white text-2xl font-bold mb-8">Driver Information</h3>

          <div className="grid grid-cols-2 gap-x-16 gap-y-6">
            {/* Driver Name */}
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Driver Name</p>
              <p className="text-gray-900 dark:text-white text-xl font-bold">{driverInfo.name}</p>
            </div>

            {/* Driver Mobile */}
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Driver Mobile</p>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-500" />
                <a 
                  href={`tel:${driverInfo.mobile}`}
                  className="text-orange-500 text-xl font-bold hover:text-orange-600 transition"
                >
                  {driverInfo.mobile}
                </a>
              </div>
            </div>

            {/* Bus Number */}
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Bus Number</p>
              <p className="text-gray-900 dark:text-white text-xl font-bold">{driverInfo.busNumber}</p>
            </div>

            {/* Vehicle ID */}
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Vehicle ID</p>
              <p className="text-gray-900 dark:text-white text-xl font-bold">{driverInfo.vehicleId}</p>
            </div>
          </div>
        </div>

        {/* Additional Support Information */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6">
          <h4 className="text-blue-900 dark:text-blue-300 text-lg font-bold mb-3">Need Help?</h4>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            For any issues or emergencies, please contact your bus driver directly or reach out to the transport office.
          </p>
          <div className="space-y-2 text-blue-800 dark:text-blue-200">
            <p><span className="font-semibold">Transport Office:</span> +91 98765 00000</p>
            <p><span className="font-semibold">Emergency Helpline:</span> +91 98765 11111</p>
            <p><span className="font-semibold">Email:</span> transport@sastra.edu</p>
          </div>
        </div>
      </main>
    </div>
  );
}