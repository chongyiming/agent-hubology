
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MetricsContainer from '@/components/dashboard/MetricsContainer';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import OpportunitiesBoard from '@/components/dashboard/OpportunitiesBoard';
import PropertyShowcase from '@/components/dashboard/PropertyShowcase';
import UpcomingPayments from '@/components/dashboard/UpcomingPayments';
import { useMetrics } from '@/hooks/useDashboard';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: metricsData } = useMetrics();
  const metrics = metricsData?.data?.metrics || [];

  const handleViewAllOpportunities = () => {
    navigate('/opportunities');
  };
  
  const handleViewAllPayments = () => {
    navigate('/commissions/forecast');
  };
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      
      <MetricsContainer metrics={metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions />
        <UpcomingPayments onViewAll={handleViewAllPayments} />
      </div>
      
      <OpportunitiesBoard onViewAll={handleViewAllOpportunities} />
      
      <PropertyShowcase />
    </div>
  );
};

export default Dashboard;
