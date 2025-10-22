import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const Header = () => {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="gov-header sticky top-0 z-50 border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">M</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg leading-tight">
                  {language === 'en' ? 'MOFA Qatar' : 'وزارة الخارجية'}
                </div>
                <div className="text-xs opacity-90">
                  {language === 'en' ? 'eServices Portal' : 'بوابة الخدمات الإلكترونية'}
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-white hover:bg-white/10"
              title={t('common.language')}
            >
              <Globe className="h-5 w-5" />
            </Button>
            
            <Link to="/profile">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
