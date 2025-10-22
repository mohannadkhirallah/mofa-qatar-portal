import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, FileCheck, CreditCard, Package, CheckCircle2 } from 'lucide-react';

interface StatusBadgeProps {
  status: 'submitted' | 'review' | 'payment' | 'ready' | 'completed';
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { t } = useLanguage();

  const statusConfig = {
    submitted: {
      label: t('cases.submitted'),
      icon: Clock,
      className: 'bg-status-submitted/10 text-status-submitted border border-status-submitted/20',
    },
    review: {
      label: t('cases.underReview'),
      icon: FileCheck,
      className: 'bg-status-review/10 text-status-review border border-status-review/20',
    },
    payment: {
      label: t('cases.paymentPending'),
      icon: CreditCard,
      className: 'bg-status-payment/10 text-status-payment border border-status-payment/20',
    },
    ready: {
      label: t('cases.readyForPickup'),
      icon: Package,
      className: 'bg-status-ready/10 text-status-ready border border-status-ready/20',
    },
    completed: {
      label: t('cases.completed'),
      icon: CheckCircle2,
      className: 'bg-status-completed/10 text-status-completed border border-status-completed/20',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`status-badge ${config.className}`}>
      <Icon className="h-3.5 w-3.5 rtl-flip" />
      {config.label}
    </span>
  );
};
