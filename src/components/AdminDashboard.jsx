import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Database, Palette, Layout, Save, RotateCcw,
  Globe, Server, FileJson, CheckCircle2, RefreshCw
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

const tabs = [
  { key: 'datasource', label: '数据来源', icon: Database },
  { key: 'appearance', label: '外观配色', icon: Palette },
  { key: 'layout', label: '布局设置', icon: Layout },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('datasource');
  const [saved, setSaved] = useState(false);
  const { config, updateConfig, resetConfig } = useDashboard();

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-[1700px] mx-auto px-8 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">配置中心</h1>
            <p className="text-sm text-slate-500 mt-1">管理数据源、仪表盘外观与功能模块</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={resetConfig}
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
            >
              <RotateCcw size={15} />
              恢复默认
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-xl transition-all active:scale-95"
            >
              {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
              {saved ? '已保存' : '保存配置'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-8 bg-white p-1 rounded-xl border border-slate-200 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'datasource' && <DataSourceTab config={config} updateConfig={updateConfig} />}
          {activeTab === 'appearance' && <AppearanceTab config={config} updateConfig={updateConfig} />}
          {activeTab === 'layout' && <LayoutTab config={config} updateConfig={updateConfig} />}
        </motion.div>
      </div>
    </div>
  );
}

// Data Source Tab
function DataSourceTab({ config, updateConfig }) {
  return (
    <div className="space-y-6">
      {/* Source type */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <Server size={16} className="text-primary-500" />
          数据源类型
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { key: 'mock', label: '模拟数据', desc: '使用内置模拟数据进行演示', icon: FileJson },
            { key: 'api', label: 'API 接口', desc: '通过 REST API 获取实时数据', icon: Globe },
            { key: 'csv', label: '文件导入', desc: '上传 CSV/Excel 数据文件', icon: Database },
          ].map((src) => (
            <button
              key={src.key}
              onClick={() => updateConfig({ dataSource: src.key })}
              className={`p-5 rounded-xl border-2 text-left transition-all ${
                config.dataSource === src.key
                  ? 'border-primary-400 bg-primary-50/50 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <src.icon size={24} className={`mb-3 ${config.dataSource === src.key ? 'text-primary-500' : 'text-slate-400'}`} />
              <h4 className="text-sm font-semibold text-slate-700 mb-1">{src.label}</h4>
              <p className="text-xs text-slate-500">{src.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* API Configuration */}
      {config.dataSource === 'api' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white rounded-2xl border border-slate-200 p-6"
        >
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Globe size={16} className="text-primary-500" />
            API 连接配置
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">API Endpoint</label>
              <input
                type="text"
                placeholder="https://api.example.com/v1"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">API Key</label>
              <input
                type="password"
                placeholder="••••••••••••••••"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-50"
              />
            </div>
          </div>
          <button className="mt-4 flex items-center gap-2 text-xs text-primary-500 hover:text-primary-600 font-medium">
            <RefreshCw size={12} /> 测试连接
          </button>
        </motion.div>
      )}

      {/* Refresh settings */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <RefreshCw size={16} className="text-primary-500" />
          数据刷新频率
        </h3>
        <div className="flex items-center gap-3">
          {[3000, 5000, 10000, 30000].map((interval) => (
            <button
              key={interval}
              onClick={() => updateConfig({ refreshInterval: interval })}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                config.refreshInterval === interval
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {interval >= 1000 ? `${interval / 1000}s` : `${interval}ms`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Appearance Tab
function AppearanceTab({ config, updateConfig }) {
  const colorOptions = [
    { name: '翡翠绿 (默认)', hex: '#10B981' },
    { name: '深海绿', hex: '#059669' },
    { name: '青碧', hex: '#14B8A6' },
    { name: '松石绿', hex: '#0D9488' },
    { name: '薄荷绿', hex: '#22C55E' },
  ];

  const bgOptions = [
    { name: '纯白', hex: '#FFFFFF' },
    { name: '暖白', hex: '#FAFAFA' },
    { name: '浅灰', hex: '#F8FAFC' },
    { name: '极浅绿', hex: '#F0FDF4' },
  ];

  return (
    <div className="space-y-6">
      {/* Theme color */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <Palette size={16} className="text-primary-500" />
          主题色
        </h3>
        <div className="flex items-center gap-4 flex-wrap">
          {colorOptions.map((color) => (
            <button
              key={color.hex}
              onClick={() => updateConfig({ themeColor: color.hex })}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                config.themeColor === color.hex
                  ? 'border-primary-400 bg-primary-50/50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="w-6 h-6 rounded-lg" style={{ backgroundColor: color.hex }} />
              <span className="text-xs font-medium text-slate-600">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Background */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">背景色方案</h3>
        <div className="flex items-center gap-4 flex-wrap">
          {bgOptions.map((bg) => (
            <button
              key={bg.hex}
              onClick={() => updateConfig({ backgroundColor: bg.hex })}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                config.backgroundColor === bg.hex
                  ? 'border-primary-400 bg-primary-50/50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="w-8 h-8 rounded-lg border border-slate-200" style={{ backgroundColor: bg.hex }} />
              <span className="text-xs font-medium text-slate-600">{bg.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Layout Tab
function LayoutTab({ config, updateConfig }) {
  const toggles = [
    { key: 'showMap', label: '展示全国订单地图', desc: '在数据大盘中显示中国地图及城市订单热力', icon: Globe },
    { key: 'showOrders', label: '展示实时订单流', desc: '在右侧面板展示实时推送的订单信息', icon: RefreshCw },
    { key: 'showMonitoring', label: '展示数据监测模块', desc: '显示关键业务指标的实时监测面板', icon: Settings },
    { key: 'showCharts', label: '展示数据可视化分析', desc: '显示多维度数据分析与图表展示', icon: Palette },
    { key: 'compactMode', label: '紧凑模式', desc: '减小卡片间距与内边距，展示更多内容', icon: Layout },
  ];

  return (
    <div className="space-y-4">
      {toggles.map((toggle) => (
        <div
          key={toggle.key}
          className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <toggle.icon size={18} className="text-slate-400" />
            <div>
              <h4 className="text-sm font-semibold text-slate-700">{toggle.label}</h4>
              <p className="text-xs text-slate-500">{toggle.desc}</p>
            </div>
          </div>
          <button
            onClick={() => updateConfig({ [toggle.key]: !config[toggle.key] })}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              config[toggle.key] ? 'bg-primary-500' : 'bg-slate-200'
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                config[toggle.key] ? 'translate-x-5.5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}
