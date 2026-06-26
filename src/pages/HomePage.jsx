import ErrorBoundary from '../components/ErrorBoundary';
import Hero from '../components/Hero';
import DataOverview from '../components/DataOverview';
import DataMonitoring from '../components/DataMonitoring';
import DataVisualization from '../components/DataVisualization';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <main>
      <ErrorBoundary name="Hero"><Hero /></ErrorBoundary>
      <ErrorBoundary name="DataOverview"><div id="features"><DataOverview /></div></ErrorBoundary>
      <ErrorBoundary name="DataMonitoring"><DataMonitoring /></ErrorBoundary>
      <ErrorBoundary name="DataVisualization"><DataVisualization /></ErrorBoundary>
      <ErrorBoundary name="Footer"><Footer /></ErrorBoundary>
    </main>
  );
}
