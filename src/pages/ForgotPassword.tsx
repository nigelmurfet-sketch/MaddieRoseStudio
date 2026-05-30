import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-40 pb-20 px-6 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100"
      >
        <div className="p-10">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="request"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Mail className="text-stone-900 h-8 w-8" />
                  </div>
                  <h1 className="text-3xl font-serif text-stone-900 mb-2">Forgot Password</h1>
                  <p className="text-stone-500 font-light text-sm">
                    Enter your email and we'll send you a link to reset your gallery access.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 ml-1">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-stone-50 border-none rounded-xl p-4 pl-12 focus:ring-2 focus:ring-stone-200 transition-all outline-none text-sm"
                        placeholder="hello@example.com"
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-300" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-stone-900 text-white py-4 rounded-xl uppercase tracking-widest text-xs flex items-center justify-center space-x-2 hover:bg-stone-800 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-green-600 h-8 w-8" />
                </div>
                <h1 className="text-3xl font-serif text-stone-900 mb-2">Check Your Email</h1>
                <p className="text-stone-500 font-light text-sm mb-8 leading-relaxed">
                  We've sent a password reset link to <span className="font-medium text-stone-900">{email}</span>. Please check your inbox and spam folder.
                </p>
                
                {/* Simulated Link for Demo Purposes */}
                <div className="mb-8 p-4 bg-stone-50 rounded-xl border border-dashed border-stone-200">
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Demo: Click below to simulate email link</p>
                  <Link to="/reset-password" title="demo-reset" className="text-xs text-stone-900 underline hover:text-stone-500">
                    Reset Password Link
                  </Link>
                </div>

                <Link
                  to="/login"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>Back to Login</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {!isSubmitted && (
            <div className="mt-8 pt-8 border-t border-stone-50 text-center">
              <Link
                to="/login"
                className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Back to Login</span>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
