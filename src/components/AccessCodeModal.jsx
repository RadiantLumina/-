import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AccessCodeModal() {
  const { showModal, closeLogin, login } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => inputRef.current?.focus(), 400);
      setCode('');
      setError('');
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError('请输入访问码');
      return;
    }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 600));
    const success = login(code.trim());
    setLoading(false);
    if (success) {
      setTimeout(() => navigate('/dashboard'), 150);
    } else {
      setError('访问码错误，请重试');
      setCode('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') closeLogin();
  };

  return (
    <AnimatePresence>
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ isolation: 'isolate' }}>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeLogin}
          />

          {/* Modal card */}
          <motion.div
            key="modal"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-[420px] mx-4 bg-white rounded-2xl shadow-2xl z-10"
          >
            {/* Top accent bar */}
            <div className="h-1 rounded-t-2xl bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500" />

            {/* Close button */}
            <button
              onClick={closeLogin}
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="关闭"
            >
              <X size={20} />
            </button>

            <div className="px-10 pb-10 pt-10">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center ring-1 ring-green-100">
                <ShieldCheck size={30} className="text-emerald-500" />
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-center text-slate-800 mb-3">
                访问验证
              </h2>
              <p className="text-sm text-center text-slate-500 mb-10 leading-relaxed">
                请输入您的专属访问码以进入后台管理
              </p>

              {/* Input */}
              <div className="relative mb-5">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock size={17} className="text-slate-400" />
                </div>
                <input
                  ref={inputRef}
                  type="password"
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setError(''); }}
                  onKeyDown={handleKeyDown}
                  placeholder="请输入访问码"
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 focus:bg-white"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-xs mb-5 pl-1">
                  {error}
                </p>
              )}

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-medium rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] disabled:cursor-not-allowed text-base"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    验证进入
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              {/* Hint */}
              <p className="text-xs text-slate-400 text-center mt-8">
                演示访问码：
                <span className="font-mono text-emerald-500 font-medium ml-1">DYSJ2026</span>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
