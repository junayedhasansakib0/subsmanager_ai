import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { authAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, User, Lock, Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();

  // Profile state
  const [name, setName] = useState(user?.name || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Notifications state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [renewalReminders, setRenewalReminders] = useState(true);
  const [expiryAlerts, setExpiryAlerts] = useState(true);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: language === 'bn' ? 'নাম প্রয়োজন' : 'Name is required',
        variant: 'destructive',
      });
      return;
    }

    setIsUpdatingProfile(true);
    try {
      const response = await authAPI.updateProfile({ name: name.trim() });
      updateUser({
        id: user!.id,
        email: user!.email,
        name: response.data.data.user.name,
        isEmailVerified: user!.isEmailVerified,
      });
      toast({
        title: language === 'bn' ? 'সফল' : 'Success',
        description: language === 'bn' ? 'প্রোফাইল আপডেট করা হয়েছে' : 'Profile updated successfully',
      });
    } catch (error: any) {
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: error.response?.data?.message || (language === 'bn' ? 'প্রোফাইল আপডেট করতে ব্যর্থ' : 'Failed to update profile'),
        variant: 'destructive',
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: language === 'bn' ? 'সব ক্ষেত্র পূরণ করুন' : 'Please fill all fields',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: language === 'bn' ? 'নতুন পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে' : 'New password must be at least 8 characters',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: language === 'bn' ? 'পাসওয়ার্ড মিলছে না' : 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    setIsChangingPassword(true);
    try {
      await authAPI.changePassword({ currentPassword, newPassword });
      toast({
        title: language === 'bn' ? 'সফল' : 'Success',
        description: language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন করা হয়েছে' : 'Password changed successfully',
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: error.response?.data?.message || (language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন করতে ব্যর্থ' : 'Failed to change password'),
        variant: 'destructive',
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleNotificationsSave = () => {
    // In a real app, this would save to backend
    toast({
      title: language === 'bn' ? 'সফল' : 'Success',
      description: language === 'bn' ? 'নোটিফিকেশন সেটিংস সংরক্ষণ করা হয়েছে' : 'Notification settings saved',
    });
  };

  return (
    <>
      <div className="mb-8">
        <h1 className={cn(
          "text-3xl font-bold text-foreground mb-2",
          language === 'bn' && "font-bangla"
        )}>
          {language === 'bn' ? 'সেটিংস' : 'Settings'}
        </h1>
        <p className={cn(
          "text-muted-foreground",
          language === 'bn' && "font-bangla"
        )}>
          {language === 'bn' 
            ? 'আপনার অ্যাকাউন্ট সেটিংস পরিচালনা করুন' 
            : 'Manage your account settings and preferences'}
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className={cn(language === 'bn' && "font-bangla")}>
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            {language === 'bn' ? 'প্রোফাইল' : 'Profile'}
          </TabsTrigger>
          <TabsTrigger value="password">
            <Lock className="w-4 h-4 mr-2" />
            {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            {language === 'bn' ? 'নোটিফিকেশন' : 'Notifications'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className={cn(language === 'bn' && "font-bangla")}>
                {language === 'bn' ? 'প্রোফাইল তথ্য' : 'Profile Information'}
              </CardTitle>
              <CardDescription className={cn(language === 'bn' && "font-bangla")}>
                {language === 'bn' 
                  ? 'আপনার নাম এবং ইমেইল ঠিকানা আপডেট করুন' 
                  : 'Update your name and email address'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="name" className={cn(language === 'bn' && "font-bangla")}>
                    {language === 'bn' ? 'নাম' : 'Name'}
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={cn(language === 'bn' && "font-bangla")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className={cn(language === 'bn' && "font-bangla")}>
                    {language === 'bn' ? 'ইমেইল' : 'Email'}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className={cn("bg-muted", language === 'bn' && "font-bangla")}
                  />
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' ? 'ইমেইল পরিবর্তন করা যাবে না' : 'Email cannot be changed'}
                  </p>
                </div>
                <Button type="submit" disabled={isUpdatingProfile} className={cn(language === 'bn' && "font-bangla")}>
                  {isUpdatingProfile ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {language === 'bn' ? 'সংরক্ষণ করা হচ্ছে...' : 'Saving...'}
                    </>
                  ) : (
                    language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Changes'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle className={cn(language === 'bn' && "font-bangla")}>
                {language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন করুন' : 'Change Password'}
              </CardTitle>
              <CardDescription className={cn(language === 'bn' && "font-bangla")}>
                {language === 'bn' 
                  ? 'নিরাপদ থাকার জন্য নিয়মিত আপনার পাসওয়ার্ড আপডেট করুন' 
                  : 'Update your password regularly to keep your account secure'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className={cn(language === 'bn' && "font-bangla")}>
                    {language === 'bn' ? 'বর্তমান পাসওয়ার্ড' : 'Current Password'}
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={cn(language === 'bn' && "font-bangla")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className={cn(language === 'bn' && "font-bangla")}>
                    {language === 'bn' ? 'নতুন পাসওয়ার্ড' : 'New Password'}
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={cn(language === 'bn' && "font-bangla")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className={cn(language === 'bn' && "font-bangla")}>
                    {language === 'bn' ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm New Password'}
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={cn(language === 'bn' && "font-bangla")}
                  />
                </div>
                <Button type="submit" disabled={isChangingPassword} className={cn(language === 'bn' && "font-bangla")}>
                  {isChangingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {language === 'bn' ? 'পরিবর্তন করা হচ্ছে...' : 'Changing...'}
                    </>
                  ) : (
                    language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন করুন' : 'Change Password'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className={cn(language === 'bn' && "font-bangla")}>
                {language === 'bn' ? 'নোটিফিকেশন সেটিংস' : 'Notification Settings'}
              </CardTitle>
              <CardDescription className={cn(language === 'bn' && "font-bangla")}>
                {language === 'bn' 
                  ? 'কোন নোটিফিকেশন পেতে চান তা চয়ন করুন' 
                  : 'Choose what notifications you want to receive'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 max-w-md">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className={cn(language === 'bn' && "font-bangla")}>
                      {language === 'bn' ? 'ইমেইল নোটিফিকেশন' : 'Email Notifications'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'bn' 
                        ? 'ইমেইলের মাধ্যমে নোটিফিকেশন পান' 
                        : 'Receive notifications via email'}
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className={cn(language === 'bn' && "font-bangla")}>
                      {language === 'bn' ? 'রিনিউয়াল রিমাইন্ডার' : 'Renewal Reminders'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'bn' 
                        ? 'সাবস্ক্রিপশন রিনিউয়ালের আগে রিমাইন্ডার পান' 
                        : 'Get reminded before subscription renewals'}
                    </p>
                  </div>
                  <Switch
                    checked={renewalReminders}
                    onCheckedChange={setRenewalReminders}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className={cn(language === 'bn' && "font-bangla")}>
                      {language === 'bn' ? 'মেয়াদ শেষের সতর্কতা' : 'Expiry Alerts'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'bn' 
                        ? 'সাবস্ক্রিপশন মেয়াদ শেষ হওয়ার সময় সতর্কতা পান' 
                        : 'Get alerts when subscriptions are about to expire'}
                    </p>
                  </div>
                  <Switch
                    checked={expiryAlerts}
                    onCheckedChange={setExpiryAlerts}
                  />
                </div>
                <Button onClick={handleNotificationsSave} className={cn(language === 'bn' && "font-bangla")}>
                  {language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SettingsPage;

