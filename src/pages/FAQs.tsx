import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockFAQs } from '@/lib/mockData';
import { Search, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQs = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = mockFAQs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <HelpCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">{t('faqs.title')}</h1>
            <p className="text-muted-foreground">{t('help.title')}</p>
          </div>

          {/* Search */}
          <Card className="p-4 mb-8">
            <div className="relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground rtl-flip" />
              <Input
                type="text"
                placeholder={t('faqs.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10"
              />
            </div>
          </Card>

          {/* FAQs */}
          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-start">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('common.noResults')}</p>
              </div>
            )}
          </Card>

          {/* Contact CTA */}
          <Card className="p-6 mt-6 bg-accent/50">
            <h3 className="font-semibold mb-2">{t('help.title')}</h3>
            <p className="text-muted-foreground mb-4">
              {t('help.emergencyNotice')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:109" className="gov-button-primary text-center">
                {t('help.callCenter')}: 109
              </a>
              <a href={`mailto:${t('help.emailAddress')}`} className="gov-button-secondary text-center">
                {t('help.email')}
              </a>
            </div>
          </Card>
        </div>
    </div>
  );
};

export default FAQs;
