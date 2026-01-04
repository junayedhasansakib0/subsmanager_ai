import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardAPI } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#43e97b', '#fa709a', '#fee140'];

const AnalyticsPage = () => {
  const { t, language } = useLanguage();
  const [monthlySpending, setMonthlySpending] = useState<any[]>([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      const [monthlyRes, categoryRes] = await Promise.all([
        dashboardAPI.getMonthlySpending(12),
        dashboardAPI.getCategoryBreakdown(),
      ]);
      setMonthlySpending(monthlyRes.data.data.monthlySpending || []);
      setCategoryBreakdown(categoryRes.data.data.categoryBreakdown || []);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const monthlyChartData = monthlySpending.map((item) => ({
    ...item,
    name: language === 'bn' ? item.monthBn : item.month,
  }));

  const categoryChartData = categoryBreakdown.map((item) => ({
    ...item,
    name: language === 'bn' ? item.nameBn : item.name,
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className={cn(
          "text-3xl font-bold text-foreground mb-2",
          language === 'bn' && "font-bangla"
        )}>
          {language === 'bn' ? 'বিশ্লেষণ' : 'Analytics'}
        </h1>
        <p className={cn(
          "text-muted-foreground",
          language === 'bn' && "font-bangla"
        )}>
          {language === 'bn' 
            ? 'আপনার সাবস্ক্রিপশন খরচের গভীর বিশ্লেষণ দেখুন' 
            : 'Deep insights into your subscription spending'}
        </p>
      </div>

      {/* Monthly Spending Chart */}
      <div className="bg-card rounded-2xl border border-border p-6 mb-6">
        <h3 className={cn(
          "text-lg font-semibold text-foreground mb-6",
          language === 'bn' && "font-bangla"
        )}>
          {language === 'bn' ? 'মাসিক খরচ (১২ মাস)' : 'Monthly Spending (12 Months)'}
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(234 89% 58%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(234 89% 58%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(234 89% 58%)"
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown - Bar Chart */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className={cn(
            "text-lg font-semibold text-foreground mb-6",
            language === 'bn' && "font-bangla"
          )}>
            {language === 'bn' ? 'ক্যাটাগরি অনুযায়ী খরচ' : 'Spending by Category'}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="amount" fill="hsl(234 89% 58%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown - Pie Chart */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className={cn(
            "text-lg font-semibold text-foreground mb-6",
            language === 'bn' && "font-bangla"
          )}>
            {language === 'bn' ? 'ক্যাটাগরি ভাগ' : 'Category Distribution'}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Details Table */}
      {categoryBreakdown.length > 0 && (
        <div className="bg-card rounded-2xl border border-border p-6 mt-6">
          <h3 className={cn(
            "text-lg font-semibold text-foreground mb-6",
            language === 'bn' && "font-bangla"
          )}>
            {language === 'bn' ? 'ক্যাটাগরি বিশদ' : 'Category Details'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className={cn(
                    "text-left py-3 px-4 font-medium text-muted-foreground",
                    language === 'bn' && "font-bangla"
                  )}>
                    {language === 'bn' ? 'ক্যাটাগরি' : 'Category'}
                  </th>
                  <th className={cn(
                    "text-right py-3 px-4 font-medium text-muted-foreground",
                    language === 'bn' && "font-bangla"
                  )}>
                    {language === 'bn' ? 'মাসিক খরচ' : 'Monthly Cost'}
                  </th>
                  <th className={cn(
                    "text-right py-3 px-4 font-medium text-muted-foreground",
                    language === 'bn' && "font-bangla"
                  )}>
                    {language === 'bn' ? 'শতাংশ' : 'Percentage'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoryChartData.map((item, index) => (
                  <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4 text-right">${item.amount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right">{item.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AnalyticsPage;

