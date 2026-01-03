import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitch } from '@/components/common/LanguageSwitch';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Layers, Mail, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const VerifyEmail = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md text-center animate-fade-up">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Layers className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className={cn(
              "font-bold text-2xl text-foreground",
              language === 'bn' && "font-bangla"
            )}>
              {t.brand}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </div>

        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="w-10 h-10 text-primary" />
        </div>

        {/* Content */}
        <h1 className={cn(
          "text-3xl font-bold text-foreground mb-4",
          language === 'bn' && "font-bangla"
        )}>
          {t.auth.verify.title}
        </h1>
        <p className={cn(
          "text-muted-foreground mb-8 max-w-sm mx-auto",
          language === 'bn' && "font-bangla"
        )}>
          {t.auth.verify.description}
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <Link to="/dashboard">
            <Button size="lg" className={cn("w-full", language === 'bn' && "font-bangla")}>
              {t.auth.verify.continue}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="lg" className={cn("w-full", language === 'bn' && "font-bangla")}>
            {t.auth.verify.resend}
          </Button>
        </div>

        {/* Help text */}
        <p className={cn(
          "text-sm text-muted-foreground mt-8",
          language === 'bn' && "font-bangla"
        )}>
          {t.auth.verify.spam}{' '}
          <a href="#" className="text-primary hover:underline">
            {t.auth.verify.spamLink}
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
