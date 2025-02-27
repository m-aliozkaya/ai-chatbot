'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { generateUUID } from '@/lib/utils';
import { Messages } from './messages';
import { MultimodalInput } from './multimodal-input';
import { Attachment } from 'ai';

export function SidebarChat() {
  const id = generateUUID();

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
    initialMessages: [],
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