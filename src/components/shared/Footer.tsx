import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-muted border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t('help.contactUs')}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground rtl-flip" />
                <span>{t('help.callCenterNumber')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground rtl-flip" />
                <span>{t('help.emailAddress')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground rtl-flip" />
                <span>{t('help.address')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/faqs" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('common.faqs')}
                </a>
              </li>
              <li>
                <a href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('common.help')}
                </a>
              </li>
              <li>
                <a
                  href="https://mofa.gov.qa/en/eservices/attestation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {language === 'en' ? 'MOFA Website' : 'موقع وزارة الخارجية'}
                </a>
              </li>
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {language === 'en' ? 'Office Hours' : 'ساعات العمل'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('help.callCenterHours')}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()}{' '}
            {language === 'en'
              ? 'Ministry of Foreign Affairs, State of Qatar. All rights reserved.'
              : 'وزارة الخارجية، دولة قطر. جميع الحقوق محفوظة.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
