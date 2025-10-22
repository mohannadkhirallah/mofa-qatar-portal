import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIChat() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: language === 'en' 
        ? 'Hello! I\'m your MOFA attestation assistant. I can help you with:\n\n• Eligibility requirements\n• Required documents\n• Fee information\n• Step-by-step guidance\n• Common questions\n\nHow can I assist you today?'
        : 'مرحباً! أنا مساعد التصديقات في وزارة الخارجية. يمكنني مساعدتك في:\n\n• متطلبات الأهلية\n• المستندات المطلوبة\n• معلومات الرسوم\n• إرشادات خطوة بخطوة\n• الأسئلة الشائعة\n\nكيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Mock AI response - replace with actual API call
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'en'
          ? 'I understand you need help with document attestation. To provide accurate guidance, could you please specify:\n\n1. What type of document? (Academic certificate, Medical certificate, etc.)\n2. Where was the document issued?\n3. What is your intended use?\n\nThis will help me provide you with the exact requirements and fees.'
          : 'أفهم أنك بحاجة إلى مساعدة في تصديق المستندات. لتقديم إرشادات دقيقة، يرجى تحديد:\n\n١. ما نوع المستند؟ (شهادة أكاديمية، شهادة طبية، إلخ)\n٢. أين تم إصدار المستند؟\n٣. ما هو الغرض من الاستخدام؟\n\nسيساعدني هذا في تزويدك بالمتطلبات والرسوم الدقيقة.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="border-b border-border bg-card p-4">
        <h1 className="text-2xl font-bold">{t('common.aiAssistant')}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {language === 'en'
            ? 'Get instant help with your attestation queries'
            : 'احصل على مساعدة فورية في استفساراتك حول التصديقات'}
        </p>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div
                className={`flex-1 space-y-2 rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString(language === 'en' ? 'en-US' : 'ar-QA', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-2 rounded-lg bg-muted px-4 py-3">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce delay-100" />
                  <div className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border bg-card p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={
              language === 'en'
                ? 'Type your question here...'
                : 'اكتب سؤالك هنا...'
            }
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-[60px] w-[60px] shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
