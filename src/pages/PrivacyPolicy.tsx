import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const PrivacyPolicy = () => {
  const { language } = useLanguage();
  const isBengali = language === "bn";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/">
          <Button
            variant="ghost"
            className={cn("mb-6", isBengali && "font-bangla")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isBengali ? "হোমে ফিরুন" : "Back to Home"}
          </Button>
        </Link>

        <h1
          className={cn("text-4xl font-bold mb-8", isBengali && "font-bangla")}
        >
          {isBengali ? "গোপনীয়তা নীতি" : "Privacy Policy"}
        </h1>

        <div
          className={cn(
            "space-y-6 text-muted-foreground",
            isBengali && "font-bangla"
          )}
        >
          <section>
            <h2
              className={cn(
                "text-2xl font-semibold text-foreground mb-4",
                isBengali && "font-bangla"
              )}
            >
              {isBengali ? "১. পরিচিতি" : "1. Introduction"}
            </h2>
            <p>
              {isBengali
                ? 'SubsManager AI ("আমরা", "আমাদের", বা "সেবা") আপনার গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতিটি ব্যাখ্যা করে যে আমরা কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার, এবং সুরক্ষা করি।'
                : 'SubsManager AI ("we", "our", or "Service") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.'}
            </p>
          </section>

          <section>
            <h2
              className={cn(
                "text-2xl font-semibold text-foreground mb-4",
                isBengali && "font-bangla"
              )}
            >
              {isBengali ? "২. তথ্য সংগ্রহ" : "2. Information We Collect"}
            </h2>
            <p className="mb-4">
              {isBengali
                ? "আমরা নিম্নলিখিত তথ্য সংগ্রহ করি:"
                : "We collect the following information:"}
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                {isBengali
                  ? "ব্যক্তিগত তথ্য: নাম, ইমেইল ঠিকানা"
                  : "Personal Information: Name, email address"}
              </li>
              <li>
                {isBengali
                  ? "সাবস্ক্রিপশন তথ্য: পরিষেবার নাম, খরচ, রিনিউয়াল তারিখ"
                  : "Subscription Information: Service names, costs, renewal dates"}
              </li>
              <li>
                {isBengali
                  ? "ব্যবহারের তথ্য: কীভাবে আপনি আমাদের সেবা ব্যবহার করেন"
                  : "Usage Information: How you use our service"}
              </li>
              <li>
                {isBengali
                  ? "প্রযুক্তিগত তথ্য: IP ঠিকানা, ব্রাউজার ধরন, ডিভাইস তথ্য"
                  : "Technical Information: IP address, browser type, device information"}
              </li>
            </ul>
          </section>

          <section>
            <h2
              className={cn(
                "text-2xl font-semibold text-foreground mb-4",
                isBengali && "font-bangla"
              )}
            >
              {isBengali ? "৩. তথ্য ব্যবহার" : "3. How We Use Your Information"}
            </h2>
            <p className="mb-4">
              {isBengali
                ? "আমরা আপনার তথ্য নিম্নলিখিত উদ্দেশ্যে ব্যবহার করি:"
                : "We use your information for the following purposes:"}
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                {isBengali
                  ? "সেবা প্রদান ও উন্নতি"
                  : "To provide and improve our service"}
              </li>
              <li>
                {isBengali
                  ? "রিনিউয়াল রিমাইন্ডার পাঠানো"
                  : "To send renewal reminders"}
              </li>
              <li>
                {isBengali ? "অ্যাকাউন্ট নিরাপত্তা" : "To secure your account"}
              </li>
              <li>
                {isBengali
                  ? "গ্রাহক সহায়তা প্রদান"
                  : "To provide customer support"}
              </li>
              <li>
                {isBengali
                  ? "আইনি প্রয়োজনীয়তা পূরণ"
                  : "To comply with legal requirements"}
              </li>
            </ul>
          </section>

          <section>
            <h2
              className={cn(
                "text-2xl font-semibold text-foreground mb-4",
                isBengali && "font-bangla"
              )}
            >
              {isBengali ? "৪. তথ্য শেয়ারিং" : "4. Information Sharing"}
            </h2>
            <p>
              {isBengali
                ? "আমরা আপনার ব্যক্তিগত তথ্য তৃতীয় পক্ষের সাথে বিক্রি, বাণিজ্য, বা স্থানান্তর করি না।"
                : "We do not sell, trade, or transfer your personal information to third parties."}
            </p>
          </section>

          <section className="pt-6 border-t">
            <p className="text-sm">
              {isBengali
                ? "সর্বশেষ আপডেট: জানুয়ারি ২০২৬"
                : "Last updated: January 2026"}
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
