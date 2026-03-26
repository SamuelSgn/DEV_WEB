import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Mail, Lock, User, ArrowRight, Loader2, PlusCircle, LayoutDashboard, PlusSquare, LogOut, ClipboardList, FileText } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    firstname: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const endpoint = isLogin ? '/login' : '/register';
      const response = await api.post(endpoint, formData);
      const { accessToken, user } = response.data;
      
      const userData = user || { 
        email: formData.email, 
        id: 'temp', 
        name: formData.name || 'User', 
        firstname: formData.firstname || '' 
      };
      
      login(accessToken, userData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden bg-slate-950 pt-32 pb-24">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-600/20 blur-[100px] rounded-full" />

      <div className="max-w-2xl w-full grid md:grid-cols-2 glass-card overflow-hidden animate-fade-in">
        {/* Left Side: Info */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-indigo-600/10 border-r border-white/5">
          <h1 className="text-4xl font-bold mb-6 text-white leading-tight">
            {isLogin ? 'Bon retour parmi nous !' : 'Rejoignez l\'aventure SkyFlow'}
          </h1>
          <p className="text-indigo-200/60 leading-relaxed mb-8">
            {isLogin 
              ? 'Connectez-vous pour accéder à vos tâches et synchroniser vos appareils.' 
              : 'Créez un compte gratuitement et commencez à organiser votre vie dès aujourd\'hui.'}
          </p>
          <ul className="space-y-4">
            {['Interface Glassmorphique', 'Synchronisation Cloud', 'Mode Sombre Natif'].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-indigo-100/80">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                   <ArrowRight size={12} className="text-indigo-400" />
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">
              {isLogin ? 'Connexion' : 'Inscription'}
            </h2>
            <div className="bg-indigo-600/20 p-2.5 rounded-2xl">
              {isLogin ? <LogIn className="text-indigo-400" /> : <UserPlus className="text-indigo-400" />}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-4 rounded-xl text-sm mb-6 animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <InputGroup 
                  label="Prénom" 
                  type="text" 
                  placeholder="Jean" 
                  value={formData.firstname}
                  onChange={v => setFormData({...formData, firstname: v})}
                  icon={<User size={18} />}
                />
                <InputGroup 
                  label="Nom" 
                  type="text" 
                  placeholder="Dupont" 
                  value={formData.name}
                  onChange={v => setFormData({...formData, name: v})}
                  icon={<User size={18} />}
                />
              </div>
            )}
            <InputGroup 
              label="Email" 
              type="email" 
              placeholder="votre@email.com" 
              value={formData.email}
              onChange={v => setFormData({...formData, email: v})}
              icon={<Mail size={18} />}
            />
            <InputGroup 
              label="Mot de passe" 
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={v => setFormData({...formData, password: v})}
              icon={<Lock size={18} />}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-600/30 active:scale-95 flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Se connecter' : 'Créer un compte'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-white/50 text-sm">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"} 
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, type, placeholder, value, onChange, icon }: { label: string, type: string, placeholder?: string, value: string, onChange: (v: string) => void, icon?: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-indigo-400 transition-colors">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full glass-input rounded-2xl pl-12 pr-4 py-3.5 outline-none text-white text-sm"
        required
      />
    </div>
  </div>
);

export default Auth;
