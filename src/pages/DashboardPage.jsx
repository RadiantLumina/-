import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';
import DataOverview from '../components/DataOverview';
import DataMonitoring from '../components/DataMonitoring';
import DataVisualization from '../components/DataVisualization';

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="pt-20">
      <div className="max-w-[1700px] mx-auto px-10">
        <div className="flex flex-col gap-y-20">
          <ErrorBoundary name="DataOverview">
            <DataOverview />
          </ErrorBoundary>
          <ErrorBoundary name="DataMonitoring">
            <DataMonitoring />
          </ErrorBoundary>
          <ErrorBoundary name="DataVisualization">
            <DataVisualization />
          </ErrorBoundary>
        </div>
      </div>

      {/* Footer at bottom */}
      <footer className="mt-24 bg-slate-900">
        <div className="max-w-[1700px] mx-auto px-10 py-14">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              &copy; 2026 DataViz — 抖音电商数据可视化平台
            </p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">隐私政策</a>
              <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">服务条款</a>
              <a href="/" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">返回首页</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
