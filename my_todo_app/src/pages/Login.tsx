import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { LogIn, User } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/login', { email, password });
      const { accessToken } = response.data;
      
      // Get user profile if needed, or if login returns it
      // Let's assume login returns it for simplicity, or we do another call
      // For now, let's just use what we have or mock it since we need profile data
      const userData = { email, id: '1', name: 'User', firstname: '' }; // Mock for now or fetch
      
      login(accessToken, userData);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md text-white">
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 p-4 rounded-2xl">
            <LogIn size={40} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
        {error && <div className="bg-red-500/50 border border-red-500 p-3 rounded-xl mb-6 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 opacity-80">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all font-mono"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 opacity-80">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all font-mono"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-purple-600 font-bold py-3 rounded-xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center mt-8 opacity-80">
          Don't have an account? <Link to="/register" className="font-bold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
