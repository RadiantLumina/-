import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Sparkles, BarChart3, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const { openLogin } = useAuth();
  const canvasRef = useRef(null);

  // Animated particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    let animId;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((w * h) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          a: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.a})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();
    window.addEventListener('resize', () => { resize(); createParticles(); });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const features = [
    { icon: TrendingUp, label: '实时数据' },
    { icon: BarChart3, label: '多维分析' },
    { icon: Zap, label: '秒级刷新' },
    { icon: ShieldCheck, label: '安全可靠' },
  ];

  return (
    <section className="section-full relative overflow-hidden bg-white">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary-50/60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-accent-50/50 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary-50/30 to-accent-50/30 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8">
        <div className="w-full max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 border border-primary-100 rounded-full mb-8"
          >
            <Sparkles size={14} className="text-primary-500" />
            <span className="text-xs font-medium text-primary-700">抖音电商数据可视化解决方案</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 leading-[1.1] mb-6 tracking-tight"
          >
            用数据洞察
            <br />
            <span className="bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500 bg-clip-text text-transparent">
              驱动电商增长
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            一站式聚合抖音电商核心数据，实时监控店铺表现，深度分析品类趋势，
            以可视化方式呈现关键指标，让每一个决策都有据可依。
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex items-center justify-center gap-4"
          >
            <button
              onClick={openLogin}
              className="group px-12 py-5 text-lg bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl flex items-center gap-3 transition-all active:scale-95 shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40"
            >
              开始定制
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 text-lg border border-slate-200 hover:border-primary-200 text-slate-600 hover:text-primary-600 font-medium rounded-xl transition-all bg-white/50 backdrop-blur-sm"
            >
              了解更多
            </button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-16 flex items-center justify-center gap-3 flex-wrap"
          >
            {features.map((f, i) => (
              <div
                key={f.label}
                className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-slate-100 rounded-xl shadow-sm"
              >
                <f.icon size={14} className="text-primary-400" />
                <span className="text-xs font-medium text-slate-600">{f.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

          {/* Dashboard preview mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-16 w-full max-w-5xl"
          >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100">
            {/* Mock dashboard image area */}
            <div className="aspect-[16/7] bg-gradient-to-br from-slate-50 via-white to-primary-50/30 p-6">
              <div className="h-full rounded-xl bg-white/60 backdrop-blur-sm border border-primary-100/50 overflow-hidden">
                {/* Mock header bar */}
                <div className="h-10 border-b border-slate-100 flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-300/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-300/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-300/60" />
                  <span className="text-[10px] text-slate-400 ml-3 font-mono">douyin-dashboard</span>
                </div>
                {/* Mock grid */}
                <div className="p-5 grid grid-cols-4 gap-4 h-[calc(100%-40px)]">
                  <div className="col-span-1 bg-primary-50/50 rounded-lg border border-primary-100/30" />
                  <div className="col-span-1 bg-primary-50/50 rounded-lg border border-primary-100/30" />
                  <div className="col-span-1 bg-primary-50/50 rounded-lg border border-primary-100/30" />
                  <div className="col-span-1 bg-primary-50/50 rounded-lg border border-primary-100/30" />
                  <div className="col-span-2 bg-accent-50/30 rounded-lg border border-accent-100/20" />
                  <div className="col-span-2 bg-slate-50 rounded-lg border border-slate-100" />
                  <div className="col-span-3 bg-slate-50 rounded-lg border border-slate-100" />
                  <div className="col-span-1 bg-primary-50/30 rounded-lg border border-primary-100/20" />
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-200/20 via-accent-200/20 to-primary-200/20 blur-xl -z-10 rounded-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
