import { useLanguage } from '@/contexts/LanguageContext';
import { subscriptions } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function UpcomingRenewals() {
  const { t, language } = useLanguage();

  // Get subscriptions sorted by renewal date (soonest first)
  const upcoming = subscriptions
    .filter((sub) => sub.status !== 'expired')
    .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
    .slice(0, 4);

  const getDaysLeft = (date: string) => {
    const today = new Date();
    const renewal = new Date(date);
    const diffTime = renewal.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysText = (days: number) => {
    if (days <= 0) return t.dashboard.upcomingRenewals.today;
    if (days === 1) return t.dashboard.upcomingRenewals.tomorrow;
    return `${days} ${t.dashboard.upcomingRenewals.daysLeft}`;
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <h3 className={cn(
        "text-lg font-semibold text-foreground mb-6",
        language === 'bn' && "font-bangla"
      )}>
        {t.dashboard.upcomingRenewals.title}
      </h3>

      <div className="space-y-4">
        {upcoming.map((sub) => {
          const daysLeft = getDaysLeft(sub.renewalDate);
          const isUrgent = daysLeft <= 3;

          return (
            <div key={sub.id} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                style={{ backgroundColor: `${sub.color}15` }}
              >
                {sub.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {sub.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  ${sub.cost.toFixed(2)}{language === 'bn' ? '/মাস' : '/mo'}
                </p>
              </div>
              <div className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                language === 'bn' && "font-bangla",
                isUrgent
                  ? "bg-warning/10 text-warning"
                  : "bg-muted text-muted-foreground"
              )}>
                {getDaysText(daysLeft)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
