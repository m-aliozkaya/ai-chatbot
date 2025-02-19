'use client';

import { type Message, type ChatRequestOptions } from 'ai';
import { FormEvent, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { deleteTrailingMessages } from '@/app/(chat)/actions';
import { toast } from 'sonner';

interface MessageEditorProps {
  message: Message;
  setMode: (mode: 'view' | 'edit') => void;
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[]),
  ) => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

export function MessageEditor({
  message,
  setMode,
  setMessages,
  reload,
}: MessageEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState(message.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!content) return;

    setIsSubmitting(true);

    await deleteTrailingMessages({
      id: message.id,
    });

    setMessages((messages) =>
      messages.map((m) =>
        m.id === message.id ? { ...m, content } : m,
      ),
    );
    setMode('view');
    await reload();
  };

  return (
    <form
      className="flex flex-col gap-3 w-full"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Textarea
        ref={textareaRef}
        className="w-full resize-none bg-transparent outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
      />
      <div className="flex flex-row gap-2 justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setMode('view');
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Save & Regenerate'}
        </Button>
      </div>
    </form>
  );
}
