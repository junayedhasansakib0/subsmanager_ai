import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-sidebar text-sidebar-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Layers className="w-4 h-4 text-sidebar-primary-foreground" />
            </div>
            <span className={cn(
              "font-bold text-lg",
              language === 'bn' && "font-bangla"
            )}>
              {t.brand}
            </span>
          </Link>

          {/* Copyright */}
          <p className={cn(
            "text-sm text-sidebar-foreground/60",
            language === 'bn' && "font-bangla"
          )}>
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
