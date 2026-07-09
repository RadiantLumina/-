import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, LogIn, LogOut, Home, Settings, Activity, PieChart, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, openLogin, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/admin', label: '配置中心', icon: Settings, show: isAuthenticated && isDashboard },
    { to: '/dashboard', label: '数据大盘', icon: LayoutDashboard, show: isAuthenticated && isDashboard },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || isDashboard
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1700px] mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <BarChart3 size={16} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-slate-800 group-hover:text-primary-600 transition-colors">
            DataViz
          </span>
        </Link>

        {/* Dashboard nav links */}
        {isDashboard && (
          <div className="hidden md:flex items-center gap-1">
            {navLinks.filter(l => l.show).map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                    active
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">退出登录</span>
            </button>
          ) : (
            <button
              onClick={openLogin}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-xl transition-all active:scale-95 shadow-lg shadow-primary-500/20"
            >
              <LogIn size={16} />
              登录后台
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
