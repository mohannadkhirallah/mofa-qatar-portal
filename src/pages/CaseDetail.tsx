import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCases } from '@/lib/mockData';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ArrowLeft, FileText, Calendar } from 'lucide-react';

const CaseDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const cases = getCases();
  const caseItem = cases.find(c => c.id === id);

  if (!caseItem) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">{t('common.noResults')}</h2>
            <Button onClick={() => navigate('/cases')} className="gov-button-primary">
              {t('cases.title')}
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/cases')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4 rtl-flip" />
          {t('cases.title')}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Case Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{caseItem.id}</h1>
                  <StatusBadge status={caseItem.status} />
                </div>
                <Button className="gov-button-secondary">
                  {t('common.print')}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('attestation.category')}</p>
                  <p className="font-medium">{t(`attestation.${caseItem.category}`)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('attestation.fees')}</p>
                  <p className="font-medium">{caseItem.fees} {t('attestation.qar')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('dashboard.caseId')}</p>
                  <p className="font-medium">{caseItem.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('dashboard.lastUpdated')}</p>
                  <p className="font-medium">{new Date(caseItem.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">{t('cases.documentList')}</h3>
                <div className="space-y-2">
                  {caseItem.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <FileText className="h-4 w-4 text-secondary rtl-flip" />
                      <span className="text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">{t('cases.timeline')}</h2>
              <div className="space-y-6">
                {caseItem.timeline.map((event, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-secondary" />
                      {idx < caseItem.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-muted-foreground rtl-flip" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleString()}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-1">{event.status}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">{t('help.title')}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t('cases.deliveryInfo')}
              </p>
              <Button variant="outline" className="w-full mb-2">
                {t('help.contactUs')}
              </Button>
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-1">{t('help.callCenter')}</p>
                <p className="text-2xl font-bold text-secondary">109</p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseDetail;
