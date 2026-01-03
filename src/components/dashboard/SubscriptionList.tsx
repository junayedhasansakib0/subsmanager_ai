import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { subscriptionAPI } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Plus, Filter, Loader2, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SubscriptionForm } from './SubscriptionForm';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Subscription {
  id: string;
  name: string;
  cost: number;
  currency: string;
  category: string;
  categoryBn: string;
  renewalDate: string;
  status: 'active' | 'expired' | 'expiring';
  icon: string;
  color: string;
}

export function SubscriptionList() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<Subscription | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus, filterCategory]);

  useEffect(() => {
    // Debounce search query
    const timer = setTimeout(() => {
      if (searchQuery || filterStatus !== 'all' || filterCategory !== 'all') {
        loadSubscriptions();
      }
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const loadSubscriptions = async () => {
    setIsLoading(true);
    try {
      const params: any = { limit: 100 };
      if (filterStatus !== 'all') params.status = filterStatus;
      if (filterCategory !== 'all') params.category = filterCategory;
      if (searchQuery) params.search = searchQuery;

      const response = await subscriptionAPI.getAll(params);
      setSubscriptions(response.data.data.subscriptions);
    } catch (error) {
      console.error('Failed to load subscriptions:', error);
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: language === 'bn' ? 'সাবস্ক্রিপশন লোড করতে ব্যর্থ।' : 'Failed to load subscriptions.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingSubscription(null);
    setIsFormOpen(true);
  };

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setIsFormOpen(true);
  };

  const handleDelete = (subscription: Subscription) => {
    setSubscriptionToDelete(subscription);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!subscriptionToDelete) return;

    try {
      await subscriptionAPI.delete(subscriptionToDelete.id);
      toast({
        title: language === 'bn' ? 'সফল' : 'Success',
        description: language === 'bn' ? 'সাবস্ক্রিপশন মুছে ফেলা হয়েছে।' : 'Subscription deleted successfully.',
      });
      setDeleteDialogOpen(false);
      setSubscriptionToDelete(null);
      loadSubscriptions();
      // Trigger dashboard refresh
      const event = new CustomEvent('dashboard-refresh');
      window.dispatchEvent(event);
    } catch (error: any) {
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: error.response?.data?.message || (language === 'bn' ? 'মুছে ফেলতে ব্যর্থ।' : 'Failed to delete.'),
        variant: 'destructive',
      });
    }
  };

  const handleFormSuccess = () => {
    loadSubscriptions();
    toast({
      title: language === 'bn' ? 'সফল' : 'Success',
      description: language === 'bn' ? 'সাবস্ক্রিপশন সংরক্ষণ করা হয়েছে।' : 'Subscription saved successfully.',
    });
    // Trigger dashboard refresh
    const event = new CustomEvent('dashboard-refresh');
    window.dispatchEvent(event);
  };

  const categories = Array.from(new Set(subscriptions.map(s => s.category)));

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
          <Select value={filterStatus} onValueChange={(value) => { setFilterStatus(value); }}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={language === 'bn' ? 'স্ট্যাটাস' : 'Status'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? 'সব' : 'All'}</SelectItem>
              <SelectItem value="active">{language === 'bn' ? 'সক্রিয়' : 'Active'}</SelectItem>
              <SelectItem value="expiring">{language === 'bn' ? 'মেয়াদ শেষ' : 'Expiring'}</SelectItem>
              <SelectItem value="expired">{language === 'bn' ? 'মেয়াদ শেষ' : 'Expired'}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={(value) => { setFilterCategory(value); }}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={language === 'bn' ? 'ক্যাটাগরি' : 'Category'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? 'সব' : 'All'}</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder={language === 'bn' ? 'খুঁজুন...' : 'Search...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-40"
          />
          {(filterStatus !== 'all' || filterCategory !== 'all' || searchQuery) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFilterStatus('all');
                setFilterCategory('all');
                setSearchQuery('');
              }}
              className={cn(language === 'bn' && "font-bangla")}
            >
              {language === 'bn' ? 'রিসেট' : 'Reset'}
            </Button>
          )}
          <Button size="sm" onClick={handleAdd} className={cn(language === 'bn' && "font-bangla")}>
            <Plus className="w-4 h-4 mr-2" />
            {t.dashboard.subscriptionList.addNew}
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : subscriptions.length === 0 ? (
          <div className={cn(
            "text-center py-12 text-muted-foreground",
            language === 'bn' && "font-bangla"
          )}>
            {language === 'bn' ? 'কোনো সাবস্ক্রিপশন নেই' : 'No subscriptions yet'}
          </div>
        ) : (
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(sub)} className={cn(language === 'bn' && "font-bangla")}>
                          <Edit className="w-4 h-4 mr-2" />
                          {language === 'bn' ? 'সম্পাদনা' : 'Edit'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(sub)} 
                          className={cn("text-destructive", language === 'bn' && "font-bangla")}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          {language === 'bn' ? 'মুছে ফেলুন' : 'Delete'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Form Dialog */}
      <SubscriptionForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        subscription={editingSubscription}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className={cn(language === 'bn' && "font-bangla")}>
          <DialogHeader>
            <DialogTitle className={cn(language === 'bn' && "font-bangla")}>
              {language === 'bn' ? 'সাবস্ক্রিপশন মুছে ফেলুন' : 'Delete Subscription'}
            </DialogTitle>
            <DialogDescription className={cn(language === 'bn' && "font-bangla")}>
              {language === 'bn' 
                ? `আপনি কি "${subscriptionToDelete?.name}" মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।`
                : `Are you sure you want to delete "${subscriptionToDelete?.name}"? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className={cn(language === 'bn' && "font-bangla")}
            >
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className={cn(language === 'bn' && "font-bangla")}
            >
              {language === 'bn' ? 'মুছে ফেলুন' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
