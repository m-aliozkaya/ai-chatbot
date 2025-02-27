'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { generateUUID } from '@/lib/utils';
import { Messages } from './messages';
import { MultimodalInput } from './multimodal-input';
import { Attachment } from 'ai';
import { usePathname } from 'next/navigation';
import { mockPatients } from '@/app/data/mockPatients';

export function SidebarChat() {
  const id = generateUUID();
  const pathname = usePathname();
  const hastaId = pathname.split('/').pop();
  const patient = mockPatients.find(p => p.id === parseInt(hastaId || '0'));

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
    initialMessages: patient ? [
      {
        id: generateUUID(),
        role: 'user',
        content: `${patient.name} isimli hastanın sağlık durumu nedir?`,
      },
      {
        id: generateUUID(),
        role: 'assistant',
        content: `${patient.name} (${patient.age}/${patient.gender.toLowerCase()}) hastamızın mevcut durumu:

- Teşhisler: ${patient.diagnosis.join(', ')}
- Tedaviler: ${patient.treatments.join(', ')}
- Yapılan Testler: ${patient.tests.join(', ')}

Hasta Geçmişi: ${patient.history}`,
      },
      {
        id: generateUUID(),
        role: 'user',
        content: `En son yapılan testlerin sonuçları nasıl?`,
      },
      {
        id: generateUUID(),
        role: 'assistant',
        content: `${patient.tests.join(' ve ')} testleri düzenli olarak yapılıyor ve takip ediliyor. Detaylı test sonuçları için laboratuvar raporlarını inceleyebilirsiniz.`,
      }
    ] : [],
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
    onError: (error) => {
      toast.error('An error occurred, please try again!');
    },
  });

  const [attachments, setAttachments] = useState<Attachment[]>([]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden bg-background rounded-lg mx-2">
        <div className="h-full overflow-hidden">
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
        </div>
      </div>

      <div className="p-4 mt-auto bg-background mx-2 mb-2 rounded-lg border">
        <MultimodalInput
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