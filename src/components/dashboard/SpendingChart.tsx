import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface SpendingChartProps {
  data?: Array<{ month: string; monthBn: string; amount: number }>;
}

export function SpendingChart({ data }: SpendingChartProps) {
  const { t, language } = useLanguage();

  const chartData = (data || []).map((item) => ({
    ...item,
    name: language === 'bn' ? item.monthBn : item.month,
  }));

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="mb-6">
        <h3 className={cn(
          "text-lg font-semibold text-foreground",
          language === 'bn' && "font-bangla"
        )}>
          {t.dashboard.analytics.title}
        </h3>
        <p className={cn(
          "text-sm text-muted-foreground",
          language === 'bn' && "font-bangla"
        )}>
          {t.dashboard.analytics.subtitle}
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(234 89% 58%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(234 89% 58%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-md)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number) => [`$${value}`, language === 'bn' ? 'খরচ' : 'Spending']}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="hsl(234 89% 58%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAmount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
