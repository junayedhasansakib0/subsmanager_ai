import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-up",
            language === 'bn' && "font-bangla"
          )}>
            {t.faq.title}{' '}
            <span className="text-gradient">{t.faq.titleHighlight}</span>
          </h2>
          <p className={cn(
            "text-muted-foreground text-lg animate-fade-up stagger-1",
            language === 'bn' && "font-bangla"
          )}>
            {t.faq.subtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {t.faq.items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={cn(
                  "bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md data-[state=open]:border-primary/30 transition-all duration-300 animate-fade-up",
                  `stagger-${index + 2}`
                )}
              >
                <AccordionTrigger className={cn(
                  "text-left font-medium text-foreground hover:no-underline py-4 hover:text-primary transition-colors",
                  language === 'bn' && "font-bangla"
                )}>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className={cn(
                  "text-muted-foreground pb-4",
                  language === 'bn' && "font-bangla"
                )}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
