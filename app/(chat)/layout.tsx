import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/app-sidebar';
import { MedicationsSidebar } from '@/components/medications-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { MedicationsSidebarProvider } from '@/components/ui/medications-sidebar-context';

import { auth } from '../(auth)/auth';
import Script from 'next/script';

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';
  const isMedicationsCollapsed = cookieStore.get('medications:state')?.value !== 'true';

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <div className="flex">
        <SidebarProvider defaultOpen={!isCollapsed}>
          <MedicationsSidebarProvider defaultOpen={!isMedicationsCollapsed}>
            <div className="flex w-full">
              <AppSidebar user={session?.user} />
              <SidebarInset>{children}</SidebarInset>
              <MedicationsSidebar user={session?.user} />
            </div>
          </MedicationsSidebarProvider>
        </SidebarProvider>
      </div>
    </>
  );
}
