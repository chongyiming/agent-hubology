
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import Team from './pages/Team';
import Commission from './pages/Commission';
import AdminDashboard from './pages/admin/Dashboard';
import AdminAgents from './pages/admin/Agents';
import AdminProperties from './pages/admin/Properties';
import CommissionTiers from './pages/admin/CommissionTiers';
import PaymentSchedulesAdmin from './pages/admin/PaymentSchedulesAdmin';
import CommissionApproval from './pages/admin/CommissionApproval';
import CommissionForecast from './pages/CommissionForecast';
import CommissionSettings from './pages/admin/CommissionSettings';
import Roles from './pages/admin/Roles';
import NewTransaction from './pages/NewTransaction';
import TransactionList from './pages/TransactionList';
import TransactionDetail from './pages/TransactionDetail';
import { AuthProvider } from './providers/AuthProvider';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import NotFound from './pages/NotFound';
import CommissionForecastPage from './pages/admin/CommissionForecast';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'properties', element: <PropertyList /> },
      { path: 'properties/:id', element: <PropertyDetail /> },
      { path: 'team', element: <Team /> },
      { path: 'transactions', element: <TransactionList /> },
      { path: 'transactions/new', element: <NewTransaction /> },
      { path: 'transactions/:id', element: <TransactionDetail /> },
      { path: 'commission', element: <Commission /> },
      { path: 'commission/forecast', element: <CommissionForecast /> },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'agents', element: <AdminAgents /> },
          { path: 'properties', element: <AdminProperties /> },
          { path: 'transactions', element: <AdminDashboard /> }, // Placeholder for now
          { path: 'commission/tiers', element: <CommissionTiers /> },
          { path: 'commission/schedules', element: <PaymentSchedulesAdmin /> },
          { path: 'commission/settings', element: <CommissionSettings /> },
          { path: 'commission/forecast', element: <CommissionForecastPage /> },
          { path: 'commissions', element: <CommissionApproval /> },
          { path: 'commissions/:id', element: <CommissionApproval /> },
          { path: 'roles', element: <Roles /> },
          { path: 'settings', element: <AdminDashboard /> }, // Placeholder
          { path: 'system-logs', element: <AdminDashboard /> }, // Placeholder
          { path: 'database', element: <AdminDashboard /> }, // Placeholder
        ],
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '*', element: <NotFound /> },
]);

export default function Router() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
