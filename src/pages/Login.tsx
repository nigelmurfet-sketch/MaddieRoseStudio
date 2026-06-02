import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { CLIENT_GALLERIES } from '../config/clients';
import { loadSiteConfig } from '../utils/siteConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [isClient, setIsClient] = useState(true);
  const [liveClients, setLiveClients] = useState(CLIENT_GALLERIES);
  const navigate = useNavigate();

  useEffect(() => {
    loadSiteConfig()
      .then((config) => {
        setLiveClients(config.clients || CLIENT_GALLERIES);
      })
      .catch(() => {});
  }, []);

  const sendLoginCode = async () => {
    if (!email.trim()) {
      alert('Please enter the email address you want to receive the login code at.');
      return;
    }

    setIsSendingCode(true);
    setStatusMessage('');

    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL || ''}/api/send-client-code`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send login code.');
      }

      setCodeSent(true);
      setStatusMessage('A login code has been sent to your email. It expires in 15 minutes.');
    } catch (error) {
      console.error('Send login code failed:', error);
      setStatusMessage(error instanceof Error ? error.message : 'Could not send login code.');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isClient) {
      // Admin Login Check
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL || ''}/api/admin/login`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: code }),
      });

      if (!response.ok) {
        alert('Error: Invalid Admin Credentials. Please check your email and password.');
        return;
      }

      const data = await response.json();
      sessionStorage.setItem('adminToken', data.token);
      sessionStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
      return;
    }

    if (!codeSent) {
      alert('Please request a login code first.');
      return;
    }

    const client = liveClients.find(
      (c: any) => c.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!client) {
      alert('Email not found: This email is not authorized for a gallery. Add it in the Studio Command dashboard first.');
      return;
    }

    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL || ''}/api/verify-client-code`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), code: code.trim() }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Invalid code.');
      }

      localStorage.setItem('clientAccess', email.trim().toLowerCase());
      localStorage.setItem('clientGalleryName', result.galleryName || client.galleryName);
      navigate('/client/gallery');
    } catch (error) {
      console.error('Client login verification failed:', error);
      alert(error instanceof Error ? error.message : 'Could not verify login code.');
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
                  {isClient ? 'Login Code' : 'Password'}
                </label>
                {isClient ? (
                  <span className="text-[10px] uppercase tracking-widest text-stone-400">
                    {codeSent ? 'Code sent to your email' : 'Request a code above'}
                  </span>
                ) : (
                  <Link to="/forgot-password" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
                    Forgot?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  type={showCode ? 'text' : 'password'}
                  required={isClient ? codeSent : true}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={isClient && !codeSent}
                  className="w-full bg-stone-50 border-none rounded-xl p-4 pl-12 pr-12 focus:ring-2 focus:ring-stone-200 transition-all outline-none text-sm"
                  placeholder={isClient ? (codeSent ? 'Enter your login code' : 'Request a code to enable') : '••••••••'}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-300" />
                {isClient && codeSent ? (
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500 transition-colors"
                  >
                    {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                ) : null}
              </div>
            </div>

            {statusMessage ? (
              <div className="space-y-2 px-1">
                <p className="text-sm text-stone-500">{statusMessage}</p>
                {codeSent ? (
                  <button
                    type="button"
                    onClick={sendLoginCode}
                    disabled={isSendingCode}
                    className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
                  >
                    {isSendingCode ? 'Resending code...' : 'Resend code'}
                  </button>
                ) : null}
              </div>
            ) : null}

            {isClient ? (
              <>
                {!codeSent ? (
                  <button
                    type="button"
                    onClick={sendLoginCode}
                    disabled={isSendingCode}
                    className="w-full bg-stone-900 text-white py-4 rounded-xl uppercase tracking-widest text-xs flex items-center justify-center space-x-2 hover:bg-stone-800 transition-all shadow-lg shadow-stone-200"
                  >
                    <span>{isSendingCode ? 'Sending code...' : 'Send login code'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : null}

                {codeSent ? (
                  <button
                    type="submit"
                    className="w-full bg-stone-900 text-white py-4 rounded-xl uppercase tracking-widest text-xs flex items-center justify-center space-x-2 hover:bg-stone-800 transition-all shadow-lg shadow-stone-200"
                  >
                    <span>Verify code and enter</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : null}
              </>
            ) : (
              <button
                type="submit"
                className="w-full bg-stone-900 text-white py-4 rounded-xl uppercase tracking-widest text-xs flex items-center justify-center space-x-2 hover:bg-stone-800 transition-all shadow-lg shadow-stone-200"
              >
                <span>Login to Portal</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </form>

          <div className="mt-8 pt-8 border-t border-stone-50 text-center">
            <button 
              onClick={() => {
                setIsClient(!isClient);
                setCode('');
                setCodeSent(false);
                setStatusMessage('');
              }}
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
