import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { SubscriptionList } from '@/components/dashboard/SubscriptionList';
import { SpendingChart } from '@/components/dashboard/SpendingChart';
import { UpcomingRenewals } from '@/components/dashboard/UpcomingRenewals';
import { dashboardAPI } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    
    // Listen for refresh events
    const handleRefresh = () => {
      loadDashboardData();
    };
    window.addEventListener('dashboard-refresh', handleRefresh);
    
    return () => {
      window.removeEventListener('dashboard-refresh', handleRefresh);
    };
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await dashboardAPI.getSummary();
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8">
        <h1 className={cn(
          "text-3xl font-bold text-foreground mb-2",
          language === 'bn' && "font-bangla"
        )}>
          {t.dashboard.welcome}, {user?.name || 'User'}! 👋
        </h1>
        <p className={cn(
          "text-muted-foreground",
          language === 'bn' && "font-bangla"
        )}>
          {t.dashboard.overview}
        </p>
      </div>

      {/* Stats grid */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            type="activeSubscriptions"
            value={stats.stats.activeSubscriptions}
          />
          <StatCard
            type="monthlyCost"
            value={`$${stats.stats.monthlyCost.toFixed(2)}`}
          />
          <StatCard
            type="upcomingRenewals"
            value={stats.stats.upcomingRenewals}
          />
          <StatCard
            type="yearlySpend"
            value={`$${stats.stats.yearlySpend.toFixed(2)}`}
          />
        </div>
      )}

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <SpendingChart data={stats?.monthlySpending} />
        </div>
        <div>
          <UpcomingRenewals data={stats?.upcomingRenewals} />
        </div>
      </div>

      {/* Subscription list */}
      <SubscriptionList />
    </DashboardLayout>
  );
};

export default Dashboard;
