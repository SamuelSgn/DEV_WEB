import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Info, Mail, LogIn, LayoutDashboard, LogOut, Code2 } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="glass px-6 py-4 rounded-3xl flex items-center justify-between transition-all duration-300 hover:border-white/20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-indigo-600/20 p-2 rounded-xl border border-indigo-500/20 group-hover:bg-indigo-600/30 transition-all">
            <Code2 size={24} className="text-indigo-400" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white/90">
             Sky<span className="text-indigo-400">Flow</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" icon={<Home size={18} />} label="Accueil" active={isActive('/')} />
          <NavLink to="/about" icon={<Info size={18} />} label="À propos" active={isActive('/about')} />
          <NavLink to="/contact" icon={<Mail size={18} />} label="Contact" active={isActive('/contact')} />
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-indigo-400 transition-colors">
                 <LayoutDashboard size={18} />
                 <span>Mon Dashboard</span>
              </Link>
              <button 
                onClick={logout}
                className="bg-white/5 hover:bg-red-500/20 border border-white/5 hover:border-red-500/20 p-2 rounded-xl text-red-400 transition-all"
                title="Déconnexion"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/20 border border-indigo-500/30 active:scale-95 flex items-center gap-2"
            >
              <LogIn size={18} /> 
              <span>Connexion</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2 text-sm font-medium transition-all relative py-2 ${
      active ? 'text-white' : 'text-white/60 hover:text-white'
    }`}
  >
    {icon}
    <span>{label}</span>
    {active && (
      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-right from-indigo-500 to-indigo-400 rounded-full animate-fade-in" />
    )}
  </Link>
);

export default Navbar;
