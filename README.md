# MOFA Qatar - Document Attestation Portal

A bilingual (Arabic/English) web application for the Ministry of Foreign Affairs Qatar's document attestation services. Built with React, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- **Bilingual Support**: Seamless Arabic/English switching with RTL layout support
- **Document Attestation Wizard**: 4-step process for academic and medical certificates
- **Case Management**: Track attestation requests with timeline and status updates
- **FAQs & Help**: Comprehensive help center with searchable FAQs
- **Mock Payment Flow**: Complete attestation workflow with payment preview

### User Experience
- **Government-Grade Design**: Qatar maroon (#8A1538) and dark blue (#0D4261) branding
- **Mobile-First**: Fully responsive design for all devices
- **Accessible**: High contrast, semantic HTML, and keyboard navigation
- **Professional Typography**: Lato (English) and Noto Kufi Arabic fonts

### Pages
1. **Login** - NAS-style authentication (mock)
2. **Dashboard** - Case overview with quick actions
3. **Start Attestation** - 4-step wizard (Category → Requirements → Upload → Review)
4. **Track Cases** - Search and filter case history
5. **Case Detail** - Timeline, documents, and status tracking
6. **FAQs** - Searchable knowledge base
7. **Help** - Contact information and support options
8. **Profile** - User account management

## Technical Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **State**: React Context + Local Storage
- **Forms**: React Hook Form + Zod validation

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run at `http://localhost:8080`

### Demo Credentials
Use any username/password to log in (mock authentication).

## Project Structure

```
src/
├── components/
│   ├── shared/          # Header, Footer, StatusBadge
│   └── ui/              # shadcn/ui components
├── contexts/            # Language context for i18n
├── lib/
│   ├── i18n.ts         # Translations (EN/AR)
│   ├── mockData.ts     # Mock cases and FAQs
│   └── utils.ts        # Helper functions
├── pages/              # All page components
└── index.css           # Design system tokens
```

## Design System

### Colors
- **Primary (Qatar Maroon)**: `#8A1538` - Main brand color
- **Secondary (Dark Blue)**: `#0D4261` - Action buttons
- **Status Colors**: Submitted, Review, Payment, Ready, Completed

### Typography
- **English**: Lato (300, 400, 600, 700)
- **Arabic**: Noto Kufi Arabic (300, 400, 600, 700)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Features Ready for Backend Integration

### API Endpoints (Stubbed)
- `POST /api/auth/nas/login` - Authentication
- `GET /api/cases` | `POST /api/cases` - Case management
- `POST /api/upload` - File upload with validation
- `POST /api/payment/prepare` - Payment processing
- `POST /api/ai/assist` - AI chat assistant (future)

### Validation Rules
- File types: PDF, JPG, PNG only
- Max file size: 10 MB per file
- Academic attestation fee: 100 QAR
- Medical attestation fee: 100 QAR
- Processing time: 1 working day

## Deployment

Deploy via Lovable:
1. Open [Lovable](https://lovable.dev/projects/8e0766ae-1dab-4b82-8648-ef22108fa60f)
2. Click Share → Publish

## References

- [MOFA Qatar Attestation Services](https://mofa.gov.qa/en/eservices/attestation)
- [MOFA eServices FAQ](https://mofa.gov.qa/en/eservices/faq)
- [MOFA Attestation Fees](https://mofa.gov.qa/en/consular-services/legalization/legalization)

## License

© 2025 Ministry of Foreign Affairs, State of Qatar. All rights reserved.
