import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitch } from "@/components/common/LanguageSwitch";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-up">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Layers className="w-6 h-6 text-primary-foreground" />
              </div>
              <span
                className={cn(
                  "font-bold text-2xl text-foreground",
                  language === "bn" && "font-bangla"
                )}
              >
                {t.brand}
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSwitch />
              <ThemeToggle />
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1
              className={cn(
                "text-3xl font-bold text-foreground mb-2",
                language === "bn" && "font-bangla"
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                "text-muted-foreground",
                language === "bn" && "font-bangla"
              )}
            >
              {subtitle}
            </p>
          </div>

          {/* Form */}
          {children}
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-md text-primary-foreground">
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/20 flex items-center justify-center">
            <Layers className="w-10 h-10" />
          </div>
          <h2
            className={cn(
              "text-3xl font-bold mb-6",
              language === "bn" && "font-bangla"
            )}
          >
            {t.tagline}
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            {t.hero.description}
          </p>
        </div>
      </div>
    </div>
  );
}
