'use client';

import type { User } from 'next-auth';
import { RightSidebar } from './ui/right-sidebar';
import { useRightSidebar } from './ui/right-sidebar-context';
import { SidebarChat } from './sidebar-chat';

export function AssistantChatSidebar({ user }: { user: User | undefined }) {
  const { toggleSidebar } = useRightSidebar();

  return (
    <RightSidebar>
      <div className="flex flex-col h-full bg-sidebar">
        <div className="flex-1">
          <SidebarChat />
        </div>
      </div>
    </RightSidebar>
  );
} 