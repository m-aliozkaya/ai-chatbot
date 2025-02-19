'use client';

import { useWindowSize } from 'usehooks-ts';

import { SidebarToggle } from '@/components/sidebar-toggle';
import { MedicationsToggle } from '@/components/medications-toggle';
import { useSidebar } from './ui/sidebar';
import { memo } from 'react';

function PureChatHeader() {
  const { open } = useSidebar();
  const { width: windowWidth } = useWindowSize();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />
      <div className="ml-auto">
        <MedicationsToggle />
      </div>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader);
