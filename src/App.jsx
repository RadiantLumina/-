import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import AccessCodeModal from './components/AccessCodeModal';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';

function Layout() {
  return (
    <>
      <ErrorBoundary name="Navbar">
        <Navbar />
      </ErrorBoundary>
      <ErrorBoundary name="AccessCodeModal">
        <AccessCodeModal />
      </ErrorBoundary>
      <ErrorBoundary name="PageContent">
        <Outlet />
      </ErrorBoundary>
    </>
  );
}

function HomeGuard() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return (
    <ErrorBoundary name="HomePage">
      <HomePage />
    </ErrorBoundary>
  );
}

function DashboardGuard() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return (
    <ErrorBoundary name="DashboardPage">
      <DashboardPage />
    </ErrorBoundary>
  );
}

function AdminGuard() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return (
    <ErrorBoundary name="AdminPage">
      <AdminPage />
    </ErrorBoundary>
  );
}

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <DashboardProvider>
          <ErrorBoundary name="AppRoot">
            <Layout />
          </ErrorBoundary>
        </DashboardProvider>
      </AuthProvider>
    ),
    children: [
      { path: '/', element: <HomeGuard /> },
      { path: '/dashboard', element: <DashboardGuard /> },
      { path: '/admin', element: <AdminGuard /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
