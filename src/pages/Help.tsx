import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Card } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Help = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">{t('help.title')}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Call Center */}
            <Card className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-secondary rtl-flip" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{t('help.callCenter')}</h2>
                <a href="tel:109" className="text-3xl font-bold text-secondary block mb-3">
                  {t('help.callCenterNumber')}
                </a>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 rtl-flip" />
                  <span>{t('help.callCenterHours')}</span>
                </div>
              </div>
            </Card>

            {/* Email */}
            <Card className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-secondary rtl-flip" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{t('help.email')}</h2>
                <a
                  href={`mailto:${t('help.emailAddress')}`}
                  className="text-lg text-secondary hover:underline block"
                >
                  {t('help.emailAddress')}
                </a>
              </div>
            </Card>
          </div>

          {/* Visit Us */}
          <Card className="p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-secondary rtl-flip" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{t('help.visitUs')}</h2>
                <p className="text-muted-foreground mb-4">{t('help.address')}</p>
                <a
                  href="https://maps.google.com/?q=Ministry+of+Foreign+Affairs+Doha+Qatar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline"
                >
                  {language === 'en' ? 'Open in Google Maps' : 'افتح في خرائط جوجل'}
                </a>
              </div>
            </div>
          </Card>

          {/* Emergency Notice */}
          <Card className="p-6 bg-warning/10 border-warning/20">
            <p className="text-center font-medium">{t('help.emergencyNotice')}</p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
