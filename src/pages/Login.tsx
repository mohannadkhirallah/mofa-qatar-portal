import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock login
    setTimeout(() => {
      if (username && password) {
        localStorage.setItem('mofa_user', JSON.stringify({ username }));
        toast({
          title: language === 'en' ? 'Login Successful' : 'تم تسجيل الدخول',
          description: language === 'en' ? 'Welcome back!' : 'مرحباً بعودتك!',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: language === 'en' ? 'Login Failed' : 'فشل تسجيل الدخول',
          description: language === 'en' ? 'Please enter valid credentials' : 'يرجى إدخال بيانات صحيحة',
          variant: 'destructive',
        });
      }
      setLoading(false);
    }, 800);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div className="lg:w-1/2 bg-primary text-primary-foreground p-8 lg:p-12 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">M</span>
            </div>
            <div>
              <div className="font-bold text-xl">{t('login.title')}</div>
              <div className="text-sm opacity-90">{t('login.subtitle')}</div>
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold mb-4 mt-16">
            {t('login.welcome')}
          </h1>
          <p className="text-lg opacity-90 max-w-md">
            {t('login.secureAccess')}
          </p>
        </div>

        <div className="hidden lg:block text-sm opacity-75">
          © {new Date().getFullYear()} {language === 'en' ? 'Ministry of Foreign Affairs, Qatar' : 'وزارة الخارجية، قطر'}
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center bg-background">
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              {t('common.language')}
            </Button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base">
                {t('login.username')}
              </Label>
              <div className="relative">
                <User className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground rtl-flip" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input ps-10"
                  placeholder={language === 'en' ? 'Enter your username or QID' : 'أدخل اسم المستخدم أو الرقم الشخصي'}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">
                {t('login.password')}
              </Label>
              <div className="relative">
                <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground rtl-flip" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input ps-10"
                  placeholder={language === 'en' ? 'Enter your password' : 'أدخل كلمة المرور'}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-secondary hover:underline">
                {t('login.forgotPassword')}
              </a>
              <a href="#" className="text-secondary hover:underline">
                {t('login.register')}
              </a>
            </div>

            <Button
              type="submit"
              className="w-full gov-button-primary h-11"
              disabled={loading}
            >
              {loading ? t('common.loading') : t('login.loginButton')}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>{language === 'en' ? 'For assistance, call' : 'للمساعدة، اتصل'}</p>
            <p className="font-semibold text-secondary text-lg mt-1">109</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
