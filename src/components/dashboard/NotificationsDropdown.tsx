import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock notifications - in a real app, this would come from an API
const mockNotifications = [
  {
    id: '1',
    title: 'Subscription Renewal',
    message: 'Netflix subscription renews in 3 days',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    title: 'New Subscription Added',
    message: 'Spotify subscription has been added',
    time: '1 day ago',
    read: false,
  },
  {
    id: '3',
    title: 'Monthly Report',
    message: 'Your monthly spending report is ready',
    time: '2 days ago',
    read: true,
  },
];

export function NotificationsDropdown() {
  const { language } = useLanguage();
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className={cn(language === 'bn' && "font-bangla")}>
          {language === 'bn' ? 'নোটিফিকেশন' : 'Notifications'}
          {unreadCount > 0 && (
            <span className="ml-2 text-xs text-muted-foreground">
              ({unreadCount} {language === 'bn' ? 'অপঠিত' : 'unread'})
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {mockNotifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {language === 'bn' ? 'কোনো নোটিফিকেশন নেই' : 'No notifications'}
            </div>
          ) : (
            <div className="py-1">
              {mockNotifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    "flex flex-col items-start p-3 cursor-pointer",
                    !notification.read && "bg-muted/50"
                  )}
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm font-medium",
                        !notification.read && "font-semibold",
                        language === 'bn' && "font-bangla"
                      )}>
                        {notification.title}
                      </p>
                      <p className={cn(
                        "text-xs text-muted-foreground mt-1",
                        language === 'bn' && "font-bangla"
                      )}>
                        {notification.message}
                      </p>
                      <p className={cn(
                        "text-xs text-muted-foreground mt-1",
                        language === 'bn' && "font-bangla"
                      )}>
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={cn("cursor-pointer", language === 'bn' && "font-bangla")}>
          {language === 'bn' ? 'সমস্ত নোটিফিকেশন দেখুন' : 'View all notifications'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

