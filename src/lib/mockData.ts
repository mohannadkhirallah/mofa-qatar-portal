export interface Case {
  id: string;
  category: 'academic' | 'medical';
  status: 'submitted' | 'review' | 'payment' | 'ready' | 'completed';
  createdAt: string;
  updatedAt: string;
  documents: string[];
  fees: number;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  date: string;
  status: string;
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const mockCases: Case[] = [
  {
    id: 'ATT-2025-001234',
    category: 'academic',
    status: 'review',
    createdAt: '2025-10-20T10:30:00',
    updatedAt: '2025-10-21T14:22:00',
    documents: ['Degree_Certificate.pdf', 'Transcript.pdf'],
    fees: 100,
    timeline: [
      {
        date: '2025-10-20T10:30:00',
        status: 'Submitted',
        description: 'Application submitted successfully',
      },
      {
        date: '2025-10-21T14:22:00',
        status: 'Under Review',
        description: 'Documents are being verified',
      },
    ],
  },
  {
    id: 'ATT-2025-001189',
    category: 'medical',
    status: 'payment',
    createdAt: '2025-10-15T09:15:00',
    updatedAt: '2025-10-19T11:45:00',
    documents: ['Medical_Report.pdf'],
    fees: 100,
    timeline: [
      {
        date: '2025-10-15T09:15:00',
        status: 'Submitted',
        description: 'Application submitted successfully',
      },
      {
        date: '2025-10-16T13:20:00',
        status: 'Under Review',
        description: 'Documents verified',
      },
      {
        date: '2025-10-19T11:45:00',
        status: 'Payment Pending',
        description: 'Please complete payment to proceed',
      },
    ],
  },
  {
    id: 'ATT-2025-000987',
    category: 'academic',
    status: 'completed',
    createdAt: '2025-10-01T08:00:00',
    updatedAt: '2025-10-10T16:30:00',
    documents: ['Masters_Degree.pdf'],
    fees: 100,
    timeline: [
      {
        date: '2025-10-01T08:00:00',
        status: 'Submitted',
        description: 'Application submitted successfully',
      },
      {
        date: '2025-10-02T10:15:00',
        status: 'Under Review',
        description: 'Documents verified',
      },
      {
        date: '2025-10-05T09:30:00',
        status: 'Payment Completed',
        description: 'Payment received',
      },
      {
        date: '2025-10-08T14:00:00',
        status: 'Ready for Pickup',
        description: 'Available at MOFA or Q-Post delivery',
      },
      {
        date: '2025-10-10T16:30:00',
        status: 'Completed',
        description: 'Document collected',
      },
    ],
  },
];

export const mockFAQs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What file formats are accepted for upload?',
    answer: 'We accept PDF and image files (JPG, PNG). Each file must not exceed 10 MB in size.',
    category: 'general',
  },
  {
    id: 'faq-2',
    question: 'How much does academic certificate attestation cost?',
    answer: 'Academic certificate attestation costs 100 QAR per document. Digital attestation service is also available for 100 QAR.',
    category: 'fees',
  },
  {
    id: 'faq-3',
    question: 'How much does medical certificate attestation cost?',
    answer: 'Medical certificate attestation costs 100 QAR per document.',
    category: 'fees',
  },
  {
    id: 'faq-4',
    question: 'How long does the attestation process take?',
    answer: 'The standard processing time is 1 working day after submission and payment.',
    category: 'processing',
  },
  {
    id: 'faq-5',
    question: 'What documents do I need for academic attestation?',
    answer: 'You need the original academic certificate or an officially certified copy. For degrees from outside Qatar, additional authentication may be required.',
    category: 'requirements',
  },
  {
    id: 'faq-6',
    question: 'Can I submit multiple documents at once?',
    answer: 'Each document requires a separate attestation request and fee. However, you can submit multiple files for the same certificate (e.g., degree and transcript together).',
    category: 'general',
  },
  {
    id: 'faq-7',
    question: 'How will I receive my attested documents?',
    answer: 'You can collect your documents from MOFA or choose delivery via Q-Post service.',
    category: 'delivery',
  },
  {
    id: 'faq-8',
    question: 'What is digital attestation?',
    answer: 'Digital attestation is an electronic version of document attestation available for 100 QAR. It provides a secure digital certificate that can be verified online.',
    category: 'general',
  },
];

// Storage keys
const CASES_KEY = 'mofa_cases';

export const getCases = (): Case[] => {
  const stored = localStorage.getItem(CASES_KEY);
  return stored ? JSON.parse(stored) : mockCases;
};

export const saveCase = (caseData: Case): void => {
  const cases = getCases();
  const index = cases.findIndex(c => c.id === caseData.id);
  if (index >= 0) {
    cases[index] = caseData;
  } else {
    cases.unshift(caseData);
  }
  localStorage.setItem(CASES_KEY, JSON.stringify(cases));
};

export const generateCaseId = (): string => {
  const num = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
  return `ATT-2025-${num}`;
};
