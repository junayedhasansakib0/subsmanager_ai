import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { CreditCard, DollarSign, Bell, TrendingUp, TrendingDown } from 'lucide-react';

const icons = {
  activeSubscriptions: CreditCard,
  monthlyCost: DollarSign,
  upcomingRenewals: Bell,
  yearlySpend: TrendingUp,
};

interface StatCardProps {
  type: 'activeSubscriptions' | 'monthlyCost' | 'upcomingRenewals' | 'yearlySpend';
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
}

export function StatCard({ type, value, change, trend }: StatCardProps) {
  const { t, language } = useLanguage();
  const IconComponent = icons[type];

  const titles = {
    activeSubscriptions: t.dashboard.stats.activeSubscriptions,
    monthlyCost: t.dashboard.stats.monthlyCost,
    upcomingRenewals: t.dashboard.stats.upcomingRenewals,
    yearlySpend: t.dashboard.stats.yearlySpend,
  };

  const colorClasses = {
    activeSubscriptions: 'bg-primary/10 text-primary',
    monthlyCost: 'bg-accent/10 text-accent',
    upcomingRenewals: 'bg-warning/10 text-warning',
    yearlySpend: 'bg-success/10 text-success',
  };

  return (
    <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colorClasses[type])}>
          <IconComponent className="w-6 h-6" />
        </div>
        {change && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            trend === 'up' ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
          )}>
            {trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {change}
          </div>
        )}
      </div>
      <p className={cn(
        "text-sm text-muted-foreground mb-1",
        language === 'bn' && "font-bangla"
      )}>
        {titles[type]}
      </p>
      <p className={cn(
        "text-3xl font-bold text-foreground",
        language === 'bn' && "font-bangla"
      )}>
        {value}
      </p>
    </div>
  );
}
