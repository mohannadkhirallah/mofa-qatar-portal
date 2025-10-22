import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, FileText, Upload, Check, GraduationCap, Heart } from 'lucide-react';
import { generateCaseId, saveCase, Case } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

const AttestationWizard = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<'academic' | 'medical' | ''>('');
  const [files, setFiles] = useState<File[]>([]);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step === 1 && !category) {
      toast({
        title: language === 'en' ? 'Selection Required' : 'الاختيار مطلوب',
        description: language === 'en' ? 'Please select a document category' : 'يرجى اختيار فئة المستند',
        variant: 'destructive',
      });
      return;
    }
    if (step === 3 && files.length === 0) {
      toast({
        title: language === 'en' ? 'Upload Required' : 'التحميل مطلوب',
        description: language === 'en' ? 'Please upload at least one document' : 'يرجى تحميل مستند واحد على الأقل',
        variant: 'destructive',
      });
      return;
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const validFiles = newFiles.filter(file => {
      const isValidType = file.type === 'application/pdf' || file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      
      if (!isValidType) {
        toast({
          title: language === 'en' ? 'Invalid File Type' : 'نوع ملف غير صالح',
          description: `${file.name}: ${language === 'en' ? 'Only PDF and images are accepted' : 'يُقبل PDF والصور فقط'}`,
          variant: 'destructive',
        });
      }
      if (!isValidSize) {
        toast({
          title: language === 'en' ? 'File Too Large' : 'الملف كبير جدًا',
          description: `${file.name}: ${language === 'en' ? 'Max 10MB per file' : 'الحد الأقصى 10 ميجابايت لكل ملف'}`,
          variant: 'destructive',
        });
      }
      
      return isValidType && isValidSize;
    });
    
    setFiles([...files, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const newCase: Case = {
      id: generateCaseId(),
      category: category as 'academic' | 'medical',
      status: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      documents: files.map(f => f.name),
      fees: 100,
      timeline: [
        {
          date: new Date().toISOString(),
          status: 'Submitted',
          description: language === 'en' ? 'Application submitted successfully' : 'تم إرسال الطلب بنجاح',
        },
      ],
    };

    saveCase(newCase);
    
    toast({
      title: language === 'en' ? 'Application Submitted' : 'تم إرسال الطلب',
      description: `${language === 'en' ? 'Case ID' : 'رقم الحالة'}: ${newCase.id}`,
    });

    navigate('/cases');
  };

  const steps = [
    { number: 1, label: t('attestation.step1') },
    { number: 2, label: t('attestation.step2') },
    { number: 3, label: t('attestation.step3') },
    { number: 4, label: t('attestation.step4') },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl font-bold mb-6">{t('attestation.title')}</h1>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((s, idx) => (
                <div key={s.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                        step >= s.number
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step > s.number ? <Check className="h-5 w-5" /> : s.number}
                    </div>
                    <span className="text-xs text-center hidden sm:block">{s.label}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > s.number ? 'bg-secondary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <Card className="p-6 mb-6">
            {/* Step 1: Select Category */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">{t('attestation.selectCategory')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={() => setCategory('academic')}
                    className={`p-6 border-2 rounded-lg transition-all text-start ${
                      category === 'academic'
                        ? 'border-secondary bg-secondary/5'
                        : 'border-border hover:border-secondary/50'
                    }`}
                  >
                    <GraduationCap className="h-12 w-12 text-secondary mb-4 rtl-flip" />
                    <h3 className="text-xl font-semibold mb-2">{t('attestation.academic')}</h3>
                    <p className="text-muted-foreground">{t('attestation.academicDesc')}</p>
                  </button>

                  <button
                    onClick={() => setCategory('medical')}
                    className={`p-6 border-2 rounded-lg transition-all text-start ${
                      category === 'medical'
                        ? 'border-secondary bg-secondary/5'
                        : 'border-border hover:border-secondary/50'
                    }`}
                  >
                    <Heart className="h-12 w-12 text-secondary mb-4 rtl-flip" />
                    <h3 className="text-xl font-semibold mb-2">{t('attestation.medical')}</h3>
                    <p className="text-muted-foreground">{t('attestation.medicalDesc')}</p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Requirements */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">{t('attestation.requirements')}</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">{t('attestation.requiredDocs')}</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>{language === 'en' ? 'Original document or certified copy' : 'المستند الأصلي أو نسخة معتمدة'}</li>
                      <li>{language === 'en' ? 'Valid QID or passport' : 'البطاقة الشخصية أو جواز سفر ساري'}</li>
                      {category === 'academic' && (
                        <li>{language === 'en' ? 'Degree must be authenticated by issuing country if from abroad' : 'يجب توثيق الشهادة من الدولة المصدرة إذا كانت من الخارج'}</li>
                      )}
                    </ul>
                  </div>

                  <div className="bg-accent/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">{t('attestation.fees')}</h3>
                    <p className="text-2xl font-bold text-secondary">
                      100 {t('attestation.qar')}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{t('attestation.digitalInfo')}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">{t('attestation.processingTime')}</h3>
                    <p className="text-muted-foreground">{t('attestation.processingOneDay')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Upload */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">{t('attestation.uploadTitle')}</h2>
                <p className="text-muted-foreground mb-6">{t('attestation.uploadDesc')}</p>

                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-6 hover:border-secondary/50 transition-colors">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="mb-4">{t('attestation.dragDrop')}</p>
                  <label htmlFor="file-upload" className="gov-button-primary inline-block cursor-pointer">
                    {t('common.browse')}
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {files.length > 0 && (
                  <div className="space-y-3">
                    {files.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-secondary rtl-flip" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {t('attestation.fileSize')}: {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(idx)}
                          className="text-destructive"
                        >
                          {t('attestation.remove')}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">{t('attestation.reviewTitle')}</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">{t('attestation.category')}</h3>
                    <p className="text-muted-foreground">{t(`attestation.${category}`)}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">{t('attestation.documents')}</h3>
                    <ul className="space-y-2">
                      {files.map((file, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                          <FileText className="h-4 w-4 rtl-flip" />
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-accent/50 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{t('attestation.totalFees')}</h3>
                      <p className="text-3xl font-bold text-secondary">
                        100 {t('attestation.qar')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 1}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4 rtl-flip" />
              {t('common.previous')}
            </Button>

            {step < totalSteps ? (
              <Button onClick={handleNext} className="gov-button-primary gap-2">
                {t('common.next')}
                <ArrowRight className="h-4 w-4 rtl-flip" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gov-button-primary">
                {t('attestation.proceedPayment')}
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AttestationWizard;
