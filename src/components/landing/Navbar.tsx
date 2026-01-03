import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitch } from '@/components/common/LanguageSwitch';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Menu, X, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:shadow-glow group-hover:scale-105 transition-all duration-300">
              <Layers className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className={cn(
              "font-bold text-xl text-foreground",
              language === 'bn' && "font-bangla"
            )}>
              {t.brand}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className={cn(
              "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
              language === 'bn' && "font-bangla"
            )}>
              {t.nav.features}
            </a>
            <a href="#pricing" className={cn(
              "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
              language === 'bn' && "font-bangla"
            )}>
              {t.nav.pricing}
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitch />
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm" className={cn(language === 'bn' && "font-bangla")}>
                {t.nav.login}
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="default" size="sm" className={cn(language === 'bn' && "font-bangla")}>
                {t.nav.getStarted}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                className={cn(
                  "text-sm font-medium text-muted-foreground hover:text-foreground py-2",
                  language === 'bn' && "font-bangla"
                )}
                onClick={() => setIsOpen(false)}
              >
                {t.nav.features}
              </a>
              <a
                href="#pricing"
                className={cn(
                  "text-sm font-medium text-muted-foreground hover:text-foreground py-2",
                  language === 'bn' && "font-bangla"
                )}
                onClick={() => setIsOpen(false)}
              >
                {t.nav.pricing}
              </a>
              
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <LanguageSwitch />
                <ThemeToggle />
              </div>
              
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className={cn("w-full", language === 'bn' && "font-bangla")}>
                    {t.nav.login}
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className={cn("w-full", language === 'bn' && "font-bangla")}>
                    {t.nav.getStarted}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
