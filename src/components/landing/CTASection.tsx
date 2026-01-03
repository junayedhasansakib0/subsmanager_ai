import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CTASection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-[10%] w-2 h-2 bg-white/30 rounded-full animate-bounce-subtle" />
        <div className="absolute top-1/2 right-[15%] w-3 h-3 bg-white/20 rounded-full animate-bounce-subtle" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-[20%] w-2 h-2 bg-white/25 rounded-full animate-bounce-subtle" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary-foreground text-sm mb-6 animate-fade-up">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className={cn(language === 'bn' && "font-bangla")}>AI-Powered</span>
          </div>
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold text-primary-foreground mb-4 animate-fade-up stagger-1",
            language === 'bn' && "font-bangla"
          )}>
            {t.cta.title}
          </h2>
          <p className={cn(
            "text-primary-foreground/80 text-lg mb-8 animate-fade-up stagger-2",
            language === 'bn' && "font-bangla"
          )}>
            {t.cta.subtitle}
          </p>
          <Link to="/register" className="animate-fade-up stagger-3 inline-block">
            <Button 
              size="xl" 
              className={cn(
                "bg-background text-foreground hover:bg-background/90 hover:scale-105 transition-all duration-300 shadow-xl",
                language === 'bn' && "font-bangla"
              )}
            >
              {t.cta.button}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
