import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { SubscriptionList } from '@/components/dashboard/SubscriptionList';
import { SpendingChart } from '@/components/dashboard/SpendingChart';
import { UpcomingRenewals } from '@/components/dashboard/UpcomingRenewals';
import { dashboardStats } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          type="activeSubscriptions"
          value={dashboardStats.activeSubscriptions}
          change="+2"
          trend="up"
        />
        <StatCard
          type="monthlyCost"
          value={`$${dashboardStats.monthlyCost.toFixed(2)}`}
          change="+5.2%"
          trend="up"
        />
        <StatCard
          type="upcomingRenewals"
          value={dashboardStats.upcomingRenewals}
        />
        <StatCard
          type="yearlySpend"
          value={`$${dashboardStats.yearlySpend.toFixed(2)}`}
          change="+12.3%"
          trend="up"
        />
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <SpendingChart />
        </div>
        <div>
          <UpcomingRenewals />
        </div>
      </div>

      {/* Subscription list */}
      <SubscriptionList />
    </DashboardLayout>
  );
};

export default Dashboard;
