import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getCases } from '@/lib/mockData';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Search, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cases = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const cases = getCases();

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const filters = [
    { value: 'all', label: t('cases.filterAll') },
    { value: 'submitted', label: t('cases.filterSubmitted') },
    { value: 'review', label: t('cases.filterReview') },
    { value: 'payment', label: t('cases.filterPayment') },
    { value: 'ready', label: t('cases.filterReady') },
    { value: 'completed', label: t('cases.filterCompleted') },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('cases.title')}</h1>

        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground rtl-flip" />
              <Input
                type="text"
                placeholder={t('cases.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <Button
                  key={f.value}
                  variant={filter === f.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(f.value)}
                  className={filter === f.value ? 'gov-button-primary' : ''}
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Cases List */}
        <div className="space-y-4">
          {filteredCases.map((caseItem) => (
            <Link key={caseItem.id} to={`/cases/${caseItem.id}`}>
              <Card className="gov-card p-6 cursor-pointer">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold">{caseItem.id}</h3>
                      <StatusBadge status={caseItem.status} />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                      <span>{t(`attestation.${caseItem.category}`)}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{caseItem.documents.length} {t('attestation.documents')}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{caseItem.fees} {t('attestation.qar')}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t('dashboard.lastUpdated')}: {new Date(caseItem.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {filteredCases.length === 0 && (
            <Card className="p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('common.noResults')}</p>
            </Card>
          )}
        </div>
    </div>
  );
};

export default Cases;
