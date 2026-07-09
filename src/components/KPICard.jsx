import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useCountUp, useCountUpFloat } from '../hooks/useCountUp';

export default function KPICard({ metric, className = '' }) {
  const isNegativeGood = metric.inverse;
  const isPositive = isNegativeGood ? metric.change < 0 : metric.change > 0;
  const isNeutral = metric.change === 0;
  const isFloat = typeof metric.value === 'number' && !Number.isInteger(metric.value);

  // Always call both hooks unconditionally (React hooks rules)
  const intValue = useCountUp(isFloat ? Math.floor(metric.value) : metric.value, 1500, 0);
  const floatValue = useCountUpFloat(isFloat ? Number((metric.value * 100).toFixed(0)) : 0, 1500, 2);

  const formattedValue = () => {
    if (isFloat) {
      return (floatValue / 100).toFixed(2);
    }
    return intValue.toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`glass-card p-5 cursor-default transition-shadow hover:shadow-lg ${className}`}
    >
      {/* Mini trend sparkline */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          {metric.name}
        </span>
        <div className="flex items-center gap-1">
          {!isNeutral && (
            isPositive
              ? <TrendingUp size={14} className="text-green-500" />
              : <TrendingDown size={14} className="text-red-400" />
          )}
          <span className={`text-xs font-semibold ${
            isNeutral ? 'text-slate-400' :
            isPositive ? 'text-green-500' : 'text-red-400'
          }`}>
            {isPositive ? '+' : ''}{metric.change}%
          </span>
        </div>
      </div>

      {/* Value */}
      <div className="counter-font text-2xl md:text-3xl font-bold text-slate-800 mb-1">
        {metric.prefix && <span className="text-lg text-slate-500 font-medium">{metric.prefix}</span>}
        {formattedValue()}
        {metric.suffix && <span className="text-lg text-slate-500 font-medium">{metric.suffix}</span>}
      </div>

      {/* Mini chart */}
      {metric.trend && (
        <div className="mt-3 h-8">
          <MiniTrend data={metric.trend} color={metric.color} positive={isPositive} />
        </div>
      )}
    </motion.div>
  );
}

function MiniTrend({ data, color, positive }) {
  const width = 100;
  const height = 32;
  const padding = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((v - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${padding},${height} ${points} ${width - padding},${height}`;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
