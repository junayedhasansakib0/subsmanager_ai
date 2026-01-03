// Translations for SubsManager AI - English and Bangla

export type Language = 'en' | 'bn';

export const translations = {
  en: {
    // Brand
    brand: "SubsManager AI",
    tagline: "Smart Subscription Management",
    
    // Navigation
    nav: {
      features: "Features",
      pricing: "Pricing",
      login: "Log in",
      getStarted: "Get Started",
      dashboard: "Dashboard",
      subscriptions: "Subscriptions",
      analytics: "Analytics",
      settings: "Settings",
      logout: "Logout",
    },
    
    // Hero
    hero: {
      badge: "AI-Powered Subscription Tracking",
      title: "Never Miss a",
      titleHighlight: "Subscription Renewal",
      titleEnd: "Again",
      description: "Track all your subscriptions in one place. Get smart reminders before renewals, visualize your spending, and take control of your recurring expenses.",
      cta: "Start Free Trial",
      ctaSecondary: "See How It Works",
      trustedBy: "Trusted by 5,000+ users worldwide",
    },
    
    // Why Section
    why: {
      title: "Why You",
      titleHighlight: "Need This",
      subtitle: "Stop losing money on forgotten subscriptions",
      problems: [
        {
          title: "Forgotten Renewals",
          description: "You forget about subscriptions and get charged unexpectedly every month.",
        },
        {
          title: "Wasted Money",
          description: "Paying for services you no longer use because you forgot to cancel them.",
        },
        {
          title: "No Overview",
          description: "Scattered subscriptions across different platforms with no central view.",
        },
      ],
      solution: {
        title: "SubsManager AI Solves This",
        description: "Get one dashboard to track everything, receive smart reminders before renewals, and never waste money on forgotten subscriptions again.",
      },
    },
    
    // Features
    features: {
      title: "Everything You Need to",
      titleHighlight: "Manage Subscriptions",
      subtitle: "Powerful features designed to help you track, manage, and optimize your recurring expenses.",
      items: [
        {
          title: "Smart Tracking",
          description: "Automatically track all your subscriptions from Netflix to SaaS tools. Never lose track of what you're paying for.",
        },
        {
          title: "Renewal Reminders",
          description: "Get notified before any subscription renews. Choose email, SMS, or push notifications.",
        },
        {
          title: "Cost Analytics",
          description: "Visualize your monthly and yearly spending with beautiful charts. Identify savings opportunities.",
        },
        {
          title: "Category Management",
          description: "Organize subscriptions by category - Entertainment, Productivity, Hosting, and more.",
        },
        {
          title: "Multi-Currency",
          description: "Track subscriptions in any currency. Automatic conversion for total cost overview.",
        },
        {
          title: "Secure & Private",
          description: "Your data is encrypted and secure. We never share your information with third parties.",
        },
      ],
    },
    
    // Pricing
    pricing: {
      title: "Simple,",
      titleHighlight: "Transparent Pricing",
      subtitle: "Choose the plan that fits your needs. No hidden fees.",
      free: {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for getting started",
        features: [
          "Up to 5 subscriptions",
          "Basic reminders",
          "Monthly overview",
          "Email support",
        ],
        cta: "Get Started",
      },
      pro: {
        name: "Pro",
        price: "$4.99",
        period: "per month",
        description: "Best for active users",
        features: [
          "Unlimited subscriptions",
          "Advanced analytics",
          "Custom reminders",
          "Priority support",
          "Export reports",
          "Multi-currency",
        ],
        cta: "Start Free Trial",
        popular: "Most Popular",
      },
    },
    
    // FAQ
    faq: {
      title: "Frequently Asked",
      titleHighlight: "Questions",
      subtitle: "Everything you need to know about SubsManager AI",
      items: [
        {
          question: "Is SubsManager AI free to use?",
          answer: "Yes! We offer a free plan that lets you track up to 5 subscriptions. For unlimited subscriptions and advanced features, you can upgrade to our Pro plan.",
        },
        {
          question: "How do renewal reminders work?",
          answer: "You'll receive email notifications before your subscriptions renew. You can customize how many days in advance you want to be notified.",
        },
        {
          question: "Can I track subscriptions in different currencies?",
          answer: "Absolutely! Our Pro plan supports multi-currency tracking with automatic conversion to your preferred currency for total cost overview.",
        },
        {
          question: "Is my data secure?",
          answer: "Yes, your data is encrypted and stored securely. We never share your information with third parties.",
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel your Pro subscription at any time. You'll continue to have access until the end of your billing period.",
        },
      ],
    },
    
    // CTA
    cta: {
      title: "Ready to Take Control of Your Subscriptions?",
      subtitle: "Start tracking your subscriptions today and never miss a renewal again.",
      button: "Get Started for Free",
    },
    
    // Auth
    auth: {
      login: {
        title: "Welcome back",
        subtitle: "Enter your credentials to access your dashboard",
        email: "Email",
        password: "Password",
        forgotPassword: "Forgot password?",
        submit: "Sign in",
        noAccount: "Don't have an account?",
        signUp: "Sign up",
      },
      register: {
        title: "Create an account",
        subtitle: "Start your 14-day free trial. No credit card required.",
        name: "Full Name",
        email: "Email",
        password: "Password",
        passwordHint: "Must be at least 8 characters",
        terms: "I agree to the",
        termsLink: "Terms of Service",
        privacyLink: "Privacy Policy",
        submit: "Create account",
        hasAccount: "Already have an account?",
        signIn: "Sign in",
      },
      verify: {
        title: "Check your email",
        description: "We've sent a verification link to your email address. Please click the link to verify your account.",
        continue: "Continue to Dashboard",
        resend: "Resend verification email",
        spam: "Didn't receive the email?",
        spamLink: "Check your spam folder",
      },
    },
    
    // Dashboard
    dashboard: {
      welcome: "Welcome back",
      overview: "Here's your subscription overview",
      stats: {
        activeSubscriptions: "Active Subscriptions",
        monthlyCost: "Monthly Cost",
        upcomingRenewals: "Upcoming Renewals",
        yearlySpend: "Yearly Spend",
      },
      subscriptionList: {
        title: "Your Subscriptions",
        viewAll: "View All",
        search: "Search subscriptions...",
        filter: "Filter",
        addNew: "Add New",
        name: "Name",
        cost: "Cost",
        category: "Category",
        renewal: "Renewal",
        status: "Status",
        active: "Active",
        expired: "Expired",
        expiring: "Expiring Soon",
      },
      analytics: {
        title: "Monthly Spending",
        subtitle: "Track your subscription costs over time",
      },
      upcomingRenewals: {
        title: "Upcoming Renewals",
        daysLeft: "days left",
        today: "Today",
        tomorrow: "Tomorrow",
      },
    },
    
    // Footer
    footer: {
      description: "The smart way to manage all your subscriptions and recurring expenses.",
      product: "Product",
      company: "Company",
      resources: "Resources",
      legal: "Legal",
      links: {
        features: "Features",
        pricing: "Pricing",
        integrations: "Integrations",
        about: "About",
        blog: "Blog",
        careers: "Careers",
        help: "Help Center",
        docs: "Documentation",
        privacy: "Privacy",
        terms: "Terms",
      },
      copyright: "© 2026 SubsManager AI. All rights reserved.",
    },
    
    // Common
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      close: "Close",
      search: "Search...",
      noResults: "No results found",
      perMonth: "/mo",
      perYear: "/yr",
    },
  },
  
  bn: {
    // Brand
    brand: "সাবস্ম্যানেজার AI",
    tagline: "স্মার্ট সাবস্ক্রিপশন ম্যানেজমেন্ট",
    
    // Navigation
    nav: {
      features: "ফিচার",
      pricing: "মূল্য",
      login: "লগইন",
      getStarted: "শুরু করুন",
      dashboard: "ড্যাশবোর্ড",
      subscriptions: "সাবস্ক্রিপশন",
      analytics: "অ্যানালিটিক্স",
      settings: "সেটিংস",
      logout: "লগআউট",
    },
    
    // Hero
    hero: {
      badge: "AI-চালিত সাবস্ক্রিপশন ট্র্যাকিং",
      title: "আর কখনো মিস করবেন না",
      titleHighlight: "সাবস্ক্রিপশন রিনিউয়াল",
      titleEnd: "",
      description: "আপনার সমস্ত সাবস্ক্রিপশন এক জায়গায় ট্র্যাক করুন। রিনিউয়ালের আগে স্মার্ট রিমাইন্ডার পান এবং আপনার খরচ নিয়ন্ত্রণ করুন।",
      cta: "ফ্রি ট্রায়াল শুরু করুন",
      ctaSecondary: "কিভাবে কাজ করে দেখুন",
      trustedBy: "বিশ্বব্যাপী ৫,০০০+ ব্যবহারকারীর বিশ্বাস",
    },
    
    // Why Section
    why: {
      title: "কেন আপনার",
      titleHighlight: "এটি দরকার",
      subtitle: "ভুলে যাওয়া সাবস্ক্রিপশনে টাকা নষ্ট করা বন্ধ করুন",
      problems: [
        {
          title: "ভুলে যাওয়া রিনিউয়াল",
          description: "আপনি সাবস্ক্রিপশন ভুলে যান এবং প্রতি মাসে অপ্রত্যাশিতভাবে চার্জ হন।",
        },
        {
          title: "অপচয়িত টাকা",
          description: "যে সেবা আর ব্যবহার করেন না সেগুলোতে টাকা দিচ্ছেন কারণ বাতিল করতে ভুলে গেছেন।",
        },
        {
          title: "কোনো ওভারভিউ নেই",
          description: "বিভিন্ন প্ল্যাটফর্মে ছড়িয়ে থাকা সাবস্ক্রিপশন, কোনো কেন্দ্রীয় ভিউ নেই।",
        },
      ],
      solution: {
        title: "সাবস্ম্যানেজার AI এটি সমাধান করে",
        description: "সবকিছু ট্র্যাক করতে একটি ড্যাশবোর্ড পান, রিনিউয়ালের আগে স্মার্ট রিমাইন্ডার পান।",
      },
    },
    
    // Features
    features: {
      title: "সাবস্ক্রিপশন পরিচালনার জন্য",
      titleHighlight: "আপনার যা প্রয়োজন সব",
      subtitle: "আপনার পুনরাবৃত্ত খরচ ট্র্যাক, পরিচালনা এবং অপ্টিমাইজ করতে সাহায্য করার জন্য শক্তিশালী ফিচার।",
      items: [
        {
          title: "স্মার্ট ট্র্যাকিং",
          description: "Netflix থেকে SaaS টুলস পর্যন্ত সমস্ত সাবস্ক্রিপশন স্বয়ংক্রিয়ভাবে ট্র্যাক করুন।",
        },
        {
          title: "রিনিউয়াল রিমাইন্ডার",
          description: "যেকোনো সাবস্ক্রিপশন রিনিউ হওয়ার আগে নোটিফিকেশন পান।",
        },
        {
          title: "খরচ বিশ্লেষণ",
          description: "সুন্দর চার্টের মাধ্যমে আপনার মাসিক এবং বার্ষিক খরচ দেখুন।",
        },
        {
          title: "ক্যাটাগরি ম্যানেজমেন্ট",
          description: "বিনোদন, উৎপাদনশীলতা, হোস্টিং ইত্যাদি ক্যাটাগরি অনুযায়ী সাজান।",
        },
        {
          title: "মাল্টি-কারেন্সি",
          description: "যেকোনো মুদ্রায় সাবস্ক্রিপশন ট্র্যাক করুন। স্বয়ংক্রিয় কনভার্শন।",
        },
        {
          title: "নিরাপদ ও গোপনীয়",
          description: "আপনার ডেটা এনক্রিপ্টেড এবং সুরক্ষিত। আমরা কখনো শেয়ার করি না।",
        },
      ],
    },
    
    // Pricing
    pricing: {
      title: "সহজ,",
      titleHighlight: "স্বচ্ছ মূল্য",
      subtitle: "আপনার প্রয়োজন অনুযায়ী প্ল্যান বেছে নিন। কোনো লুকানো ফি নেই।",
      free: {
        name: "ফ্রি",
        price: "৳০",
        period: "সর্বদা",
        description: "শুরু করার জন্য পারফেক্ট",
        features: [
          "৫টি পর্যন্ত সাবস্ক্রিপশন",
          "বেসিক রিমাইন্ডার",
          "মাসিক ওভারভিউ",
          "ইমেইল সাপোর্ট",
        ],
        cta: "শুরু করুন",
      },
      pro: {
        name: "প্রো",
        price: "৳৪৯৯",
        period: "মাসিক",
        description: "সক্রিয় ব্যবহারকারীদের জন্য সেরা",
        features: [
          "আনলিমিটেড সাবস্ক্রিপশন",
          "অ্যাডভান্সড অ্যানালিটিক্স",
          "কাস্টম রিমাইন্ডার",
          "প্রায়োরিটি সাপোর্ট",
          "রিপোর্ট এক্সপোর্ট",
          "মাল্টি-কারেন্সি",
        ],
        cta: "ফ্রি ট্রায়াল শুরু করুন",
        popular: "সবচেয়ে জনপ্রিয়",
      },
    },
    
    // FAQ
    faq: {
      title: "সচরাচর জিজ্ঞাসিত",
      titleHighlight: "প্রশ্নাবলী",
      subtitle: "সাবস্ম্যানেজার AI সম্পর্কে আপনার যা জানা দরকার",
      items: [
        {
          question: "সাবস্ম্যানেজার AI কি ফ্রি?",
          answer: "হ্যাঁ! আমরা একটি ফ্রি প্ল্যান অফার করি যা আপনাকে ৫টি সাবস্ক্রিপশন ট্র্যাক করতে দেয়। আনলিমিটেড সাবস্ক্রিপশনের জন্য প্রো প্ল্যানে আপগ্রেড করুন।",
        },
        {
          question: "রিনিউয়াল রিমাইন্ডার কিভাবে কাজ করে?",
          answer: "আপনার সাবস্ক্রিপশন রিনিউ হওয়ার আগে আপনি ইমেইল নোটিফিকেশন পাবেন। কতদিন আগে নোটিফাই করতে চান তা কাস্টমাইজ করতে পারবেন।",
        },
        {
          question: "বিভিন্ন মুদ্রায় সাবস্ক্রিপশন ট্র্যাক করতে পারি?",
          answer: "অবশ্যই! আমাদের প্রো প্ল্যান মাল্টি-কারেন্সি ট্র্যাকিং সাপোর্ট করে এবং আপনার পছন্দের মুদ্রায় স্বয়ংক্রিয় কনভার্শন করে।",
        },
        {
          question: "আমার ডেটা কি নিরাপদ?",
          answer: "হ্যাঁ, আপনার ডেটা এনক্রিপ্টেড এবং নিরাপদে সংরক্ষিত। আমরা কখনো তৃতীয় পক্ষের সাথে তথ্য শেয়ার করি না।",
        },
        {
          question: "যেকোনো সময় বাতিল করতে পারি?",
          answer: "হ্যাঁ, আপনি যেকোনো সময় প্রো সাবস্ক্রিপশন বাতিল করতে পারেন। বিলিং পিরিয়ড শেষ না হওয়া পর্যন্ত অ্যাক্সেস থাকবে।",
        },
      ],
    },
    
    // CTA
    cta: {
      title: "আপনার সাবস্ক্রিপশন নিয়ন্ত্রণে নিতে প্রস্তুত?",
      subtitle: "আজই আপনার সাবস্ক্রিপশন ট্র্যাক করা শুরু করুন এবং আর কখনো রিনিউয়াল মিস করবেন না।",
      button: "ফ্রিতে শুরু করুন",
    },
    
    // Auth
    auth: {
      login: {
        title: "স্বাগতম",
        subtitle: "আপনার ড্যাশবোর্ডে প্রবেশ করতে লগইন করুন",
        email: "ইমেইল",
        password: "পাসওয়ার্ড",
        forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
        submit: "সাইন ইন",
        noAccount: "অ্যাকাউন্ট নেই?",
        signUp: "সাইন আপ করুন",
      },
      register: {
        title: "অ্যাকাউন্ট তৈরি করুন",
        subtitle: "১৪ দিনের ফ্রি ট্রায়াল শুরু করুন। ক্রেডিট কার্ড লাগবে না।",
        name: "পুরো নাম",
        email: "ইমেইল",
        password: "পাসওয়ার্ড",
        passwordHint: "কমপক্ষে ৮ অক্ষর হতে হবে",
        terms: "আমি সম্মত",
        termsLink: "সেবার শর্তাবলী",
        privacyLink: "গোপনীয়তা নীতি",
        submit: "অ্যাকাউন্ট তৈরি করুন",
        hasAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
        signIn: "সাইন ইন করুন",
      },
      verify: {
        title: "আপনার ইমেইল চেক করুন",
        description: "আমরা আপনার ইমেইলে একটি ভেরিফিকেশন লিংক পাঠিয়েছি। অনুগ্রহ করে লিংকে ক্লিক করুন।",
        continue: "ড্যাশবোর্ডে যান",
        resend: "আবার ইমেইল পাঠান",
        spam: "ইমেইল পাননি?",
        spamLink: "স্প্যাম ফোল্ডার চেক করুন",
      },
    },
    
    // Dashboard
    dashboard: {
      welcome: "স্বাগতম",
      overview: "আপনার সাবস্ক্রিপশন ওভারভিউ",
      stats: {
        activeSubscriptions: "সক্রিয় সাবস্ক্রিপশন",
        monthlyCost: "মাসিক খরচ",
        upcomingRenewals: "আসন্ন রিনিউয়াল",
        yearlySpend: "বার্ষিক খরচ",
      },
      subscriptionList: {
        title: "আপনার সাবস্ক্রিপশন",
        viewAll: "সব দেখুন",
        search: "সার্চ করুন...",
        filter: "ফিল্টার",
        addNew: "নতুন যোগ করুন",
        name: "নাম",
        cost: "খরচ",
        category: "ক্যাটাগরি",
        renewal: "রিনিউয়াল",
        status: "স্ট্যাটাস",
        active: "সক্রিয়",
        expired: "মেয়াদোত্তীর্ণ",
        expiring: "শীঘ্রই শেষ",
      },
      analytics: {
        title: "মাসিক খরচ",
        subtitle: "সময়ের সাথে আপনার সাবস্ক্রিপশন খরচ ট্র্যাক করুন",
      },
      upcomingRenewals: {
        title: "আসন্ন রিনিউয়াল",
        daysLeft: "দিন বাকি",
        today: "আজ",
        tomorrow: "আগামীকাল",
      },
    },
    
    // Footer
    footer: {
      description: "আপনার সমস্ত সাবস্ক্রিপশন এবং পুনরাবৃত্ত খরচ পরিচালনার স্মার্ট উপায়।",
      product: "প্রোডাক্ট",
      company: "কোম্পানি",
      resources: "রিসোর্স",
      legal: "আইনি",
      links: {
        features: "ফিচার",
        pricing: "মূল্য",
        integrations: "ইন্টিগ্রেশন",
        about: "সম্পর্কে",
        blog: "ব্লগ",
        careers: "ক্যারিয়ার",
        help: "সাহায্য কেন্দ্র",
        docs: "ডকুমেন্টেশন",
        privacy: "গোপনীয়তা",
        terms: "শর্তাবলী",
      },
      copyright: "© ২০২৬ সাবস্ম্যানেজার AI। সর্বস্বত্ব সংরক্ষিত।",
    },
    
    // Common
    common: {
      loading: "লোড হচ্ছে...",
      save: "সংরক্ষণ",
      cancel: "বাতিল",
      delete: "মুছুন",
      edit: "সম্পাদনা",
      close: "বন্ধ করুন",
      search: "সার্চ...",
      noResults: "কোনো ফলাফল পাওয়া যায়নি",
      perMonth: "/মাস",
      perYear: "/বছর",
    },
  },
};

export type TranslationKeys = typeof translations.en;
