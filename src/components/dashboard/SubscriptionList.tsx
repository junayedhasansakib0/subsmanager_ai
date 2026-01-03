import { useLanguage } from '@/contexts/LanguageContext';
import { subscriptions } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Plus, Filter } from 'lucide-react';

export function SubscriptionList() {
  const { t, language } = useLanguage();

  const statusConfig = {
    active: { 
      label: t.dashboard.subscriptionList.active, 
      class: 'bg-success/10 text-success border-success/20' 
    },
    expired: { 
      label: t.dashboard.subscriptionList.expired, 
      class: 'bg-destructive/10 text-destructive border-destructive/20' 
    },
    expiring: { 
      label: t.dashboard.subscriptionList.expiring, 
      class: 'bg-warning/10 text-warning border-warning/20' 
    },
  };

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className={cn(
          "text-lg font-semibold text-foreground",
          language === 'bn' && "font-bangla"
        )}>
          {t.dashboard.subscriptionList.title}
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className={cn(language === 'bn' && "font-bangla")}>
            <Filter className="w-4 h-4 mr-2" />
            {t.dashboard.subscriptionList.filter}
          </Button>
          <Button size="sm" className={cn(language === 'bn' && "font-bangla")}>
            <Plus className="w-4 h-4 mr-2" />
            {t.dashboard.subscriptionList.addNew}
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className={cn(
                "text-left text-sm font-medium text-muted-foreground px-6 py-3",
                language === 'bn' && "font-bangla"
              )}>
                {t.dashboard.subscriptionList.name}
              </th>
              <th className={cn(
                "text-left text-sm font-medium text-muted-foreground px-6 py-3",
                language === 'bn' && "font-bangla"
              )}>
                {t.dashboard.subscriptionList.cost}
              </th>
              <th className={cn(
                "text-left text-sm font-medium text-muted-foreground px-6 py-3 hidden md:table-cell",
                language === 'bn' && "font-bangla"
              )}>
                {t.dashboard.subscriptionList.category}
              </th>
              <th className={cn(
                "text-left text-sm font-medium text-muted-foreground px-6 py-3 hidden sm:table-cell",
                language === 'bn' && "font-bangla"
              )}>
                {t.dashboard.subscriptionList.renewal}
              </th>
              <th className={cn(
                "text-left text-sm font-medium text-muted-foreground px-6 py-3",
                language === 'bn' && "font-bangla"
              )}>
                {t.dashboard.subscriptionList.status}
              </th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => {
              const status = statusConfig[sub.status as keyof typeof statusConfig];
              return (
                <tr key={sub.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                        style={{ backgroundColor: `${sub.color}15` }}
                      >
                        {sub.icon}
                      </div>
                      <span className="font-medium text-foreground">{sub.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-foreground">
                      ${sub.cost.toFixed(2)}
                    </span>
                    <span className={cn(
                      "text-muted-foreground text-sm",
                      language === 'bn' && "font-bangla"
                    )}>
                      {t.common.perMonth}
                    </span>
                  </td>
                  <td className={cn(
                    "px-6 py-4 text-muted-foreground hidden md:table-cell",
                    language === 'bn' && "font-bangla"
                  )}>
                    {language === 'bn' ? sub.categoryBn : sub.category}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell">
                    {new Date(sub.renewalDate).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={cn(status.class, language === 'bn' && "font-bangla")}>
                      {status.label}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
