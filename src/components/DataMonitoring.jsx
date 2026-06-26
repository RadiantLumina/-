import { motion } from 'framer-motion';
import { Activity, TrendingUp, Gauge } from 'lucide-react';
import KPICard from './KPICard';
import { monitoringMetrics } from '../data/mockData';

export default function DataMonitoring() {
  return (
    <section className="relative w-full">
      <div className="max-w-[1700px] mx-auto w-full px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">数据监测中心</h2>
          </div>
          <p className="text-sm text-slate-500">多维度实时监控核心业务指标变化趋势</p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          {monitoringMetrics.slice(0, 6).map((metric, i) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <KPICard metric={metric} />
            </motion.div>
          ))}
        </div>

        {/* Bottom insight row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-5"
        >
          <InsightCard
            icon={TrendingUp}
            title="GMV 趋势洞察"
            value="近7日 GMV 环比增长 12.5%，晚场直播贡献占比 41.2%"
            color="text-primary-500"
            bg="bg-primary-50"
          />
          <InsightCard
            icon={Activity}
            title="流量转化分析"
            value="直播间转化率 3.82%，高于行业均值 1.2 个百分点"
            color="text-accent-500"
            bg="bg-accent-50"
          />
          <InsightCard
            icon={Gauge}
            title="运营效率评分"
            value="店铺综合评分 4.87 / 5.0，位居同类目 TOP 3%"
            color="text-green-600"
            bg="bg-green-50"
          />
        </motion.div>
      </div>
    </section>
  );
}

function InsightCard({ icon: Icon, title, value, color, bg }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass-card p-5 border border-slate-100 flex items-start gap-4 transition-shadow hover:shadow-lg"
    >
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
        <Icon size={18} className={color} />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-1.5">{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed">{value}</p>
      </div>
    </motion.div>
  );
}
