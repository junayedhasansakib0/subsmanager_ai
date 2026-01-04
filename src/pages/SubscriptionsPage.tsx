import { useLanguage } from '@/contexts/LanguageContext';
import { SubscriptionList } from '@/components/dashboard/SubscriptionList';
import { cn } from '@/lib/utils';

const SubscriptionsPage = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <div className="mb-8">
        <h1 className={cn(
          "text-3xl font-bold text-foreground mb-2",
          language === 'bn' && "font-bangla"
        )}>
          {t.dashboard.subscriptionList.title}
        </h1>
        <p className={cn(
          "text-muted-foreground",
          language === 'bn' && "font-bangla"
        )}>
          {language === 'bn' 
            ? 'আপনার সমস্ত সাবস্ক্রিপশন পরিচালনা করুন' 
            : 'Manage all your subscriptions in one place'}
        </p>
      </div>
      <SubscriptionList />
    </>
  );
};

export default SubscriptionsPage;

