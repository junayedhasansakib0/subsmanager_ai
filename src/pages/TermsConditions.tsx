import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

const TermsConditions = () => {
  const { language } = useLanguage();
  const isBengali = language === 'bn';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className={cn("mb-6", isBengali && "font-bangla")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isBengali ? 'হোমে ফিরুন' : 'Back to Home'}
          </Button>
        </Link>
      <h1 className={cn(
        "text-4xl font-bold mb-8",
        isBengali && "font-bangla"
      )}>
        {isBengali ? 'ব্যবহারের শর্তাবলী' : 'Terms and Conditions'}
      </h1>
      
      <div className={cn("space-y-6 text-muted-foreground", isBengali && "font-bangla")}>
        <section>
          <h2 className={cn("text-2xl font-semibold text-foreground mb-4", isBengali && "font-bangla")}>
            {isBengali ? '১. গ্রহণ' : '1. Acceptance of Terms'}
          </h2>
          <p>
            {isBengali 
              ? 'SubsManager AI ("সেবা") ব্যবহার করে, আপনি এই শর্তাবলীতে সম্মত হচ্ছেন। আপনি যদি এই শর্তাবলীতে সম্মত না হন, অনুগ্রহ করে আমাদের সেবা ব্যবহার করবেন না।'
              : 'By using SubsManager AI ("Service"), you agree to these Terms and Conditions. If you do not agree to these terms, please do not use our service.'}
          </p>
        </section>

        <section>
          <h2 className={cn("text-2xl font-semibold text-foreground mb-4", isBengali && "font-bangla")}>
            {isBengali ? '২. সেবার বর্ণনা' : '2. Description of Service'}
          </h2>
          <p>
            {isBengali 
              ? 'SubsManager AI একটি সাবস্ক্রিপশন ব্যবস্থাপনা প্ল্যাটফর্ম যা ব্যবহারকারীদের তাদের সাবস্ক্রিপশন ট্র্যাক, পরিচালনা এবং রিমাইন্ডার পেতে সহায়তা করে।' 
              : 'SubsManager AI is a subscription management platform that helps users track, manage, and receive reminders for their subscriptions.'}
          </p>
        </section>

        <section>
          <h2 className={cn("text-2xl font-semibold text-foreground mb-4", isBengali && "font-bangla")}>
            {isBengali ? '৩. ব্যবহারকারী অ্যাকাউন্ট' : '3. User Accounts'}
          </h2>
          <p className="mb-4">
            {isBengali 
              ? 'সেবা ব্যবহার করার জন্য, আপনাকে একটি অ্যাকাউন্ট তৈরি করতে হবে। আপনি দায়ী:' 
              : 'To use the Service, you must create an account. You are responsible for:'}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{isBengali ? 'সঠিক এবং সম্পূর্ণ তথ্য প্রদান' : 'Providing accurate and complete information'}</li>
            <li>{isBengali ? 'আপনার অ্যাকাউন্ট নিরাপদ রাখা' : 'Keeping your account secure'}</li>
            <li>{isBengali ? 'আপনার অ্যাকাউন্টে হওয়া সমস্ত কার্যক্রমের জন্য দায়িত্ব গ্রহণ' : 'Taking responsibility for all activities under your account'}</li>
          </ul>
        </section>

        <section>
          <h2 className={cn("text-2xl font-semibold text-foreground mb-4", isBengali && "font-bangla")}>
            {isBengali ? '৪. গ্রহণযোগ্য ব্যবহার' : '4. Acceptable Use'}
          </h2>
          <p className="mb-4">
            {isBengali 
              ? 'আপনি আমাদের সেবা নিম্নলিখিত কাজের জন্য ব্যবহার করতে পারবেন না:' 
              : 'You may not use our Service for the following purposes:'}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{isBengali ? 'আইন লঙ্ঘন করা' : 'Violating any laws'}</li>
            <li>{isBengali ? 'অন্যের অধিকার লঙ্ঘন করা' : 'Infringing on others\' rights'}</li>
            <li>{isBengali ? 'ক্ষতিকারক বা ক্ষতিকর কার্যক্রম' : 'Harmful or malicious activities'}</li>
            <li>{isBengali ? 'সিস্টেম বা সেবা ব্যাহত করা' : 'Disrupting systems or services'}</li>
          </ul>
        </section>

        <section>
          <h2 className={cn("text-2xl font-semibold text-foreground mb-4", isBengali && "font-bangla")}>
            {isBengali ? '৫. বৌদ্ধিক সম্পত্তি' : '5. Intellectual Property'}
          </h2>
          <p>
            {isBengali 
              ? 'সেবার সমস্ত কন্টেন্ট, ফিচার, এবং কার্যকারিতা SubsManager AI-এর সম্পত্তি এবং কপিরাইট, ট্রেডমার্ক, এবং অন্যান্য বৌদ্ধিক সম্পত্তি আইন দ্বারা সুরক্ষিত।' 
              : 'All content, features, and functionality of the Service are the property of SubsManager AI and are protected by copyright, trademark, and other intellectual property laws.'}
          </p>
        </section>

        <section>
          <h2 className={cn("text-2xl font-semibold text-foreground mb-4", isBengali && "font-bangla")}>
            {isBengali ? '৬. সীমিত দায়' : '6. Limitation of Liability'}
          </h2>
          <p>
            {isBengali 
              ? 'SubsManager AI কোনো পরোক্ষ, ঘটনাবহুল, বিশেষ, বা ফলস্বরূপ ক্ষতির জন্য দায়ী হবে না, যার মধ্যে তথ্যের ক্ষতি, লাভের ক্ষতি, বা ব্যবসায়িক বিঘ্ন অন্তর্ভুক্ত।' 
              : 'SubsManager AI shall not be liable for any indirect, incidental, special, or consequential damages, including loss of data, loss of profits, or business interruption.'}
          </p>
        </section>

        <section>
          <h2 className={cn("text-2xl font-semibold text-foreground mb-4", isBengali && "font-bangla")}>
            {isBengali ? '৭. সেবা পরিবর্তন' : '7. Service Modifications'}
          </h2>
          <p>
            {isBengali 
              ? 'আমরা যেকোনো সময়, কোনো নোটিশ ছাড়াই, সেবার যেকোনো অংশ পরিবর্তন, স্থগিত, বা বন্ধ করতে পারি।' 
              : 'We reserve the right to modify, suspend, or discontinue any part of the Service at any time, without notice.'}
          </p>
        </section>

        <section>
          <h2 className={cn("text-2xl font-semibold text-foreground mb-4", isBengali && "font-bangla")}>
            {isBengali ? '৮. শর্তাবলীতে পরিবর্তন' : '8. Changes to Terms'}
          </h2>
          <p>
            {isBengali 
              ? 'আমরা সময়ে সময়ে এই শর্তাবলী আপডেট করতে পারি। যেকোনো পরিবর্তন এই পৃষ্ঠায় পোস্ট করা হবে, এবং গুরুত্বপূর্ণ পরিবর্তনের ক্ষেত্রে আমরা আপনাকে অবহিত করব।' 
              : 'We may update these Terms from time to time. Any changes will be posted on this page, and we will notify you of significant changes.'}
          </p>
        </section>

        <section>
          <h2 className={cn("text-2xl font-semibold text-foreground mb-4", isBengali && "font-bangla")}>
            {isBengali ? '৯. সমাপ্তি' : '9. Termination'}
          </h2>
          <p>
            {isBengali 
              ? 'আমরা যেকোনো সময়, কোনো কারণ ছাড়াই, আপনার অ্যাকাউন্ট বন্ধ বা সেবা থেকে বাদ দিতে পারি।' 
              : 'We may terminate or suspend your account or access to the Service at any time, for any reason, without notice.'}
          </p>
        </section>

        <section>
          <h2 className={cn("text-2xl font-semibold text-foreground mb-4", isBengali && "font-bangla")}>
            {isBengali ? '১০. যোগাযোগ' : '10. Contact Information'}
          </h2>
          <p>
            {isBengali 
              ? 'এই শর্তাবলী সম্পর্কিত কোনো প্রশ্নের জন্য, আমাদের সাথে যোগাযোগ করুন: support@subsmanager-ai.com' 
              : 'For any questions regarding these Terms, please contact us at: support@subsmanager-ai.com'}
          </p>
        </section>

        <section className="pt-6 border-t">
          <p className="text-sm">
            {isBengali 
              ? 'সর্বশেষ আপডেট: জানুয়ারি ২০২৬' 
              : 'Last updated: January 2026'}
          </p>
        </section>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsConditions;

