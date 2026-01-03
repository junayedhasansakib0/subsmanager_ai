/**
 * Subscription Form Component
 * For adding and editing subscriptions
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface Subscription {
  id?: string;
  name: string;
  cost: number;
  currency: string;
  category: string;
  categoryBn?: string;
  renewalDate: string;
  icon?: string;
  color?: string;
}

interface SubscriptionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription?: Subscription | null;
  onSuccess: () => void;
}

const categories = [
  { name: 'Entertainment', nameBn: 'বিনোদন', icon: '🎬' },
  { name: 'Productivity', nameBn: 'উৎপাদনশীলতা', icon: '💼' },
  { name: 'Hosting', nameBn: 'হোস্টিং', icon: '☁️' },
  { name: 'Education', nameBn: 'শিক্ষা', icon: '📚' },
  { name: 'Development', nameBn: 'ডেভেলপমেন্ট', icon: '💻' },
  { name: 'Design', nameBn: 'ডিজাইন', icon: '🎨' },
  { name: 'Music', nameBn: 'সঙ্গীত', icon: '🎵' },
  { name: 'Gaming', nameBn: 'গেমিং', icon: '🎮' },
  { name: 'News', nameBn: 'খবর', icon: '📰' },
  { name: 'Other', nameBn: 'অন্যান্য', icon: '📦' },
];

const colors = [
  '#E50914', '#1DB954', '#FF0000', '#FF9900', '#0056D2',
  '#333333', '#F24E1E', '#4285F4', '#667eea', '#764ba2'
];

export function SubscriptionForm({ open, onOpenChange, subscription, onSuccess }: SubscriptionFormProps) {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Subscription>>({
    name: '',
    cost: 0,
    currency: 'USD',
    category: '',
    categoryBn: '',
    renewalDate: '',
    icon: '📦',
    color: '#667eea',
  });

  useEffect(() => {
    if (subscription) {
      setFormData({
        name: subscription.name,
        cost: subscription.cost,
        currency: subscription.currency,
        category: subscription.category,
        categoryBn: subscription.categoryBn || subscription.category,
        renewalDate: subscription.renewalDate,
        icon: subscription.icon || '📦',
        color: subscription.color || '#667eea',
      });
    } else {
      setFormData({
        name: '',
        cost: 0,
        currency: 'USD',
        category: '',
        categoryBn: '',
        renewalDate: '',
        icon: '📦',
        color: '#667eea',
      });
    }
  }, [subscription, open]);

  const handleCategoryChange = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    setFormData({
      ...formData,
      category: categoryName,
      categoryBn: category?.nameBn || categoryName,
      icon: category?.icon || '📦',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { subscriptionAPI } = await import('@/lib/api');
      
      const submitData = {
        name: formData.name!,
        cost: parseFloat(formData.cost as any),
        currency: formData.currency || 'USD',
        category: formData.category!,
        categoryBn: formData.categoryBn || formData.category!,
        renewalDate: formData.renewalDate!,
        icon: formData.icon || '📦',
        color: formData.color || '#667eea',
      };

      if (subscription?.id) {
        // Update
        await subscriptionAPI.update(subscription.id, submitData);
      } else {
        // Create
        await subscriptionAPI.create(submitData);
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Failed to save subscription:', error);
      alert(error.response?.data?.message || 'Failed to save subscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("max-w-md", language === 'bn' && "font-bangla")}>
        <DialogHeader>
          <DialogTitle className={cn(language === 'bn' && "font-bangla")}>
            {subscription ? (language === 'bn' ? 'সাবস্ক্রিপশন সম্পাদনা করুন' : 'Edit Subscription') : (language === 'bn' ? 'নতুন সাবস্ক্রিপশন যোগ করুন' : 'Add New Subscription')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className={cn(language === 'bn' && "font-bangla")}>
              {language === 'bn' ? 'নাম' : 'Name'}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={language === 'bn' ? 'Netflix, Spotify...' : 'Netflix, Spotify...'}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost" className={cn(language === 'bn' && "font-bangla")}>
                {language === 'bn' ? 'খরচ' : 'Cost'}
              </Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                min="0"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency" className={cn(language === 'bn' && "font-bangla")}>
                {language === 'bn' ? 'মুদ্রা' : 'Currency'}
              </Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="BDT">BDT</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className={cn(language === 'bn' && "font-bangla")}>
              {language === 'bn' ? 'ক্যাটাগরি' : 'Category'}
            </Label>
            <Select value={formData.category} onValueChange={handleCategoryChange} required>
              <SelectTrigger>
                <SelectValue placeholder={language === 'bn' ? 'ক্যাটাগরি নির্বাচন করুন' : 'Select category'} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    {cat.icon} {language === 'bn' ? cat.nameBn : cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="renewalDate" className={cn(language === 'bn' && "font-bangla")}>
              {language === 'bn' ? 'নবায়নের তারিখ' : 'Renewal Date'}
            </Label>
            <Input
              id="renewalDate"
              type="date"
              value={formData.renewalDate}
              onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color" className={cn(language === 'bn' && "font-bangla")}>
              {language === 'bn' ? 'রঙ' : 'Color'}
            </Label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={cn(
                    "w-10 h-10 rounded-full border-2 transition-all",
                    formData.color === color ? "border-foreground scale-110" : "border-border"
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData({ ...formData, color })}
                />
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className={cn(language === 'bn' && "font-bangla")}
            >
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={isLoading} className={cn(language === 'bn' && "font-bangla")}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {language === 'bn' ? 'সংরক্ষণ করা হচ্ছে...' : 'Saving...'}
                </>
              ) : (
                language === 'bn' ? 'সংরক্ষণ করুন' : 'Save'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

