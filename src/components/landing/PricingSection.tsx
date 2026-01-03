import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PricingSection() {
  const { t, language } = useLanguage();

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fade-up",
            language === 'bn' && "font-bangla"
          )}>
            {t.pricing.title}{' '}
            <span className="text-gradient">{t.pricing.titleHighlight}</span>
          </h2>
          <p className={cn(
            "text-lg text-muted-foreground animate-fade-up stagger-1",
            language === 'bn' && "font-bangla"
          )}>
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 hover-lift animate-fade-up stagger-2">
            <div className="text-center mb-8">
              <h3 className={cn(
                "text-xl font-semibold text-foreground mb-2",
                language === 'bn' && "font-bangla"
              )}>
                {t.pricing.free.name}
              </h3>
              <p className={cn(
                "text-sm text-muted-foreground mb-4",
                language === 'bn' && "font-bangla"
              )}>
                {t.pricing.free.description}
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className={cn(
                  "text-4xl font-bold text-foreground",
                  language === 'bn' && "font-bangla"
                )}>
                  {t.pricing.free.price}
                </span>
                <span className={cn(
                  "text-muted-foreground text-sm",
                  language === 'bn' && "font-bangla"
                )}>
                  /{t.pricing.free.period}
                </span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {t.pricing.free.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className={cn(
                    "text-sm text-muted-foreground",
                    language === 'bn' && "font-bangla"
                  )}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link to="/register">
              <Button variant="outline" className={cn("w-full", language === 'bn' && "font-bangla")} size="lg">
                {t.pricing.free.cta}
              </Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="relative p-8 rounded-2xl bg-card border-2 border-primary shadow-lg shadow-primary/10 hover-lift animate-fade-up stagger-3">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20 animate-glow" />
            
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <span className={cn(
                "inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium",
                language === 'bn' && "font-bangla"
              )}>
                <Zap className="w-3.5 h-3.5" />
                {t.pricing.pro.popular}
              </span>
            </div>

            <div className="relative text-center mb-8">
              <h3 className={cn(
                "text-xl font-semibold text-foreground mb-2",
                language === 'bn' && "font-bangla"
              )}>
                {t.pricing.pro.name}
              </h3>
              <p className={cn(
                "text-sm text-muted-foreground mb-4",
                language === 'bn' && "font-bangla"
              )}>
                {t.pricing.pro.description}
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className={cn(
                  "text-4xl font-bold text-foreground",
                  language === 'bn' && "font-bangla"
                )}>
                  {t.pricing.pro.price}
                </span>
                <span className={cn(
                  "text-muted-foreground text-sm",
                  language === 'bn' && "font-bangla"
                )}>
                  /{t.pricing.pro.period}
                </span>
              </div>
            </div>

            <ul className="relative space-y-4 mb-8">
              {t.pricing.pro.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className={cn(
                    "text-sm text-muted-foreground",
                    language === 'bn' && "font-bangla"
                  )}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link to="/register" className="relative block">
              <Button className={cn("w-full ai-glow", language === 'bn' && "font-bangla")} size="lg">
                {t.pricing.pro.cta}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
