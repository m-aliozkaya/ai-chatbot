import { Chat } from '@/components/chat';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { ChatHeader } from '@/components/chat-header';

export default async function Page() {
  const id = generateUUID();

  return (
    <>
      <ChatHeader />
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
      />
      <DataStreamHandler id={id} />
    </>
  );
} 