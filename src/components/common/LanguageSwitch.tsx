import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LanguageSwitch({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={cn("flex items-center rounded-lg bg-secondary p-1", className)}
    >
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
          language === "en"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("bn")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 font-bangla",
          language === "bn"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        বাং
      </button>
    </div>
  );
}
