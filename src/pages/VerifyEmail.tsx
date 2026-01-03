import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageSwitch } from '@/components/common/LanguageSwitch';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Layers, Mail, ArrowRight, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { authAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const VerifyEmail = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const { toast } = useToast();
  
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setStatus('idle');
    }
  }, [token]);

  const verifyEmail = async (token: string) => {
    setStatus('loading');
    try {
      const response = await authAPI.verifyEmail(token);
      const { token: authToken } = response.data.data;
      
      localStorage.setItem('token', authToken);
      await checkAuth();
      
      setStatus('success');
      toast({
        title: language === 'bn' ? 'ইমেইল যাচাই হয়েছে!' : 'Email verified!',
        description: language === 'bn' ? 'আপনার অ্যাকাউন্ট সফলভাবে যাচাই হয়েছে।' : 'Your account has been successfully verified.',
      });
      
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error: any) {
      setStatus('error');
      const errorCode = error.response?.data?.code;
      const errorMessage = error.response?.data?.message;
      
      // Handle specific error cases
      let description = errorMessage || (language === 'bn' ? 'ইমেইল যাচাই ব্যর্থ।' : 'Email verification failed.');
      
      if (errorCode === 'TOKEN_EXPIRED') {
        description = language === 'bn' 
          ? 'যাচাইকরণ লিঙ্কের মেয়াদ শেষ হয়ে গেছে। অনুগ্রহ করে নতুন লিঙ্কের জন্য ইমেইল পাঠান।'
          : 'Verification link has expired. Please request a new verification email.';
      } else if (errorCode === 'TOKEN_INVALID') {
        description = language === 'bn'
          ? 'যাচাইকরণ লিঙ্কটি অবৈধ। অনুগ্রহ করে নতুন লিঙ্কের জন্য ইমেইল পাঠান।'
          : 'Verification link is invalid. Please request a new verification email.';
      }
      
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description,
        variant: 'destructive',
      });
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast({
        title: language === 'bn' ? 'ইমেইল প্রয়োজন' : 'Email required',
        description: language === 'bn' ? 'অনুগ্রহ করে আপনার ইমেইল ঠিকানা লিখুন।' : 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const lang = localStorage.getItem('language') || 'en';
      await authAPI.resendVerification({ email, language: lang });
      toast({
        title: language === 'bn' ? 'ইমেইল পাঠানো হয়েছে' : 'Email sent',
        description: language === 'bn' ? 'যাচাইকরণ ইমেইল আবার পাঠানো হয়েছে।' : 'Verification email has been resent.',
      });
    } catch (error: any) {
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: error.response?.data?.message || (language === 'bn' ? 'ইমেইল পাঠাতে ব্যর্থ।' : 'Failed to send email.'),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md text-center animate-fade-up">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Layers className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className={cn(
              "font-bold text-2xl text-foreground",
              language === 'bn' && "font-bangla"
            )}>
              {t.brand}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </div>

        {/* Icon */}
        <div className={cn(
          "w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center",
          status === 'success' ? 'bg-success/10' : status === 'error' ? 'bg-destructive/10' : 'bg-primary/10'
        )}>
          {status === 'loading' && <Loader2 className="w-10 h-10 text-primary animate-spin" />}
          {status === 'success' && <CheckCircle2 className="w-10 h-10 text-success" />}
          {status === 'error' && <XCircle className="w-10 h-10 text-destructive" />}
          {(status === 'idle' || !token) && <Mail className="w-10 h-10 text-primary" />}
        </div>

        {/* Content */}
        <h1 className={cn(
          "text-3xl font-bold text-foreground mb-4",
          language === 'bn' && "font-bangla"
        )}>
          {status === 'success' 
            ? (language === 'bn' ? 'ইমেইল যাচাই হয়েছে!' : 'Email Verified!')
            : status === 'error'
            ? (language === 'bn' ? 'যাচাই ব্যর্থ' : 'Verification Failed')
            : status === 'loading'
            ? (language === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Verifying...')
            : t.auth.verify.title}
        </h1>
        <p className={cn(
          "text-muted-foreground mb-8 max-w-sm mx-auto",
          language === 'bn' && "font-bangla"
        )}>
          {status === 'success'
            ? (language === 'bn' ? 'আপনার অ্যাকাউন্ট সফলভাবে যাচাই হয়েছে। ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে...' : 'Your account has been successfully verified. Redirecting to dashboard...')
            : status === 'error'
            ? (language === 'bn' ? 'যাচাইকরণ লিঙ্কের মেয়াদ শেষ হয়ে গেছে বা এটি অবৈধ। অনুগ্রহ করে নতুন লিঙ্কের জন্য ইমেইল পাঠান।' : 'Verification link has expired or is invalid. Please request a new verification email.')
            : status === 'loading'
            ? (language === 'bn' ? 'আপনার ইমেইল যাচাই করা হচ্ছে...' : 'Verifying your email...')
            : t.auth.verify.description}
        </p>

        {/* Actions */}
        {status === 'success' && (
          <div className="space-y-4">
            <Button 
              size="lg" 
              className={cn("w-full", language === 'bn' && "font-bangla")}
              onClick={() => navigate('/dashboard')}
            >
              {t.auth.verify.continue}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
        
        {status === 'error' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <input
                type="email"
                placeholder={language === 'bn' ? 'আপনার ইমেইল' : 'Your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
            <Button 
              variant="ghost" 
              size="lg" 
              className={cn("w-full", language === 'bn' && "font-bangla")}
              onClick={handleResend}
            >
              {t.auth.verify.resend}
            </Button>
          </div>
        )}

        {(status === 'idle' || !token) && (
          <div className="space-y-4">
            <p className={cn(
              "text-sm text-muted-foreground",
              language === 'bn' && "font-bangla"
            )}>
              {language === 'bn' ? 'ইমেইল যাচাই করার জন্য লিঙ্কে ক্লিক করুন।' : 'Click the link in your email to verify.'}
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder={language === 'bn' ? 'আপনার ইমেইল' : 'Your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
            <Button 
              variant="ghost" 
              size="lg" 
              className={cn("w-full", language === 'bn' && "font-bangla")}
              onClick={handleResend}
            >
              {t.auth.verify.resend}
            </Button>
          </div>
        )}

        {/* Help text */}
        <p className={cn(
          "text-sm text-muted-foreground mt-8",
          language === 'bn' && "font-bangla"
        )}>
          {t.auth.verify.spam}{' '}
          <a href="#" className="text-primary hover:underline">
            {t.auth.verify.spamLink}
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
