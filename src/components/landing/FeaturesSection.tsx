import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Bell, BarChart3, Layers, FolderOpen, Globe, Shield } from 'lucide-react';

const icons = [Bell, BarChart3, Layers, FolderOpen, Globe, Shield];

export function FeaturesSection() {
  const { t, language } = useLanguage();

  return (
    <section id="features" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fade-up",
            language === 'bn' && "font-bangla"
          )}>
            {t.features.title}{' '}
            <span className="text-gradient">{t.features.titleHighlight}</span>
          </h2>
          <p className={cn(
            "text-lg text-muted-foreground animate-fade-up stagger-1",
            language === 'bn' && "font-bangla"
          )}>
            {t.features.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((feature, index) => {
            const IconComponent = icons[index];
            return (
              <div
                key={index}
                className={cn(
                  "group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover-lift animate-fade-up",
                  `stagger-${index + 1}`
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className={cn(
                  "text-xl font-semibold text-foreground mb-3",
                  language === 'bn' && "font-bangla"
                )}>
                  {feature.title}
                </h3>
                <p className={cn(
                  "text-muted-foreground leading-relaxed",
                  language === 'bn' && "font-bangla"
                )}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
