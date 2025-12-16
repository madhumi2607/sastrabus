import { Bus, LogOut, Moon, Sun } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/dashboard' },
    { name: 'My Bus Route', path: '/my-bus-route' },
    { name: 'Track My Bus', path: '/track' },
    { name: 'Contact', path: '/contact' },
    { name: 'Profile', path: '/profile' }
  ];

  return (
    <header className="bg-gray-900 dark:bg-gray-950 border-b border-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <div className="bg-orange-500 p-2.5 rounded-xl">
            <Bus className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">BusTrack</h1>
            <p className="text-gray-400 text-xs">SASTRA</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-6 py-2.5 rounded-lg font-medium transition ${
                isActive(item.path)
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Theme Toggle + Logout */}
        <div className="flex items-center gap-4">
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white flex items-center gap-2 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>

        </div>
      </div>
    </header>
  );
}
