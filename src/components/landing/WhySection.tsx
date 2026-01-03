import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, TrendingDown, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WhySection() {
  const { t, language } = useLanguage();

  const problems = [
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: t.why.problems[0].title,
      description: t.why.problems[0].description,
    },
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: t.why.problems[1].title,
      description: t.why.problems[1].description,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t.why.problems[2].title,
      description: t.why.problems[2].description,
    },
  ];

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-destructive/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-up",
            language === 'bn' && "font-bangla"
          )}>
            {t.why.title}{' '}
            <span className="text-gradient">{t.why.titleHighlight}</span>
          </h2>
          <p className={cn(
            "text-muted-foreground text-lg animate-fade-up stagger-1",
            language === 'bn' && "font-bangla"
          )}>
            {t.why.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={cn(
                "p-6 rounded-2xl bg-destructive/5 border border-destructive/20 text-center hover-lift animate-fade-up",
                `stagger-${index + 1}`
              )}
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                {problem.icon}
              </div>
              <h3 className={cn(
                "font-semibold text-foreground mb-2",
                language === 'bn' && "font-bangla"
              )}>
                {problem.title}
              </h3>
              <p className={cn(
                "text-sm text-muted-foreground",
                language === 'bn' && "font-bangla"
              )}>
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center hover-lift animate-fade-up stagger-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className={cn(
              "font-semibold text-foreground mb-2 text-lg",
              language === 'bn' && "font-bangla"
            )}>
              {t.why.solution.title}
            </h3>
            <p className={cn(
              "text-muted-foreground",
              language === 'bn' && "font-bangla"
            )}>
              {t.why.solution.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
