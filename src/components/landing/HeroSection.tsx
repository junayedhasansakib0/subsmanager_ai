import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bell, Calendar, PieChart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { t, language } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-hero overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-glow" />

        {/* Floating orbs */}
        <div className="absolute top-20 right-[20%] w-3 h-3 bg-primary rounded-full animate-bounce-subtle opacity-60" />
        <div
          className="absolute top-40 left-[15%] w-2 h-2 bg-accent rounded-full animate-bounce-subtle opacity-60"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-40 right-[30%] w-4 h-4 bg-primary/60 rounded-full animate-bounce-subtle"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-up border border-primary/20",
              language === "bn" && "font-bangla"
            )}
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            {t.hero.badge}
          </div>

          {/* Headline */}
          <h1
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up stagger-1",
              language === "bn" && "font-bangla"
            )}
          >
            {t.hero.title}{" "}
            <span className="text-gradient animate-gradient bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto]">
              {t.hero.titleHighlight}
            </span>
            {t.hero.titleEnd && ` ${t.hero.titleEnd}`}
          </h1>

          {/* Description */}
          <p
            className={cn(
              "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up stagger-2",
              language === "bn" && "font-bangla"
            )}
          >
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up stagger-3">
            <Link to="/register">
              <Button
                variant="hero"
                size="xl"
                className={cn("ai-glow", language === "bn" && "font-bangla")}
              >
                {t.hero.cta}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 max-w-5xl mx-auto animate-fade-up stagger-4">
          <div className="relative hover-lift">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-50 animate-glow" />
            <div className="relative bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
                <div className="flex-1 mx-4">
                  <div className="h-6 bg-secondary rounded-lg max-w-md mx-auto" />
                </div>
              </div>

              {/* Mock dashboard content */}
              <div className="p-6 bg-background">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    {
                      icon: <Calendar className="w-5 h-5 text-primary" />,
                      label: "12",
                      sublabel: "Subscriptions",
                    },
                    {
                      icon: <Bell className="w-5 h-5 text-warning" />,
                      label: "3",
                      sublabel: "Renewals Soon",
                    },
                    {
                      icon: <PieChart className="w-5 h-5 text-accent" />,
                      label: "$214",
                      sublabel: "Monthly Cost",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          {stat.icon}
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {stat.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {stat.sublabel}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="h-32 rounded-xl bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 border border-border/50 animate-shimmer"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.05), transparent)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
