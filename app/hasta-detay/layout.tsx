import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/app-sidebar';
import { MedicationsSidebar } from '@/components/medications-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { RightSidebarProvider } from '@/components/ui/right-sidebar-context';
import { ChatHeader } from '@/components/chat-header';

import { auth } from '../(auth)/auth';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';
  const isRightCollapsed = cookieStore.get('right-sidebar:state')?.value !== 'true';

  return (
    <div className="flex">
      <SidebarProvider defaultOpen={!isCollapsed}>
        <RightSidebarProvider defaultOpen={!isRightCollapsed}>
          <div className="flex w-full">
            <AppSidebar user={session?.user} />
            <SidebarInset>
              <ChatHeader />
              {children}
            </SidebarInset>
            <MedicationsSidebar user={session?.user} />
          </div>
        </RightSidebarProvider>
      </SidebarProvider>
    </div>
  );
} 