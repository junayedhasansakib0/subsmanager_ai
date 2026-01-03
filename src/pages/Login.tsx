import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: language === 'bn' ? 'স্বাগতম!' : 'Welcome back!',
        description: language === 'bn' ? 'সফলভাবে লগইন হয়েছে।' : 'You have successfully logged in.',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: language === 'bn' ? 'ভুল তথ্য। আবার চেষ্টা করুন।' : 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title={t.auth.login.title} subtitle={t.auth.login.subtitle}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className={cn(language === 'bn' && "font-bangla")}>
            {t.auth.login.email}
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className={cn(language === 'bn' && "font-bangla")}>
              {t.auth.login.password}
            </Label>
            <a href="#" className={cn(
              "text-sm text-primary hover:underline",
              language === 'bn' && "font-bangla"
            )}>
              {t.auth.login.forgotPassword}
            </a>
          </div>
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
            />
          </div>
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
              {language === 'bn' ? 'অপেক্ষা করুন...' : 'Signing in...'}
            </>
          ) : (
            t.auth.login.submit
          )}
        </Button>

        <p className={cn(
          "text-center text-sm text-muted-foreground mt-8",
          language === 'bn' && "font-bangla"
        )}>
          {t.auth.login.noAccount}{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            {t.auth.login.signUp}
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
