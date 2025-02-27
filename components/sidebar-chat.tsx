'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { generateUUID } from '@/lib/utils';
import { Messages } from './messages';
import { MultimodalInput } from './multimodal-input';
import { Attachment, ChatRequestOptions, Message } from 'ai';
import { usePathname } from 'next/navigation';
import { mockPatients } from '@/app/data/mockPatients';

// Custom wrapper for MultimodalInput to prevent URL navigation and optimize rendering
function SidebarMultimodalInput(props: any) {
  const { handleSubmit: originalSubmitHandler, setInput: originalSetInput, ...restProps } = props;
  
  // Memoize the submit handler to prevent re-renders
  const handleSubmit = useCallback((
    event?: { preventDefault?: () => void } | undefined,
    chatRequestOptions?: ChatRequestOptions
  ) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }
    
    // Call the original handler but prevent URL navigation
    originalSubmitHandler(undefined, {
      ...chatRequestOptions,
      experimental_attachments: props.attachments,
    });
    
    // Prevent default form submission
    return false;
  }, [originalSubmitHandler, props.attachments]);
  
  // Debounce input changes to prevent frequent re-renders
  const setInput = useCallback((value: string) => {
    // Use requestAnimationFrame to throttle updates
    requestAnimationFrame(() => {
      originalSetInput(value);
    });
  }, [originalSetInput]);
  
  // Memoize the component to prevent unnecessary re-renders
  return useMemo(() => (
    <MultimodalInput
      {...restProps}
      handleSubmit={handleSubmit}
      setInput={setInput}
    />
  ), [handleSubmit, setInput, restProps]);
}

export function SidebarChat() {
  const id = generateUUID();
  const pathname = usePathname();
  const hastaId = pathname.split('/').pop();
  const patient = mockPatients.find(p => p.id === parseInt(hastaId || '0'));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Memoize initial messages to prevent re-renders
  const initialMessages = useMemo(() => {
    if (!patient) return [];
    
    return [
      {
        id: generateUUID(),
        role: 'user' as const,
        content: `${patient.name} isimli hastanın sağlık durumu nedir?`,
      },
      {
        id: generateUUID(),
        role: 'assistant' as const,
        content: `${patient.name} (${patient.age}/${patient.gender.toLowerCase()}) hastamızın mevcut durumu:

- Teşhisler: ${patient.diagnosis.join(', ')}
- Tedaviler: ${patient.treatments.join(', ')}
- Yapılan Testler: ${patient.tests.join(', ')}

Hasta Geçmişi: ${patient.history}`,
      },
      {
        id: generateUUID(),
        role: 'user' as const,
        content: `En son yapılan testlerin sonuçları nasıl?`,
      },
      {
        id: generateUUID(),
        role: 'assistant' as const,
        content: `${patient.tests.join(' ve ')} testleri düzenli olarak yapılıyor ve takip ediliyor. Detaylı test sonuçları için laboratuvar raporlarını inceleyebilirsiniz.`,
      }
    ];
  }, [patient]);

  // Use local state instead of useChat hook
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  
  // Initialize messages when component mounts or patient changes
  useEffect(() => {
    setMessages(initialMessages);
    setInput('');
    setIsLoading(false);
    setAttachments([]);
  }, [initialMessages, hastaId]);

  // Scroll to bottom when messages change - optimize edilmiş versiyon
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      // requestAnimationFrame ile scroll işlemini optimize et
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
      });
    }
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Custom handleSubmit function that uses local state
  const handleSubmit = useCallback((
    event?: { preventDefault?: () => void } | undefined,
    chatRequestOptions?: ChatRequestOptions
  ) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateUUID(),
      role: 'user',
      content: input,
    };
    
    // Set loading state
    setIsLoading(true);
    
    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input right away
    setInput('');
    
    // Simulate a delay for the assistant response
    setTimeout(() => {
      // Add assistant response based on the input
      const assistantResponse: Message = {
        id: generateUUID(),
        role: 'assistant',
        content: getAssistantResponse(input, patient),
      };
      
      // Update messages with assistant response
      setMessages(prev => [...prev, assistantResponse]);
      setIsLoading(false);
    }, 500);
    
    return false;
  }, [input, patient]);

  // Function to generate assistant responses based on input
  const getAssistantResponse = (userInput: string, patient: any) => {
    if (!patient) return "Hasta bilgisi bulunamadı.";
    
    const input = userInput.toLowerCase();
    
    if (input.includes('teşhis') || input.includes('tanı')) {
      return `${patient.name} için konulan teşhisler: ${patient.diagnosis.join(', ')}`;
    }
    
    if (input.includes('tedavi') || input.includes('ilaç')) {
      return `${patient.name} için uygulanan tedaviler: ${patient.treatments.join(', ')}`;
    }
    
    if (input.includes('test') || input.includes('sonuç')) {
      return `${patient.name} için yapılan testler: ${patient.tests.join(', ')}. Detaylı sonuçlar için laboratuvar raporlarını inceleyebilirsiniz.`;
    }
    
    if (input.includes('öykü') || input.includes('geçmiş') || input.includes('hikaye')) {
      return `${patient.name}'ın hasta öyküsü: ${patient.history}`;
    }
    
    return `${patient.name} hakkında başka bir sorunuz var mı? Teşhisler, tedaviler, testler veya hasta öyküsü hakkında bilgi verebilirim.`;
  };

  // Mock functions for compatibility with Messages component
  const reload = useCallback(() => {
    return Promise.resolve(null);
  }, []);
  const stop = useCallback(() => {}, []);
  const append = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
    return Promise.resolve(message.id);
  }, []);

  // Override window.history.replaceState to prevent URL navigation
  useEffect(() => {
    const originalReplaceState = window.history.replaceState;
    
    // Replace the replaceState function with a no-op function
    window.history.replaceState = function() {
      // Do nothing to prevent URL changes
      return;
    };
    
    // Restore the original function when component unmounts
    return () => {
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  // Memoize the Messages component to prevent re-renders
  const messagesComponent = useMemo(() => (
    <Messages
      chatId={id}
      isLoading={isLoading}
      votes={[]}
      messages={messages}
      setMessages={setMessages}
      reload={reload}
      isReadonly={false}
      isArtifactVisible={false}
    />
  ), [id, isLoading, messages, reload]);

  return (
    <div className="flex flex-col h-full" key={hastaId}>
      {/* Messages container */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 overflow-y-auto px-2 pb-4 will-change-scroll overscroll-behavior-y-contain">
          {messagesComponent}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>
      
      {/* Input container */}
      <div className="mt-auto pt-2 px-2 pb-2 border-t bg-background">
      <SidebarMultimodalInput
            chatId={id}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            messages={messages}
            setMessages={setMessages}
            append={append}
          />
      </div>
    </div>
  );
} 