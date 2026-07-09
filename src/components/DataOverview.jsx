import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, ShoppingBag, Store, DollarSign, Package, Users, Activity } from 'lucide-react';
import ChinaMap from './ChinaMap';
import { chinaCities, storeMetrics, generateRandomOrder } from '../data/mockData';
import { useCountUp } from '../hooks/useCountUp';

export default function DataOverview() {
  const [activeCities, setActiveCities] = useState([]);
  const [orderStream, setOrderStream] = useState([]);
  const [highlightedCity, setHighlightedCity] = useState(null);
  const intervalRef = useRef(null);

  const gmvCount = useCountUp(storeMetrics.totalGMV, 2000);
  const ordersCount = useCountUp(storeMetrics.totalOrders, 2000);
  const customersCount = useCountUp(storeMetrics.totalCustomers, 2000);

  // Simulate real-time orders
  useEffect(() => {
    // Initial batch
    const initial = Array.from({ length: 8 }, () => generateRandomOrder());
    setOrderStream(initial);
    setActiveCities(initial.map(o => o.city));

    intervalRef.current = setInterval(() => {
      const newOrder = generateRandomOrder();
      setOrderStream(prev => [newOrder, ...prev].slice(0, 20));
      setActiveCities(prev => {
        const next = [...prev, newOrder.city];
        return [...new Set(next)].slice(-15);
      });
      setHighlightedCity(newOrder.city);
      setTimeout(() => setHighlightedCity(null), 2000);
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const metrics = [
    { icon: DollarSign, label: '累计GMV', value: gmvCount, prefix: '¥', color: 'text-primary-500', bg: 'bg-primary-50' },
    { icon: ShoppingBag, label: '总订单数', value: ordersCount, color: 'text-green-600', bg: 'bg-green-50' },
    { icon: Users, label: '累计客户', value: customersCount, color: 'text-accent-500', bg: 'bg-accent-50' },
    { icon: Package, label: '在售商品', value: storeMetrics.productCount, color: 'text-teal-600', bg: 'bg-teal-50' },
  ];

  return (
    <section className="relative w-full">
      <div className="max-w-[1700px] mx-auto w-full px-8 py-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">实时数据大盘</h2>
          </div>
          <p className="text-sm text-slate-500">全国订单动态监控，实时追踪每笔交易</p>
        </motion.div>

        {/* Top metrics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {metrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card p-2 relative overflow-hidden"
          >
            {/* Map legend */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-slate-100">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide mb-1">订单热度</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(167, 243, 208, 0.9)' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(110, 231, 183, 0.9)' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(52, 211, 153, 0.9)' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(16, 185, 129, 0.9)' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(5, 150, 105, 0.95)' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(4, 120, 87, 0.95)' }} />
              </div>
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>低</span><span>高</span>
              </div>
            </div>

            {/* Live indicator */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm border border-slate-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[10px] font-semibold text-green-600 uppercase">实时</span>
            </div>

            <ChinaMap activeCities={activeCities} highlightedCity={highlightedCity} />
          </motion.div>

          {/* Order stream */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-5 flex flex-col overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag size={16} className="text-primary-500" />
              <h3 className="text-sm font-semibold text-slate-700">实时订单流</h3>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
                <span className="text-[10px] text-slate-400">2s</span>
              </div>
            </div>

            <div className="flex-1 overflow-hidden relative">
              <div className="absolute inset-0 overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {orderStream.map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: 'auto' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                          <span className="text-xs font-medium text-slate-700 truncate">{order.city}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 ml-3.5 truncate">{order.product}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
                        <span className="text-xs font-semibold text-slate-800 counter-font">
                          ¥{order.amount}
                        </span>
                        <p className="text-[10px] text-slate-400">{order.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ icon: Icon, label, value, prefix, color, bg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      className="glass-card p-5 flex items-center gap-4 transition-shadow hover:shadow-lg"
    >
      <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={20} className={color} />
      </div>
      <div>
        <p className="text-xs text-slate-400 mb-0.5">{label}</p>
        <p className="text-xl font-bold text-slate-800 counter-font">
          {prefix && <span className="text-sm text-slate-500 font-medium">{prefix}</span>}
          {typeof value === 'function' ? value : value?.toLocaleString?.() ?? value}
        </p>
      </div>
    </motion.div>
  );
}
