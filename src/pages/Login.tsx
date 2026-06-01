import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { CLIENT_GALLERIES, MASTER_CLIENT_CODE } from '../config/clients';
import { getLocalSiteConfig, loadSiteConfig } from '../utils/siteConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(true);
  const [liveMasterCode, setLiveMasterCode] = useState(MASTER_CLIENT_CODE);
  const [liveClients, setLiveClients] = useState(CLIENT_GALLERIES);
  const navigate = useNavigate();

  useEffect(() => {
    loadSiteConfig()
      .then((config) => {
        setLiveMasterCode(config.studioSettings.masterCode || MASTER_CLIENT_CODE);
        setLiveClients(config.clients || CLIENT_GALLERIES);
      })
      .catch(() => {});
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use live configuration from the server when available
    const loginMasterCode = liveMasterCode;
    const loginClients = liveClients;

    if (!isClient) {
      // Admin Login Check
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL || ''}/api/admin/login`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (!response.ok) {
        alert('Error: Invalid Admin Credentials. Please check your email and password.');
        return;
      }

      const data = await response.json();
      sessionStorage.setItem('adminToken', data.token);
      sessionStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      // Client Login Check
      const client = liveClients.find(
        (c: any) => c.email.toLowerCase() === email.toLowerCase()
      );

      if (client && password === liveMasterCode) {
        localStorage.setItem('clientAccess', client.email);
        localStorage.setItem('clientGalleryName', client.galleryName);
        navigate('/client/gallery');
      } else if (!client && password === liveMasterCode) {
        alert('Email not found: This email is not authorized for a gallery. Add it in the Studio Command dashboard first.');
      } else {
        alert('Invalid Gallery Code: The code you entered does not match the master access code.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-40 pb-20 px-6 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100"
      >
        <div className="p-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-stone-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
              {isClient ? <User className="text-white h-8 w-8" /> : <ShieldCheck className="text-white h-8 w-8" />}
            </div>
            <h1 className="text-3xl font-serif text-stone-900 mb-2">
              {isClient ? 'Client Portal' : 'Admin Login'}
            </h1>
            <p className="text-stone-500 font-light text-sm uppercase tracking-widest">
              {isClient ? 'Access your private gallery' : 'Secure studio access'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 ml-1">
                {isClient ? 'Your Gallery Email' : 'Email Address'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50 border-none rounded-xl p-4 pl-12 focus:ring-2 focus:ring-stone-200 transition-all outline-none text-sm"
                  placeholder="hello@example.com"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-300" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
                  {isClient ? 'Gallery Access Code' : 'Password'}
                </label>
                <Link to="/forgot-password" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-50 border-none rounded-xl p-4 pl-12 pr-12 focus:ring-2 focus:ring-stone-200 transition-all outline-none text-sm"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-300" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 text-white py-4 rounded-xl uppercase tracking-widest text-xs flex items-center justify-center space-x-2 hover:bg-stone-800 transition-all shadow-lg shadow-stone-200"
            >
              <span>Login to Portal</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-stone-50 text-center">
            <button 
              onClick={() => setIsClient(!isClient)}
              className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
            >
              {isClient ? 'Studio Admin? Login here' : 'Client? Go to Portal'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
