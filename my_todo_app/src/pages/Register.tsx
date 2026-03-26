import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { UserPlus } from 'lucide-react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/register', { email, password, name, firstname });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md text-white">
        <div className="flex justify-center mb-6 text-white/80">
          <div className="bg-white/20 p-4 rounded-2xl">
            <UserPlus size={40} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">Join the journey</h1>
        {error && <div className="bg-red-500/50 border border-red-500 p-3 rounded-xl mb-6 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 opacity-80">First Name</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 opacity-80">Last Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all font-mono"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 opacity-80">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all font-mono"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 opacity-80">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all font-mono"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-purple-600 font-bold py-3 mt-4 rounded-xl hover:bg-opacity-90 transition-all"
          >
            Create Account
          </button>
        </form>
        <p className="text-center mt-6 opacity-80">
          Already have an account? <Link to="/login" className="font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
