import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus } from 'lucide-react';
import { mockLogin } from '../services/api';

export default function Login() {
  const [registerNumber, setRegisterNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await mockLogin(registerNumber, password);
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 via-gray-500 to-gray-600 relative overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 border-2 border-white rounded-full"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-3 rounded-xl">
            <Bus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold">BusTrack</h1>
            <p className="text-gray-300 text-sm">SASTRA University</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-between px-16 py-12 max-w-7xl mx-auto">
        
        {/* Left Section */}
        <div className="flex-1 max-w-2xl">
          <h2 className="text-white text-6xl font-bold leading-tight mb-4">
            Track Your College<br />Bus
          </h2>
          <h3 className="text-orange-500 text-6xl font-bold mb-8">
            Anytime, Anywhere
          </h3>
          <p className="text-gray-200 text-lg mb-12 max-w-xl leading-relaxed">
            Login to view your assigned bus, route, live location updates, and 
            stay connected with real-time GPS tracking.
          </p>
        </div>

        {/* Right Section - Login Form */}
        <div className="bg-black/90 backdrop-blur-sm rounded-3xl p-10 w-full max-w-md">
          <h3 className="text-white text-3xl font-bold mb-2">Student Login</h3>
          <p className="text-gray-400 mb-8">Access your bus tracking dashboard</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">
                Register Number
              </label>
              <input
                type="text"
                placeholder="e.g., 123"
                value={registerNumber}
                onChange={(e) => setRegisterNumber(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            <div>
              <label className="text-white text-sm font-semibold mb-2 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg text-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </div>

          <p className="text-gray-500 text-center mt-8 text-sm">
            Demo Credentials: 123 / 123
          </p>
        </div>
      </div>
    </div>
  );
}
