import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Simulate API call
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-40 pb-20 px-6 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100"
      >
        <div className="p-10">
          {!isSuccess ? (
            <>
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lock className="text-stone-900 h-8 w-8" />
                </div>
                <h1 className="text-3xl font-serif text-stone-900 mb-2">New Password</h1>
                <p className="text-stone-500 font-light text-sm">
                  Create a secure password for your gallery access.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 ml-1">New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-stone-50 border-none rounded-xl p-4 pl-12 focus:ring-2 focus:ring-stone-200 transition-all outline-none text-sm"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-300" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 ml-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-stone-50 border-none rounded-xl p-4 pl-12 focus:ring-2 focus:ring-stone-200 transition-all outline-none text-sm"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-300" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-900 text-white py-4 rounded-xl uppercase tracking-widest text-xs flex items-center justify-center space-x-2 hover:bg-stone-800 transition-all shadow-lg"
                >
                  <span>Update Password</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-green-600 h-8 w-8" />
              </div>
              <h1 className="text-3xl font-serif text-stone-900 mb-2">Success!</h1>
              <p className="text-stone-500 font-light text-sm mb-4">
                Your password has been updated successfully.
              </p>
              <p className="text-stone-400 text-[10px] uppercase tracking-widest">
                Redirecting to login in 3 seconds...
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
