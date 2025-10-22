import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getCases } from '@/lib/mockData';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { FileText, Plus, Search, DollarSign, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { t } = useLanguage();
  const cases = getCases();

  const inProgress = cases.filter(c => c.status === 'submitted' || c.status === 'review');
  const awaitingPayment = cases.filter(c => c.status === 'payment');
  const completed = cases.filter(c => c.status === 'completed' || c.status === 'ready');

  const quickActions = [
    { icon: FileText, label: t('dashboard.viewRequirements'), href: '/faqs' },
    { icon: DollarSign, label: t('dashboard.checkFees'), href: '/faqs' },
    { icon: Search, label: t('dashboard.trackCase'), href: '/cases' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('dashboard.welcome')}</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Start New Attestation CTA */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">{t('dashboard.startNew')}</h2>
              <p className="text-muted-foreground">
                {t('attestation.academicDesc')} & {t('attestation.medicalDesc')}
              </p>
            </div>
            <Link to="/attestation/new">
              <Button className="gov-button-primary gap-2">
                <Plus className="h-5 w-5 rtl-flip" />
                {t('dashboard.startNew')}
              </Button>
            </Link>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('dashboard.quickActions')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action, idx) => (
              <Link key={idx} to={action.href}>
                <Card className="gov-card p-6 cursor-pointer hover:border-secondary/50 transition-all">
                  <action.icon className="h-8 w-8 text-secondary mb-3 rtl-flip" />
                  <h3 className="font-medium">{action.label}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Cases Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{t('dashboard.inProgress')}</h3>
              <Clock className="h-5 w-5 text-status-review rtl-flip" />
            </div>
            <div className="text-3xl font-bold text-status-review mb-2">{inProgress.length}</div>
            <p className="text-sm text-muted-foreground">{t('dashboard.noCases')}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{t('dashboard.awaitingPayment')}</h3>
              <DollarSign className="h-5 w-5 text-status-payment rtl-flip" />
            </div>
            <div className="text-3xl font-bold text-status-payment mb-2">{awaitingPayment.length}</div>
            <p className="text-sm text-muted-foreground">{t('dashboard.noCases')}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{t('dashboard.completed')}</h3>
              <FileText className="h-5 w-5 text-status-completed rtl-flip" />
            </div>
            <div className="text-3xl font-bold text-status-completed mb-2">{completed.length}</div>
            <p className="text-sm text-muted-foreground">{t('dashboard.noCases')}</p>
          </Card>
        </div>

        {/* Recent Cases */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{t('cases.title')}</h2>
            <Link to="/cases">
              <Button variant="outline" size="sm">
                {t('common.viewAll')}
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {cases.slice(0, 3).map((caseItem) => (
              <Link key={caseItem.id} to={`/cases/${caseItem.id}`}>
                <Card className="gov-card p-6 cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{caseItem.id}</h3>
                        <StatusBadge status={caseItem.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t(`attestation.${caseItem.category}`)} • {caseItem.documents.length} {t('attestation.documents')}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(caseItem.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}

            {cases.length === 0 && (
              <Card className="p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('dashboard.noCases')}</p>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
