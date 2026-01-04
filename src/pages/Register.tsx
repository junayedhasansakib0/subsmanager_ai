import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Mail, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast({
        title: language === 'bn' ? 'শর্তাবলী প্রয়োজন' : 'Terms Required',
        description: language === 'bn' ? 'অনুগ্রহ করে শর্তাবলীতে সম্মত হন।' : 'Please agree to the terms and conditions.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password);
      toast({
        title: language === 'bn' ? 'অ্যাকাউন্ট তৈরি হয়েছে!' : 'Account created!',
        description: language === 'bn' ? 'আপনার ইমেইল ভেরিফাই করুন।' : 'Please verify your email.',
      });
      navigate('/verify-email');
    } catch (error) {
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: language === 'bn' ? 'অ্যাকাউন্ট তৈরি ব্যর্থ।' : 'Failed to create account.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title={t.auth.register.title} subtitle={t.auth.register.subtitle}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className={cn(language === 'bn' && "font-bangla")}>
            {t.auth.register.name}
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder={language === 'bn' ? "আপনার নাম" : "John Doe"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-11"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className={cn(language === 'bn' && "font-bangla")}>
            {t.auth.register.email}
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-11"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className={cn(language === 'bn' && "font-bangla")}>
            {t.auth.register.password}
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-11"
              required
              minLength={8}
            />
          </div>
          <p className={cn(
            "text-xs text-muted-foreground",
            language === 'bn' && "font-bangla"
          )}>
            {t.auth.register.passwordHint}
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          />
          <Label htmlFor="terms" className={cn(
            "text-sm font-normal leading-relaxed",
            language === 'bn' && "font-bangla"
          )}>
            {t.auth.register.terms}{' '}
            <Link to="/terms" target="_blank" className="text-primary hover:underline">
              {t.auth.register.termsLink}
            </Link>{' '}
            &{' '}
            <Link to="/privacy" target="_blank" className="text-primary hover:underline">
              {t.auth.register.privacyLink}
            </Link>
          </Label>
        </div>

        <Button
          type="submit"
          size="lg"
          className={cn("w-full", language === 'bn' && "font-bangla")}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {language === 'bn' ? 'অপেক্ষা করুন...' : 'Creating...'}
            </>
          ) : (
            t.auth.register.submit
          )}
        </Button>

        <p className={cn(
          "text-center text-sm text-muted-foreground",
          language === 'bn' && "font-bangla"
        )}>
          {t.auth.register.hasAccount}{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            {t.auth.register.signIn}
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
