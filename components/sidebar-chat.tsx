'use client';

import { useChat } from 'ai/react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { generateUUID } from '@/lib/utils';
import { Messages } from './messages';
import { MultimodalInput } from './multimodal-input';
import { Attachment, ChatRequestOptions } from 'ai';
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

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    reload,
  } = useChat({
    id,
    body: { id },
    initialMessages,
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
    onError: (error) => {
      toast.error('An error occurred, please try again!');
    },
  });

  const [attachments, setAttachments] = useState<Attachment[]>([]);

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
  ), [id, isLoading, messages, setMessages, reload]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden bg-background rounded-lg mx-2">
        <div className="h-full overflow-hidden">
          {messagesComponent}
        </div>
      </div>

      <div className="p-4 mt-auto bg-background mx-2 mb-2 rounded-lg border" onClick={(e) => e.preventDefault()}>
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