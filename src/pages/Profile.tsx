import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('mofa_user');
    toast({
      title: language === 'en' ? 'Logged Out' : 'تم تسجيل الخروج',
      description: language === 'en' ? 'You have been logged out successfully' : 'تم تسجيل خروجك بنجاح',
    });
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('mofa_user') || '{"username": "User"}');

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{t('common.profile')}</h1>

          <Card className="p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <p className="text-muted-foreground">{language === 'en' ? 'User Account' : 'حساب المستخدم'}</p>
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Username' : 'اسم المستخدم'}</p>
                  <p className="font-medium">{user.username}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{language === 'en' ? 'Account Type' : 'نوع الحساب'}</p>
                  <p className="font-medium">{language === 'en' ? 'Standard' : 'قياسي'}</p>
                </div>
              </div>
            </div>
          </Card>

          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full gap-2"
          >
            <LogOut className="h-4 w-4 rtl-flip" />
            {t('common.logout')}
          </Button>
        </div>
    </div>
  );
};

export default Profile;
