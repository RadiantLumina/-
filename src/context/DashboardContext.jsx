import { createContext, useContext, useState, useCallback } from 'react';

const DashboardContext = createContext(null);

const defaultConfig = {
  dataSource: 'mock',
  themeColor: '#10B981',
  accentColor: '#14B8A6',
  backgroundColor: '#FFFFFF',
  cardBackground: '#F8FAFC',
  refreshInterval: 5000,
  showMap: true,
  showOrders: true,
  showMonitoring: true,
  showCharts: true,
  chartPeriod: '7d',
  compactMode: false,
};

export function DashboardProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig);
  const [chartPeriod, setChartPeriod] = useState('7d');

  const updateConfig = useCallback((updates) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  return (
    <DashboardContext.Provider value={{ config, chartPeriod, setChartPeriod, updateConfig, resetConfig }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within DashboardProvider');
  return context;
}
