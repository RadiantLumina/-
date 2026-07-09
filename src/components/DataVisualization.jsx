import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as echarts from 'echarts';
import { BarChart3, PieChart, TrendingUp, Clock, Radio } from 'lucide-react';
import { salesDataByPeriod, categoryData, trafficSourceData, hourlyData, liveSessions } from '../data/mockData';
import { useDashboard } from '../context/DashboardContext';

const periods = [
  { key: '7d', label: '近7天' },
  { key: '30d', label: '近30天' },
  { key: '90d', label: '近90天' },
];

export default function DataVisualization() {
  const { chartPeriod, setChartPeriod } = useDashboard();
  const currentData = salesDataByPeriod[chartPeriod];

  return (
    <section className="relative w-full">
      <div className="max-w-[1700px] mx-auto w-full px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
                <BarChart3 size={16} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">数据可视化分析</h2>
            </div>
            <p className="text-sm text-slate-500">多维度数据洞察，深度挖掘业务增长机会</p>
          </div>

          {/* Period selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {periods.map((p) => (
              <button
                key={p.key}
                onClick={() => setChartPeriod(p.key)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  chartPeriod === p.key
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Charts grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* GMV & Orders trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={16} className="text-primary-500" />
              <h3 className="text-sm font-semibold text-slate-700">GMV & 订单趋势</h3>
            </div>
            <TrendChart data={currentData} />
          </motion.div>

          {/* Category pie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <PieChart size={16} className="text-primary-500" />
              <h3 className="text-sm font-semibold text-slate-700">品类销售分布</h3>
            </div>
            <PieChartView data={categoryData} />
          </motion.div>

          {/* Traffic source */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Radio size={16} className="text-accent-500" />
              <h3 className="text-sm font-semibold text-slate-700">流量来源分布</h3>
            </div>
            <TrafficChart data={trafficSourceData} />
          </motion.div>

          {/* Hourly distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Clock size={16} className="text-primary-500" />
              <h3 className="text-sm font-semibold text-slate-700">24小时订单分布</h3>
            </div>
            <HourlyChart data={hourlyData} />
          </motion.div>

          {/* Live sessions comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={16} className="text-accent-500" />
              <h3 className="text-sm font-semibold text-slate-700">直播场次数据对比</h3>
            </div>
            <LiveSessionsChart data={liveSessions} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Trend Line + Bar Chart
function TrendChart({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        textStyle: { color: '#e2e8f0', fontSize: 12 },
      },
      legend: {
        data: ['GMV', '订单数', '直播GMV', '视频GMV'],
        bottom: 0,
        textStyle: { color: '#94a3b8', fontSize: 11 },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 20,
      },
      grid: { left: '3%', right: '4%', top: '8%', bottom: '14%' },
      xAxis: {
        type: 'category',
        data: data.dates,
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisTick: { show: false },
        axisLabel: { color: '#94a3b8', fontSize: 10 },
      },
      yAxis: [
        {
          type: 'value',
          name: '元',
          nameTextStyle: { color: '#94a3b8', fontSize: 10 },
          axisLabel: {
            color: '#94a3b8',
            fontSize: 10,
            formatter: (v) => `${(v / 10000).toFixed(0)}万`,
          },
          splitLine: { lineStyle: { color: '#f1f5f9' } },
        },
        {
          type: 'value',
          name: '单',
          nameTextStyle: { color: '#94a3b8', fontSize: 10 },
          axisLabel: { color: '#94a3b8', fontSize: 10 },
          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: 'GMV',
          type: 'line',
          data: data.gmv,
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { color: '#10B981', width: 2.5 },
          itemStyle: { color: '#10B981' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(16, 185, 129, 0.15)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.01)' },
            ]),
          },
        },
        {
          name: '订单数',
          type: 'bar',
          yAxisIndex: 1,
          data: data.orders,
          barWidth: 12,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#6EE7B7' },
              { offset: 1, color: '#A7F3D0' },
            ]),
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          name: '直播GMV',
          type: 'line',
          data: data.liveGMV,
          smooth: true,
          symbol: 'none',
          lineStyle: { color: '#14B8A6', width: 1.5, type: 'dashed' },
          itemStyle: { color: '#14B8A6' },
        },
        {
          name: '视频GMV',
          type: 'line',
          data: data.videoGMV,
          smooth: true,
          symbol: 'none',
          lineStyle: { color: '#94a3b8', width: 1.5, type: 'dashed' },
          itemStyle: { color: '#94a3b8' },
        },
      ],
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={ref} className="w-full h-[320px]" />;
}

// Pie chart for category
function PieChartView({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);

    const option = {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        textStyle: { color: '#e2e8f0', fontSize: 12 },
        formatter: '{b}: ¥{c} ({d}%)',
      },
      series: [
        {
          type: 'pie',
          radius: ['55%', '80%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 4,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}\n{d}%',
            fontSize: 10,
            color: '#64748b',
          },
          labelLine: {
            lineStyle: { color: '#cbd5e1' },
          },
          emphasis: {
            label: { fontSize: 14, fontWeight: 'bold' },
            scaleSize: 8,
          },
          data: data.map(d => ({ name: d.name, value: d.value })),
          color: [
            '#10B981', '#34D399', '#6EE7B7', '#A7F3D0',
            '#059669', '#047857', '#14B8A6',
          ],
        },
      ],
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={ref} className="w-full h-[320px]" />;
}

// Traffic source horizontal bar
function TrafficChart({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        textStyle: { color: '#e2e8f0', fontSize: 12 },
        formatter: '{b}: {c}%',
      },
      grid: { left: '3%', right: '12%', top: '3%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'value',
        max: 100,
        axisLabel: { color: '#94a3b8', fontSize: 10, formatter: '{value}%' },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
      },
      yAxis: {
        type: 'category',
        data: [...data].reverse().map(d => d.name),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#64748b', fontSize: 11 },
      },
      series: [
        {
          type: 'bar',
          data: [...data].reverse().map(d => ({
            value: d.value,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#D1FAE5' },
                { offset: 1, color: '#10B981' },
              ]),
              borderRadius: [0, 6, 6, 0],
            },
          })),
          barWidth: 18,
          label: {
            show: true,
            position: 'right',
            formatter: '{c}%',
            color: '#64748b',
            fontSize: 11,
          },
        },
      ],
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={ref} className="w-full h-[320px]" />;
}

// Hourly distribution
function HourlyChart({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        textStyle: { color: '#e2e8f0', fontSize: 12 },
      },
      grid: { left: '3%', right: '4%', top: '5%', bottom: '3%' },
      xAxis: {
        type: 'category',
        data: data.map(d => d.hour),
        axisLabel: { color: '#94a3b8', fontSize: 10, interval: 2 },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#94a3b8', fontSize: 10 },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
      },
      series: [
        {
          type: 'bar',
          data: data.map(d => d.orders),
          barWidth: '70%',
          itemStyle: {
            color: (params) => {
              const hour = parseInt(params.name);
              if (hour >= 19 && hour <= 22) return '#10B981';
              if (hour >= 8 && hour <= 10) return '#34D399';
              return '#A7F3D0';
            },
            borderRadius: [4, 4, 0, 0],
          },
        },
      ],
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={ref} className="w-full h-[260px]" />;
}

// Live sessions comparison
function LiveSessionsChart({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        textStyle: { color: '#e2e8f0', fontSize: 12 },
      },
      legend: {
        data: ['观看人数', 'GMV(万)', '时长(分钟)'],
        bottom: 0,
        textStyle: { color: '#94a3b8', fontSize: 11 },
        itemWidth: 10,
        itemHeight: 10,
      },
      grid: { left: '3%', right: '4%', top: '8%', bottom: '14%' },
      xAxis: {
        type: 'category',
        data: data.map(d => d.name),
        axisLabel: { color: '#64748b', fontSize: 10, rotate: 15 },
        axisTick: { show: false },
      },
      yAxis: [
        {
          type: 'value',
          name: '人数/金额',
          axisLabel: { color: '#94a3b8', fontSize: 10, formatter: (v) => v >= 10000 ? `${(v/10000).toFixed(1)}万` : v },
          splitLine: { lineStyle: { color: '#f1f5f9' } },
        },
        {
          type: 'value',
          name: '分钟',
          axisLabel: { color: '#94a3b8', fontSize: 10 },
          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: '观看人数',
          type: 'bar',
          data: data.map(d => d.viewers),
          barWidth: 16,
          barGap: '30%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#34D399' },
              { offset: 1, color: '#A7F3D0' },
            ]),
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          name: 'GMV(万)',
          type: 'bar',
          data: data.map(d => d.gmv),
          barWidth: 16,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#10B981' },
              { offset: 1, color: '#D1FAE5' },
            ]),
            borderRadius: [4, 4, 0, 0],
          },
          label: {
            show: true,
            position: 'top',
            formatter: (p) => `¥${(p.value/10000).toFixed(1)}万`,
            color: '#64748b',
            fontSize: 10,
          },
        },
        {
          name: '时长(分钟)',
          type: 'line',
          yAxisIndex: 1,
          data: data.map(d => d.duration),
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { color: '#14B8A6', width: 2 },
          itemStyle: { color: '#14B8A6' },
        },
      ],
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={ref} className="w-full h-[300px]" />;
}
