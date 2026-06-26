import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, BarChart3, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="section-full relative bg-slate-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent-500/5 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1700px] mx-auto w-full px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <BarChart3 size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">DataViz</span>
          </motion.div>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
          >
            让数据驱动每一个商业决策
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-lg mx-auto mb-12 text-sm leading-relaxed"
          >
            专注抖音电商数据可视化，为您提供实时、精准、多维度的店铺数据监控与分析服务。
          </motion.p>

          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-4 mb-16"
          >
            {[
              { icon: Mail, label: '电子邮箱', value: 'contact@dataviz.cn', href: 'mailto:contact@dataviz.cn' },
              { icon: Phone, label: '联系电话', value: '400-888-6789', href: 'tel:400-888-6789' },
              { icon: MapPin, label: '公司地址', value: '北京市朝阳区望京SOHO', href: null },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/8 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                  <item.icon size={18} className="text-primary-400" />
                </div>
                <span className="text-xs text-slate-500">{item.label}</span>
                {item.href ? (
                  <a href={item.href} className="text-sm font-medium text-slate-300 hover:text-primary-400 transition-colors flex items-center gap-1">
                    {item.value}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <span className="text-sm font-medium text-slate-300">{item.value}</span>
                )}
              </div>
            ))}
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="pt-8 border-t border-white/5 flex items-center justify-between"
          >
            <p className="text-xs text-slate-500">
              &copy; 2026 DataViz. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">隐私政策</a>
              <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">服务条款</a>
              <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">帮助中心</a>
              <button
                onClick={scrollToTop}
                className="ml-2 w-8 h-8 rounded-lg bg-white/5 hover:bg-primary-500/20 flex items-center justify-center transition-colors group"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-primary-400 transition-colors">
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
